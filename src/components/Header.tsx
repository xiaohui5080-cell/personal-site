import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { profile } from '../content/site'

const NAV = [
  { to: '/journal', label: '随笔', en: 'Journal' },
  { to: '/notes', label: '笔记', en: 'Notes' },
  { to: '/daily', label: '碎念', en: 'Daily' },
  { to: '/shelf', label: '书影音', en: 'Shelf' },
  { to: '/about', label: '关于', en: 'About' },
]

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
}

export default function Header() {
  const clock = useClock()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="masthead">
      <div className="masthead__strip">
        <span>No. 001 · 一个人的杂志</span>
        <span className="masthead__strip-center">思考 · 学习 · 生活</span>
        <span className="masthead__clock">{clock}</span>
      </div>

      <div className="masthead__main">
        <Link to="/" className="wordmark" aria-label="返回首页">
          <span className="wordmark__zh">{profile.siteName}</span>
          <span className="wordmark__en">{profile.siteNameEn}</span>
        </Link>
        <p className="masthead__tagline">{profile.tagline}，关于思考、学习与生活。</p>
        <button
          className={`masthead__toggle${open ? ' is-open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <span className="sr-only">切换导航</span>
          <i />
          <i />
        </button>
      </div>

      <nav className={`nav${open ? ' is-open' : ''}`}>
        <NavLink to="/" end className="nav__link">
          <span className="nav__zh">首页</span>
          <span className="nav__en">Front</span>
        </NavLink>
        {NAV.map((item) => (
          <NavLink key={item.to} to={item.to} className="nav__link">
            <span className="nav__zh">{item.label}</span>
            <span className="nav__en">{item.en}</span>
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

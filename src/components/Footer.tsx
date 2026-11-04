import { Link } from 'react-router-dom'
import { profile } from '../content/site'
import { articles } from '../content/articles'

const SECTIONS = [
  { to: '/journal', zh: '随笔', en: 'Journal' },
  { to: '/notes', zh: '笔记', en: 'Notes' },
  { to: '/daily', zh: '碎念', en: 'Daily' },
  { to: '/shelf', zh: '书影音', en: 'Shelf' },
  { to: '/about', zh: '关于', en: 'About' },
]

export default function Footer() {
  const latest = [...articles].sort((a, b) => b.date.localeCompare(a.date))[0]
  return (
    <footer className="colophon">
      <div className="colophon__inner">
        <div className="colophon__brand">
          <span className="colophon__mark">{profile.siteName}</span>
          <p>
            {profile.tagline}。由 {profile.owner} 独立编写与维护。
            <br />
            本站内容在 <em>缓慢地</em> 更新。
          </p>
        </div>

        <div className="colophon__col">
          <h4>栏目</h4>
          <ul>
            {SECTIONS.map((s) => (
              <li key={s.to}>
                <Link to={s.to}>
                  {s.zh} <span>{s.en}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="colophon__col">
          <h4>最新</h4>
          <ul>
            <li>
              <Link to={`/journal/${latest.slug}`}>
                {latest.title} <span>{latest.date.replace(/-/g, '.')}</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="colophon__col">
          <h4>联系</h4>
          <ul>
            {profile.contacts.map((c) => (
              <li key={c.label}>
                <a href={c.href}>
                  {c.label} <span>{c.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="colophon__rule" />

      <div className="colophon__bottom">
        <span>© {new Date().getFullYear()} {profile.owner} · 保留所有权利</span>
        <span>编辑于 {new Date().toLocaleDateString('zh-CN')}</span>
      </div>
    </footer>
  )
}

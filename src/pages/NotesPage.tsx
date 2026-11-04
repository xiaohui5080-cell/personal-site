import { Link } from 'react-router-dom'
import { notebox } from '../content/notebox'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { useDocumentTitle } from '../lib/format'

const PURPLE = 'rgb(108, 60, 214)'
const BLUE = 'rgb(46, 86, 166)'
const ORANGE = 'rgb(196, 110, 40)'
const ROSE = 'rgb(176, 60, 84)'
const TEAL = 'rgb(40, 122, 110)'
const GOLD = 'rgb(160, 130, 30)'

const THEME_COLOR: Record<string, string> = {
  认知: PURPLE,
  表达: BLUE,
  生活: ORANGE,
  技术: ROSE,
  别的: TEAL,
}

function colorFor(theme: string, i = 0): string {
  if (THEME_COLOR[theme]) return THEME_COLOR[theme]
  return [PURPLE, BLUE, ORANGE, ROSE, TEAL, GOLD][i % 6]
}

export default function NotesPage() {
  useDocumentTitle('笔记 · 字里行间')
  const themes = Array.from(new Set(notebox.map((n) => n.theme)))

  return (
    <div className="page-shell">
      <PageHeader
        kicker="Digital Garden / 数页"
        title={
          <>
            一座缓慢生长的<span className="accent">数字花园</span>
          </>
        }
        deck="这些笔记没有「完成」的一天。它们是长期更新的、半成品的想法——可能很粗糙，但都在生长。"
        meta={
          <>
            <span>{notebox.length} 个主题</span>
            <span className="dot" />
            <span>{themes.length} 个领域</span>
            <span className="dot" />
            <span>持续更新</span>
          </>
        }
      />

      <div className="garden-grid">
        {notebox.map((n, i) => {
          const color = colorFor(n.theme, i)
          return (
            <Reveal key={n.slug} delay={(i % 3) * 80}>
              <Link
                to={`/notes/${n.slug}`}
                className="garden-card"
                style={{ ['--garden-color' as string]: color }}
              >
                <div className="garden-card__top">
                  <span className="garden-card__theme">{n.theme}</span>
                  <span className="garden-card__date">
                    更新于 {n.updated.replace(/-/g, '.')}
                  </span>
                </div>
                <h3 className="garden-card__title">{n.title}</h3>
                <p className="garden-card__summary">{n.summary}</p>
                <div className="garden-card__icon" aria-hidden>
                  <span className="dot-svg">
                    <svg viewBox="0 0 24 24">
                      <path
                        d="M7 17 A7 7 0 1 1 14 10 V14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                      <path d="M14 10 H5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M5 10 V19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          )
        })}
      </div>

      <p className="garden-note">
        <span>※</span> 笔记里的内容不保证正确，只保证真实。欢迎来信讨论。
      </p>
    </div>
  )
}

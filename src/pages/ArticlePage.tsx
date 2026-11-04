import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAllArticles, getArticle } from '../content/articles'
import Markdown from '../components/Markdown'
import { formatFull, useDocumentTitle } from '../lib/format'
import NotFoundPage from './NotFoundPage'

export default function ArticlePage() {
  const { slug = '' } = useParams()
  const article = getArticle(slug)
  const all = getAllArticles()
  const [progress, setProgress] = useState(0)

  useDocumentTitle(article ? `${article.title} · 字里行间` : '未找到 · 字里行间')

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? Math.min(1, h.scrollTop / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [slug])

  if (!article) return <NotFoundPage />

  const idx = all.findIndex((a) => a.slug === slug)
  const prev = all[idx + 1]
  const next = all[idx - 1]
  const related = all
    .filter((a) => a.slug !== slug)
    .sort((a, b) => {
      const sa = a.tags.filter((t) => article.tags.includes(t)).length
      const sb = b.tags.filter((t) => article.tags.includes(t)).length
      return sb - sa
    })
    .slice(0, 3)

  const headings = article.body
    .split('\n')
    .filter((l) => /^##\s+/.test(l))
    .map((l) => l.replace(/^##\s+/, ''))

  return (
    <div className="article-page">
      <div className="reading-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden />

      <div className="article-nav">
        <Link to="/journal" className="back-link">
          ← 返回随笔
        </Link>
        <span className="article-nav__cat">{article.category}</span>
      </div>

      <header className="article-head">
        <div className="article-head__kicker">
          <span>{article.category}</span>
          <span>—</span>
          <span>{article.readingTime} 分钟阅读</span>
        </div>
        <h1 className="article-head__title">{article.title}</h1>
        <p className="article-head__subtitle">{article.subtitle}</p>
        <div className="article-head__byline">
          <span className="byline__avatar">林</span>
          <div>
            <strong>林间</strong>
            <time>{formatFull(article.date)}</time>
          </div>
        </div>
      </header>

      <div className="article-layout">
        <aside className="article-toc" aria-label="目录">
          <h4>本篇目录</h4>
          <ul>
            {headings.map((h, i) => (
              <li key={h}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {h}
              </li>
            ))}
          </ul>
          <div className="article-toc__tags">
            <h4>标签</h4>
            <div className="chips">
              {article.tags.map((t) => (
                <Link to={`/journal?cat=${encodeURIComponent(article.category)}`} key={t} className="chip">
                  #{t}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <div className="article-margin" aria-hidden>
          {article.tags.map((t, i) => (
            <span key={t} className="article-margin__tag" style={{ top: `${8 + i * 12}%` }}>
              {t}
            </span>
          ))}
        </div>

        <div className="article-body">
          <div className="article-rule">
            <span />
          </div>
          <Markdown source={article.body} />
          <div className="article-sign">
            <span className="article-sign__glyph">完</span>
            <p>
              写于 {formatFull(article.date)}
            </p>
          </div>
        </div>
      </div>

      <nav className="article-pager">
        {prev ? (
          <Link to={`/journal/${prev.slug}`} className="pager pager--prev">
            <span>上一篇</span>
            <strong>{prev.title}</strong>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/journal/${next.slug}`} className="pager pager--next">
            <span>下一篇</span>
            <strong>{next.title}</strong>
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <section className="related">
        <div className="band__head">
          <h2>
            <span className="band__zh">延伸阅读</span>
            <span className="band__en">Keep Reading</span>
          </h2>
          <span className="band__rule" />
        </div>
        <div className="related__list">
          {related.map((r) => (
            <Link key={r.slug} to={`/journal/${r.slug}`} className="related__item">
              <span className="related__cat">{r.category}</span>
              <h3>{r.title}</h3>
              <p>{r.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

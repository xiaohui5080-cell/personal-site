import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAllArticles, getAllCategories, getAllTags } from '../content/articles'
import ArticleCard from '../components/ArticleCard'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { useDocumentTitle } from '../lib/format'

export default function JournalPage() {
  useDocumentTitle('随笔 · 字里行间')
  const [params, setParams] = useSearchParams()
  const activeCat = params.get('cat')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const all = useMemo(() => getAllArticles(), [])
  const categories = getAllCategories()
  const tags = getAllTags()

  const filtered = all.filter((a) => {
    if (activeCat && a.category !== activeCat) return false
    if (activeTag && !a.tags.includes(activeTag)) return false
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      const hay = `${a.title} ${a.subtitle} ${a.excerpt} ${a.tags.join(' ')}`.toLowerCase()
      if (!hay.includes(q)) return false
    }
    return true
  })

  return (
    <div className="page-shell">
      <PageHeader
        kicker="Journal / 随笔"
        title={
          <>
            文章与<span className="accent">思考</span>
          </>
        }
        deck="关于注意力、效率、关系与生活的长期思考。按时间倒序排列，最新的一篇总在最上面。"
        meta={
          <>
            <span>{all.length} 篇文章</span>
            <span className="dot" />
            <span>{categories.length} 个栏目</span>
            <span className="dot" />
            <span>{tags.length} 个标签</span>
          </>
        }
      />

      <div className="filter-bar">
        <div className="filter-bar__group">
          <button
            className={`pill${!activeCat ? ' is-active' : ''}`}
            onClick={() => {
              params.delete('cat')
              setParams(params, { replace: true })
            }}
          >
            全部
          </button>
          {categories.map((c) => (
            <button
              key={c}
              className={`pill${activeCat === c ? ' is-active' : ''}`}
              onClick={() => {
                params.set('cat', c)
                setParams(params, { replace: true })
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="search-box">
          <span className="sr-only">搜索</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索标题、标签…"
          />
          <svg viewBox="0 0 20 20" aria-hidden>
            <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M13.5 13.5 L17.5 17.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </label>
      </div>

      <div className="tag-row">
        <span className="tag-row__label">标签</span>
        <button
          className={`tag-chip${!activeTag ? ' is-active' : ''}`}
          onClick={() => setActiveTag(null)}
        >
          全部
        </button>
        {tags.map((t) => (
          <button
            key={t}
            className={`tag-chip${activeTag === t ? ' is-active' : ''}`}
            onClick={() => setActiveTag(activeTag === t ? null : t)}
          >
            #{t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="empty">没有找到匹配的文章。</p>
      ) : (
        <div className="story-grid story-grid--wide">
          {filtered.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 70}>
              <ArticleCard article={a} index={i} />
            </Reveal>
          ))}
        </div>
      )}

      <div className="end-mark">
        <span>※</span>
      </div>
    </div>
  )
}

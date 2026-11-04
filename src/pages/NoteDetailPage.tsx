import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { notebox } from '../content/notebox'
import Markdown from '../components/Markdown'
import { useDocumentTitle } from '../lib/format'
import NotFoundPage from './NotFoundPage'

export default function NoteDetailPage() {
  const { slug = '' } = useParams()
  const note = notebox.find((n) => n.slug === slug)
  const idx = notebox.findIndex((n) => n.slug === slug)
  const [view, setView] = useState<'read' | 'source'>('read')

  useDocumentTitle(note ? `${note.title} · 笔记` : '未找到 · 字里行间')

  if (!note) return <NotFoundPage />

  const others = notebox.filter((n) => n.slug !== slug).slice(0, 4)

  return (
    <div className="article-page note-page">
      <div className="article-nav">
        <Link to="/notes" className="back-link">
          ← 返回笔记库
        </Link>
        <div className="view-switch">
          <button className={view === 'read' ? 'is-active' : ''} onClick={() => setView('read')}>
            阅读
          </button>
          <button className={view === 'source' ? 'is-active' : ''} onClick={() => setView('source')}>
            Markdown 源文
          </button>
        </div>
      </div>

      <header className="note-head">
        <div className="note-head__meta">
          <span className="note-head__theme">{note.theme}</span>
          <span>更新于 {note.updated.replace(/-/g, '.')}</span>
          <span>#{String(idx + 1).padStart(2, '0')}</span>
        </div>
        <h1 className="article-head__title">{note.title}</h1>
        <p className="article-head__subtitle">{note.summary}</p>
      </header>

      <div className="note-body">
        {view === 'read' ? (
          <Markdown source={note.body} />
        ) : (
          <pre className="note-source">
            <code>{note.body}</code>
          </pre>
        )}
      </div>

      <nav className="note-other">
        <h4>继续逛花园</h4>
        <ul>
          {others.map((o) => (
            <li key={o.slug}>
              <Link to={`/notes/${o.slug}`}>
                <span>{o.theme}</span>
                {o.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

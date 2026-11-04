import { useMemo, useState } from 'react'
import { notes } from '../content/notes'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { formatDate, formatMonthDay, useDocumentTitle } from '../lib/format'

export default function JournalDailyPage() {
  useDocumentTitle('碎念 · 字里行间')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const tags = useMemo(
    () => Array.from(new Set(notes.flatMap((n) => n.tags ?? []))).sort(),
    [],
  )

  const filtered = activeTag ? notes.filter((n) => n.tags?.includes(activeTag)) : notes

  // 按年月分组
  const groups = useMemo(() => {
    const map = new Map<string, typeof notes>()
    for (const n of filtered) {
      const key = n.date.slice(0, 7).replace('-', ' 年 ') + ' 月'
      const arr = map.get(key) ?? []
      arr.push(n)
      map.set(key, arr)
    }
    return Array.from(map.entries())
  }, [filtered])

  return (
    <div className="page-shell">
      <PageHeader
        kicker="Daily / 碎念"
        title={
          <>
            今天<span className="accent">碎念</span>
          </>
        }
        deck="一些片段、一些好的瞬间、一些不太严肃的观察。像便签一样贴在时间里。"
        meta={
          <>
            <span>{notes.length} 条</span>
            <span className="dot" />
            <span>最新 {formatDate(notes[0].date)}</span>
            <span className="dot" />
            <span>{tags.length} 个话题</span>
          </>
        }
      />

      <div className="tag-row">
        <span className="tag-row__label">话题</span>
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

      {groups.map(([month, items]) => (
        <section key={month} className="daily-group">
          <div className="daily-group__head">
            <h3>{month}</h3>
            <span>{items.length} 条</span>
          </div>
          <ul className="daily-feed">
            {items.map((n, i) => (
              <Reveal as="li" key={n.date} delay={Math.min(i, 6) * 40} className="daily-item">
                <div className="daily-item__date">
                  <span className="daily-item__day">{formatMonthDay(n.date)}</span>
                  <span className="daily-item__full">{formatDate(n.date)}</span>
                </div>
                <div className="daily-item__body">
                  <p>{n.text}</p>
                  <div className="daily-item__tags">
                    {(n.tags ?? []).map((t) => (
                      <button key={t} onClick={() => setActiveTag(t)}>
                        #{t}
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

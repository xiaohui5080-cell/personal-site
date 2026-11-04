import { useMemo, useState } from 'react'
import { shelf } from '../content/shelf'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { useDocumentTitle } from '../lib/format'

const KINDS = ['全部', '书', '电影', '剧集', '播客'] as const

function Stars({ n }: { n: number }) {
  return (
    <span className="stars" aria-label={`${n} 星`}>
      {'★'.repeat(n)}
      <span className="stars--off">{'★'.repeat(5 - n)}</span>
    </span>
  )
}

export default function ShelfPage() {
  useDocumentTitle('书影音 · 字里行间')
  const [kind, setKind] = useState<(typeof KINDS)[number]>('全部')

  const list = useMemo(
    () => shelf.filter((s) => kind === '全部' || s.kind === kind),
    [kind],
  )

  const avg =
    shelf.reduce((a, s) => a + s.rating, 0) / Math.max(1, shelf.length)
  const counts = KINDS.slice(1).map((k) => ({
    kind: k,
    n: shelf.filter((s) => s.kind === k).length,
  }))

  return (
    <div className="page-shell">
      <PageHeader
        kicker="Shelf / 书影音"
        title={
          <>
            看过的，<span className="accent">与在读的</span>
          </>
        }
        deck="这里是我读过、看过、听过的东西，以及几句短评。评分很主观，仅代表那一刻的我。"
        meta={
          <>
            <span>{shelf.length} 项</span>
            {counts.map((c) => (
              <span key={c.kind}>
                <span className="dot" />
                {c.kind} {c.n}
              </span>
            ))}
            <span className="dot" />
            <span>平均 {avg.toFixed(1)} 星</span>
          </>
        }
      />

      <div className="tag-row">
        {KINDS.map((k) => (
          <button
            key={k}
            className={`tag-chip${kind === k ? ' is-active' : ''}`}
            onClick={() => setKind(k)}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="shelf-table">
        <div className="shelf-table__head">
          <span>类别</span>
          <span>名称 / 作者</span>
          <span>年份</span>
          <span>评分</span>
          <span>短评</span>
        </div>
        {list.map((s, i) => (
          <Reveal key={s.title} delay={Math.min(i, 8) * 35}>
            <div className="shelf-row">
              <span className="shelf-row__kind">{s.kind}</span>
              <div className="shelf-row__title">
                <strong>{s.title}</strong>
                <em>{s.creator}</em>
              </div>
              <span className="shelf-row__year">{s.year ?? '—'}</span>
              <Stars n={s.rating} />
              <p className="shelf-row__note">{s.note}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {list.length === 0 && <p className="empty">这个类别还没有记录。</p>}
    </div>
  )
}

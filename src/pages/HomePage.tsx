import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { getAllArticles, featuredArticle, getAllCategories } from '../content/articles'
import { notes } from '../content/notes'
import { shelf } from '../content/shelf'
import { notebox } from '../content/notebox'
import { profile } from '../content/site'
import ArticleCard from '../components/ArticleCard'
import Reveal from '../components/Reveal'
import { formatDate, formatMonthDay, useDocumentTitle } from '../lib/format'

const QUOTES = [
  '写作不是为了被理解，而是为了理解自己。',
  '慢一点，才看得见。',
  '把日子过成可以回望的样子。',
]

export default function HomePage() {
  useDocumentTitle(`${profile.siteName} · ${profile.tagline}`)
  const all = useMemo(() => getAllArticles(), [])
  const lead = featuredArticle
  const rest = all.filter((a) => a.slug !== lead.slug).slice(0, 4)
  const latestNotes = notes.slice(0, 5)
  const latestShelf = shelf.slice(0, 4)
  const categories = getAllCategories()

  const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)])

  useEffect(() => {
    document.documentElement.classList.add('is-home')
    return () => document.documentElement.classList.remove('is-home')
  }, [])

  return (
    <div className="home">
      {/* ── 封面 ── */}
      <section className="cover">
        <div className="cover__side">
          <span className="cover__issue">2026 · 秋季号</span>
          <span className="cover__lines" />
          <span className="cover__vertical">思考 / 学习 / 生活</span>
        </div>

        <div className="cover__main">
          <div className="cover__kicker">
            <span>第 001 期</span>
            <span className="cover__kicker-line" />
            <span>{formatDate(all[0].date)} 起更新</span>
          </div>

          <h1 className="cover__title">
            <span className="cover__title-zh">字里行间</span>
            <span className="cover__title-en">between the lines</span>
          </h1>

          <p className="cover__intro">{profile.intro}</p>

          <p className="cover__quote">「 {quote} 」</p>

          <div className="cover__actions">
            <Link to="/journal" className="btn btn--solid">
              开始阅读
            </Link>
            <Link to="/about" className="btn btn--ghost">
              关于我
            </Link>
          </div>
        </div>

        <aside className="cover__today">
          <h4>今天</h4>
          <time>{formatMonthDay(new Date().toISOString().slice(0, 10))}</time>
          <p>{notes[0].text.slice(0, 58)}…</p>
          <Link to="/daily">全部碎念 →</Link>
        </aside>
      </section>

      {/* ── 头条 ── */}
      <section className="band band--paper">
        <div className="band__head">
          <h2>
            <span className="band__zh">封面故事</span>
            <span className="band__en">Cover Story</span>
          </h2>
          <span className="band__rule" />
          <span className="band__count">共 {all.length} 篇</span>
        </div>

        <div className="lead-grid">
          <Reveal as="article" className="lead">
            <div className="lead__visual" aria-hidden>
              <span className="lead__visual-no">№ 01</span>
              <span className="lead__visual-cat">{lead.category}</span>
              <span className="lead__visual-circle" />
              <span className="lead__visual-caption">
                {lead.subtitle}
              </span>
            </div>
            <div className="lead__text">
              <ArticleCard article={lead} variant="lead" />
            </div>
          </Reveal>

          <div className="lead-aside">
            <h4 className="aside-head">本期目录</h4>
            <ol className="toc">
              {all.map((a, i) => (
                <li key={a.slug}>
                  <Link to={`/journal/${a.slug}`}>
                    <span className="toc__n">{String(i + 1).padStart(2, '0')}</span>
                    <span className="toc__t">{a.title}</span>
                    <span className="toc__p">{String(10 + i * 4)}</span>
                  </Link>
                </li>
              ))}
            </ol>

            <h4 className="aside-head">栏目</h4>
            <div className="chips">
              {categories.map((c) => (
                <Link key={c} to={`/journal?cat=${encodeURIComponent(c)}`} className="chip">
                  {c}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 文章流 ── */}
      <section className="band">
        <div className="band__head">
          <h2>
            <span className="band__zh">近期随笔</span>
            <span className="band__en">Recent Writing</span>
          </h2>
          <span className="band__rule" />
          <Link to="/journal" className="band__more">
            查看全部 →
          </Link>
        </div>

        <div className="story-grid">
          {rest.map((a, i) => (
            <Reveal key={a.slug} delay={i * 70}>
              <ArticleCard article={a} variant="standard" index={i + 1} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 碎念 ── */}
      <section className="band band--paper">
        <div className="band__head">
          <h2>
            <span className="band__zh">碎念</span>
            <span className="band__en">Daily Sheet</span>
          </h2>
          <span className="band__rule" />
          <Link to="/daily" className="band__more">
            全部 →
          </Link>
        </div>
        <ul className="daily-strip">
          {latestNotes.map((n, i) => (
            <Reveal as="li" key={n.date} delay={i * 60} className="daily-strip__item">
              <time>{formatDate(n.date)}</time>
              <p>{n.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ── 笔记 & 书影音 ── */}
      <section className="band split">
        <div className="split__col">
          <div className="band__head">
            <h2>
              <span className="band__zh">数字花园</span>
              <span className="band__en">Notes</span>
            </h2>
            <span className="band__rule" />
          </div>
          <ul className="garden-list">
            {notebox.map((nb) => (
              <li key={nb.slug}>
                <Link to={`/notes/${nb.slug}`}>
                  <span className="garden-list__theme">{nb.theme}</span>
                  <span className="garden-list__title">{nb.title}</span>
                  <span className="garden-list__date">{nb.updated.replace(/-/g, '.')}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/notes" className="text-link">
            进入笔记库 →
          </Link>
        </div>

        <div className="split__col split__col--right">
          <div className="band__head">
            <h2>
              <span className="band__zh">书影音</span>
              <span className="band__en">On the Shelf</span>
            </h2>
            <span className="band__rule" />
          </div>
          <ul className="shelf-mini">
            {latestShelf.map((s) => (
              <li key={s.title}>
                <span className="shelf-mini__kind">{s.kind}</span>
                <div>
                  <strong>{s.title}</strong>
                  <em>{s.creator}</em>
                </div>
                <span className="stars" aria-label={`${s.rating} 星`}>
                  {'★'.repeat(s.rating)}
                  <span className="stars--off">{'★'.repeat(5 - s.rating)}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link to="/shelf" className="text-link">
            查看书架 →
          </Link>
        </div>
      </section>

      {/* ── 落款 ── */}
      <section className="signoff">
        <p className="signoff__lead">如果你读到了这里</p>
        <p className="signoff__body">
          说明你愿意花费一段时间，和我一起慢下来。欢迎给我写信，聊聊你最近在想的某件事。
        </p>
        <a className="btn btn--solid" href={`mailto:${profile.contacts[0].value}`}>
          写一封信
        </a>
      </section>
    </div>
  )
}

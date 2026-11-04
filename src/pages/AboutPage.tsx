import { Link } from 'react-router-dom'
import { profile } from '../content/site'
import { articles } from '../content/articles'
import Markdown from '../components/Markdown'
import { useDocumentTitle } from '../lib/format'

export default function AboutPage() {
  useDocumentTitle('关于 · 字里行间')

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero__left">
          <span className="about-hero__kicker">About the Editor</span>
          <h1 className="about-hero__name">
            {profile.owner}
            <span>编辑 · 作者 · 读者</span>
          </h1>
          <p className="about-hero__intro">{profile.intro}</p>
        </div>

        <div className="about-hero__portrait" aria-hidden>
          <span className="portrait__num">№ 001</span>
          <span className="portrait__glyph">林</span>
          <span className="portrait__lines" />
          <span className="portrait__caption">「 每个人都是一本没有索引的书 」</span>
        </div>
      </div>

      <div className="about-layout">
        <div className="about-body about-body--plain">
          <Markdown source={profile.bio} />
        </div>

        <aside className="about-side">
          <h4>联系我</h4>
          <ul>
            {profile.contacts.map((c) => (
              <li key={c.label}>
                <a href={c.href}>
                  <span>{c.label}</span>
                  {c.value}
                </a>
              </li>
            ))}
          </ul>

          <h4>本站构成</h4>
          <dl>
            <dt>文字</dt>
            <dd>{articles.length} 篇随笔</dd>
            <dt>栏目</dt>
            <dd>随笔 / 笔记 / 碎念 / 书影音</dd>
            <dt>构建</dt>
            <dd>Vite + React + TypeScript</dd>
            <dt>排版</dt>
            <dd>自研 CSS 网格系统</dd>
          </dl>

          <h4>一些原则</h4>
          <ol className="about-principles">
            <li>写自己真正想过的，不写「应该写」的。</li>
            <li>允许犹豫、修正与回头。</li>
            <li>不追逐更新频率，只追逐想清楚。</li>
          </ol>
        </aside>
      </div>

      <div className="about-cta">
        <p>如果你也想聊聊上面这些，欢迎写一封信。</p>
        <Link to="/journal" className="btn btn--solid">
          先去读几篇 →
        </Link>
      </div>
    </div>
  )
}

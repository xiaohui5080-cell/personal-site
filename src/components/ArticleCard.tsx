import { Link } from 'react-router-dom'
import type { Article } from '../content/articles'
import { formatDate } from '../lib/format'

type Variant = 'lead' | 'standard' | 'compact'

export default function ArticleCard({
  article,
  variant = 'standard',
  index,
}: {
  article: Article
  variant?: Variant
  index?: number
}) {
  const num = typeof index === 'number' ? String(index + 1).padStart(2, '0') : null

  if (variant === 'compact') {
    return (
      <Link to={`/journal/${article.slug}`} className="story-row">
        <time className="story-row__date">{formatDate(article.date)}</time>
        <div className="story-row__body">
          <h3>{article.title}</h3>
          <p>{article.subtitle}</p>
        </div>
        <span className="story-row__cat">{article.category}</span>
      </Link>
    )
  }

  return (
    <article className={`story story--${variant}`}>
      {num && <span className="story__num">{num}</span>}
      <Link to={`/journal/${article.slug}`} className="story__link">
        <div className="story__meta">
          <span className="story__cat">{article.category}</span>
          <span className="story__dot">·</span>
          <time>{formatDate(article.date)}</time>
          <span className="story__dot">·</span>
          <span>{article.readingTime} 分钟</span>
        </div>
        <h3 className="story__title">{article.title}</h3>
        {variant === 'lead' && <p className="story__subtitle">{article.subtitle}</p>}
        <p className="story__excerpt">{article.excerpt}</p>
        <div className="story__foot">
          <span className="story__more">阅读全文</span>
          <span className="story__tags">{article.tags.map((t) => `#${t}`).join('  ')}</span>
        </div>
      </Link>
    </article>
  )
}

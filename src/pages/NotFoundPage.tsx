import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../lib/format'

export default function NotFoundPage() {
  useDocumentTitle('页面走丢了 · 字里行间')
  return (
    <div className="notfound">
      <span className="notfound__code">404</span>
      <h1>这一页不存在</h1>
      <p>也许它还在写，也许它被搬去了别处。</p>
      <div className="notfound__actions">
        <Link to="/" className="btn btn--solid">
          回到首页
        </Link>
        <Link to="/journal" className="btn btn--ghost">
          去看看随笔
        </Link>
      </div>
    </div>
  )
}

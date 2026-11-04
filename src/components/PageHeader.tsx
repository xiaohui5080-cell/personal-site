import { useEffect, type ReactNode } from 'react'

type Props = {
  kicker: string
  title: ReactNode
  deck?: ReactNode
  meta?: ReactNode
  children?: ReactNode
}

/** 栏目页统一的大标题版式 */
export default function PageHeader({ kicker, title, deck, meta, children }: Props) {
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [kicker])

  return (
    <header className="page-head">
      <div className="rule rule--top">
        <span>{kicker}</span>
      </div>
      <h1 className="page-head__title">{title}</h1>
      {deck && <p className="page-head__deck">{deck}</p>}
      {meta && <div className="page-head__meta">{meta}</div>}
      {children}
    </header>
  )
}

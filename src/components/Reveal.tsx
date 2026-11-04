import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'li'
}

/**
 * 元素进入视口时淡入上升。
 * - 尊重「减少动态效果」设置
 * - 若 IntersectionObserver 不可用，或元素在首屏之外的距离较近，直接显示
 */
export default function Reveal({ children, delay = 0, className = '', as = 'div' }: Props) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '200px 0px 200px 0px', threshold: 0 },
    )
    io.observe(el)

    // 兜底：若布局导致观察器久久未触发（例如长页面、打印、截图场景），2 秒后直接显示，
    // 避免内容永久不可见
    const fallback = window.setTimeout(() => setShown(true), 2000)

    return () => {
      io.disconnect()
      window.clearTimeout(fallback)
    }
  }, [])

  const Tag = as as 'div'
  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={`reveal${shown ? ' is-shown' : ''}${className ? ` ${className}` : ''}`}
      style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  )
}

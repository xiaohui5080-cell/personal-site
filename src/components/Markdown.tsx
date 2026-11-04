import { useEffect, useMemo, useRef } from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

type Props = {
  source: string
  /** 旁注编号起始值 */
  startIndex?: number
  className?: string
}

let counter = 0

/**
 * 把 Markdown 渲染为杂志排版。
 * 段落后紧跟的 `> 引用` 会被移入右侧页边成为旁注（sidenote），
 * 窄屏上则自动折叠为段后的注解块。
 */
export default function Markdown({ source, startIndex = 1, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const idPrefix = useRef(`md${counter++}`)

  const html = useMemo(() => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeStringify)
    return processor.processSync(source).toString()
  }, [source])

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const prefix = idPrefix.current
    const blocks = Array.from(root.children) as HTMLElement[]
    let n = startIndex

    blocks.forEach((block, i) => {
      if (block.tagName !== 'BLOCKQUOTE') return
      if (block.classList.contains('sidenote')) return
      const prev = blocks[i - 1]
      if (!prev || prev.classList.contains('sidenote')) return

      const idx = n++
      const sup = document.createElement('sup')
      sup.className = 'sidenote-reference'
      const a = document.createElement('a')
      a.href = `#${prefix}-note-${idx}`
      a.id = `${prefix}-ref-${idx}`
      a.textContent = String(idx)
      sup.appendChild(a)
      prev.appendChild(sup)

      block.classList.add('sidenote')
      block.id = `${prefix}-note-${idx}`
      block.setAttribute('data-index', String(idx))
    })

    // 首字下沉：仅当首段以汉字/字母开头，且不是明显的左右结构独旁字时启用
    const firstPara = root.firstElementChild as HTMLElement | null
    if (firstPara && firstPara.tagName === 'P') {
      const firstChar = (firstPara.textContent ?? '').trim().charAt(0)
      const isAscii = /[A-Za-z0-9]/.test(firstChar)
      // 这些字下沉会拆掉偏旁，视觉上不成立
      const avoidDropCap = '注你他她们是很我之这那就也一'
      if (isAscii || !avoidDropCap.includes(firstChar)) {
        firstPara.classList.add('has-dropcap')
      }
    }

    const hasNotes = root.querySelector('.sidenote') !== null
    root.classList.toggle('has-sidenotes', hasNotes)
    if (!hasNotes) return

    // 宽屏下把旁注垂直对齐到它所注解的段落顶部
    const place = () => {
      const rootTop = root.getBoundingClientRect().top
      blocks.forEach((block) => {
        if (!block.classList.contains('sidenote')) return
        const anchor = block.previousElementSibling as HTMLElement | null
        if (!anchor) return
        const offset = anchor.getBoundingClientRect().top - rootTop
        block.style.top = `${Math.max(0, offset)}px`
      })
    }

    place()
    const ro = new ResizeObserver(place)
    ro.observe(root)
    window.addEventListener('resize', place)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', place)
    }
  }, [html, startIndex])

  return (
    <div
      ref={ref}
      className={`prose ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

import { useEffect } from 'react'
import { format } from 'date-fns'

export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`)
  return format(d, 'yyyy.MM.dd')
}

export function formatMonthDay(iso: string): string {
  const d = new Date(`${iso}T00:00:00`)
  return `${format(d, 'MM')}.${format(d, 'dd')}`
}

export function formatYear(iso: string): string {
  return iso.slice(0, 4)
}

export function formatFull(iso: string): string {
  const d = new Date(`${iso}T09:00:00`)
  return `${format(d, 'yyyy 年 M 月 d 日')} · ${weekday(iso)}`
}

const WEEK = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
export function weekday(iso: string): string {
  const d = new Date(`${iso}T00:00:00`)
  return WEEK[d.getDay()]
}

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}

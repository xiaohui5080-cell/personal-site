export type Note = {
  date: string
  text: string
  tags?: string[]
}

export type ShelfItem = {
  title: string
  creator: string
  kind: '书' | '电影' | '剧集' | '播客' | '音乐'
  year?: string
  rating: number
  note: string
  date: string
}

export type NoteBook = {
  slug: string
  title: string
  summary: string
  theme: string
  updated: string
  body: string
}

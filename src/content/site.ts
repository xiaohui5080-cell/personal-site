import type { NoteBook } from './types'

export const profile = {
  siteName: '字里行间',
  siteNameEn: 'BETWEEN THE LINES',
  tagline: '一个人的杂志',
  owner: '林间',
  intro:
    '这里是我整理思考、学习总结与生活感悟的地方。没有宏大的主题，只有一个普通人对世界缓慢的注视。',
  bio: `## 关于我

你好，我是**林间**。目前在一个城市里做着一份与文字打交道的工作。

我在这里写三类东西：

- **思考**：关于注意力、效率、关系，那些我反复想却想不完的问题。
- **学习**：我怎样学一件很难的事，以及那些失败过的尝试。
- **生活**：一些很小的、不值得专门说、但不想忘掉的瞬间。

## 一点近况

最近在学画画，画得很难看。在重读《我们仨》。每天早上煮一壶茶，喝完才允许自己看手机。

## 为什么写

因为不写下来，想法在脑子里会越变越模糊，直到变成一种「好像懂过」的错觉。

写下来，至少能知道自己在哪里。

## 联系

如果你也想聊这些，欢迎写信：

**hello@example.com**`,
  contacts: [
    { label: '邮箱', value: 'hello@example.com', href: 'mailto:hello@example.com' },
    { label: 'GitHub', value: 'github.com/yourname', href: 'https://github.com' },
  ],
}

export type { NoteBook }

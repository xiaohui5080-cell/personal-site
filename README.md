# 字里行间 · 个人志

一个杂志编辑风的中文个人网站，用来整理思考、学习总结和生活感悟。

技术栈：**Vite + React + TypeScript**，纯静态站点，可免费部署到 GitHub Pages。

---

## 一、网站有什么

| 板块 | 地址 | 放什么内容 |
| --- | --- | --- |
| 首页 | `/` | 杂志式封面、封面故事、最新文章、碎念、笔记与书影音 |
| 随笔 | `/journal` | 长文（思考、学习总结），支持分类、标签、搜索 |
| 笔记 | `/notes` | 数字花园，长期更新的半成品想法 |
| 碎念 | `/daily` | 短小的日常片段，按月份分组 |
| 书影音 | `/shelf` | 看过的书、电影、剧集、播客 + 短评 |
| 关于 | `/about` | 个人简介、联系方式 |

**设计特点**：纸感底色、中文衬线标题、细线分隔、大留白；文章内支持「旁注」（`> 引用`会自动移到页边，手机上折叠成注解块）。

---

## 二、本地怎么看

需要先安装 [Node.js](https://nodejs.org/)（选 LTS 版本）。

```bash
# 1. 安装依赖（只需第一次）
pnpm install

# 2. 启动本地预览
pnpm dev
```

然后浏览器打开终端里显示的地址（通常是 `http://localhost:5173`）。

> 没有 pnpm？先运行 `npm install -g pnpm`。
> 或者把上面命令里的 `pnpm` 全换成 `npm run`。

`pnpm dev` 是**热更新**的：你改了文章内容，保存后浏览器立刻刷新，不用重启。

---

## 三、怎么写东西（最重要）

**所有内容都在 `src/content/` 文件夹里，全都是普通文本文件，不需要懂代码，照着已有条目改文字就行。**

### 1. 写一篇长文 → `src/content/articles.ts`

复制一段已有的文章，修改这几项：

```ts
{
  slug: 'my-new-post',              // 网址里用的英文标识，不能和别人重复
  title: '文章标题',
  subtitle: '一句副标题',
  date: '2026-11-01',               // 格式必须是 年-月-日
  category: '思考',                  // 建议：思考 / 学习 / 生活 / 读书
  tags: ['标签一', '标签二'],
  excerpt: '列表页显示的摘要，一两句话。',
  readingTime: 6,                   // 预计阅读分钟数
  featured: false,                  // 改成 true 会成为首页「封面故事」
  body: `
## 小标题

正文段落。支持 **加粗**、*斜体*、[链接](https://example.com)。

- 列表项一
- 列表项二

> 这一段会被自动排版成页边的「旁注」。

## 另一个小标题

继续写。
`,
}
```

**正文（body）支持 Markdown**：

| 写法 | 效果 |
| --- | --- |
| `## 标题` | 大标题（自动加装饰线，并进入右侧目录） |
| `### 小标题` | 小标题（左侧竖线） |
| `**加粗**` | 加粗（带浅色底色） |
| `> 引用` | 页边旁注 / 手机上的注解块 |
| `- 项目` | 无序列表 |
| `1. 项目` | 有序列表 |
| `[文字](网址)` | 链接 |
| `\| 表格 \|` | 表格（需要 markdown 表格语法） |
| ` ```代码``` ` | 代码块 |

### 2. 写碎念 → `src/content/notes.ts`

```ts
{
  date: '2026-11-01',
  text: '今天发生的一件小事。',
  tags: ['日常'],
},
```

### 3. 加书影音 → `src/content/shelf.ts`

```ts
{
  title: '书名或片名',
  creator: '作者或导演',
  kind: '书',        // 书 / 电影 / 剧集 / 播客
  year: '2024',
  rating: 5,         // 1-5 星
  note: '一句短评。',
  date: '2026-11-01',
},
```

### 4. 写笔记 → `src/content/notebox.ts`

```ts
{
  slug: 'note-slug',
  title: '笔记标题',
  summary: '一句话说明这篇笔记在讲什么。',
  theme: '认知',     // 认知 / 表达 / 生活 / 技术
  updated: '2026-11-01',
  body: `## 小标题\n\n内容……`,
},
```

### 5. 改名字、邮箱、简介 → `src/content/site.ts`

把 `siteName`（站名）、`owner`（你的名字）、`intro`（首页简介）、`bio`（关于页正文）、`contacts`（联系方式）都换成你自己的。

---

## 四、部署到 GitHub Pages（得到真网址）

详见仓库根目录的 **`部署指南.md`**，里面有逐步操作说明。

简要说：把本项目推到 GitHub 仓库，在仓库的 **Settings → Pages** 里把 Source 选成 **GitHub Actions**，之后每次 push，网站会自动重新构建发布。

网址会是这样：

```
https://你的用户名.github.io/仓库名/
```

---

## 五、常见问题

**Q：改完内容，网站上没变化？**
A：本地要保存文件（热更新会自动刷新）；线上要等 GitHub Actions 跑完（约 1-2 分钟），可以到仓库的 **Actions** 标签页看进度。

**Q：想让某篇文章上首页大图？**
A：把那篇文章的 `featured` 改成 `true`。

**Q：日期格式写错了会怎样？**
A：会显示成 `Invalid Date`，或者排序错乱。务必用 `2026-11-01` 这种格式（补零）。

**Q：想换配色？**
A：打开 `src/styles/global.css`，最上面的 `:root` 里改 `--paper`（纸色）、`--ink`（墨色）、`--accent`（强调色，现在是砖红）即可。

**Q：想改站名？**
A：改 `src/content/site.ts` 里的 `siteName` 和 `siteNameEn`，以及 `index.html` 里的 `<title>`。

---

## 六、项目结构

```
personal-site/
├── .github/workflows/deploy.yml   # 自动部署配置（勿改）
├── public/favicon.svg             # 网站图标
├── src/
│   ├── content/                   # ← 你只需要改这里
│   │   ├── articles.ts            #   长文
│   │   ├── notes.ts               #   碎念
│   │   ├── shelf.ts               #   书影音
│   │   ├── notebox.ts             #   笔记
│   │   ├── site.ts                #   站名 / 关于我 / 联系方式
│   │   └── types.ts               #   类型定义
│   ├── components/                # 组件（页头、页脚、文章卡片等）
│   ├── pages/                     # 各个页面
│   ├── styles/                    # 样式（想改外观看这里）
│   ├── lib/format.ts              # 日期格式化等小工具
│   ├── App.tsx                    # 路由
│   └── main.tsx                   # 入口
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig*.json
```

---

## 许可

页面里的示例文字仅作排版演示，请换成你自己的内容。

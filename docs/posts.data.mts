import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  date: string
  category: string
  tags: string[]
  excerpt: string
}

export default createContentLoader('posts/*.md', {
  excerpt: true,
  transform(raw): Post[] {
    return raw
      .filter((page) => page.url !== '/posts/')
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title || '未命名',
        url,
        date: frontmatter.date
          ? new Date(frontmatter.date).toISOString().slice(0, 10)
          : '',
        category: frontmatter.category || '未分类',
        tags: frontmatter.tags || [],
        excerpt: frontmatter.excerpt || excerpt || '',
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  },
})

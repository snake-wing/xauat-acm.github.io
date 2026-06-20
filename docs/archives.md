---
sidebar: false
aside: true
---

<script setup>
import { data as posts } from './posts.data'
import { computed } from 'vue'
import { setPosts } from './.vitepress/theme/composables/usePosts'

// 修复问题5：将文章数据注入全局 store，供右侧边栏使用
setPosts(posts)

const archives = computed(() => {
  const grouped = {}
  for (const post of posts) {
    const year = post.date?.slice(0, 4) || '未知'
    if (!grouped[year]) grouped[year] = []
    grouped[year].push(post)
  }
  return Object.entries(grouped).sort((a, b) => b[0].localeCompare(a[0]))
})
</script>

# 文章归档

<div class="archive-list">
  <div v-for="[year, yearPosts] in archives" :key="year">
    <div class="archive-year">{{ year }}</div>
    <div v-for="post in yearPosts" :key="post.url" class="archive-item">
      <span class="archive-date">{{ post.date?.slice(5) }}</span>
      <a :href="post.url" class="archive-title">{{ post.title }}</a>
    </div>
  </div>
  <div v-if="posts.length === 0" style="text-align:center;padding:3rem 0;color:var(--vp-c-text-3)">
    暂无文章
  </div>
</div>

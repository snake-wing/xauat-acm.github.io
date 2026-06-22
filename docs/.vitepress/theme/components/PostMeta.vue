<script setup lang="ts">
import { useRoute, withBase } from 'vitepress'
import { computed } from 'vue'
import { useData } from 'vitepress'

const route = useRoute()
const { frontmatter, page } = useData()

// 用 page.relativePath 判断（SSR 可靠，值为 "posts/welcome.md"）
const showMeta = computed(() => {
  const rp = page.value?.relativePath || ''
  const rPath = route.path || ''
  return rp.startsWith('posts/') || rPath.startsWith('/posts/') || rPath.includes('/posts/')
})

const dateLabel = computed(() => {
  if (frontmatter.value.date) {
    return new Date(frontmatter.value.date).toISOString().slice(0, 10)
  }
  return ''
})

const category = computed(() => frontmatter.value.category || '')
const tags = computed(() => frontmatter.value.tags || [])

const tagColors = [
  '#49b1f5', '#7c3aed', '#db2777', '#ea580c', '#16a34a',
  '#0891b2', '#ca8a04', '#4f46e5', '#be185d', '#0284c7',
]
function tagColor(idx: number) {
  return tagColors[idx % tagColors.length]
}
</script>

<template>
  <div v-if="showMeta" class="post-meta-header">
    <h1 class="post-meta-title">{{ frontmatter.title }}</h1>
    <div class="post-meta-bar">
      <span v-if="dateLabel" class="post-meta-date">
        <svg class="post-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        {{ dateLabel }}
      </span>
      <a v-if="category" :href="withBase(`/tags?tag=${encodeURIComponent(category)}`)" class="post-meta-category">
        <svg class="post-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        </svg>
        {{ category }}
      </a>
      <span class="post-meta-tags" v-if="tags.length > 0">
        <svg class="post-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
        </svg>
        <a
          v-for="(tag, idx) in tags"
          :key="tag"
          :href="withBase(`/tags?tag=${encodeURIComponent(tag)}`)"
          class="post-meta-tag"
          :style="{ color: tagColor(idx), borderColor: tagColor(idx) + '40', background: tagColor(idx) + '10' }"
        >{{ tag }}</a>
      </span>
    </div>
    <div class="post-meta-divider"></div>
  </div>
</template>

<style scoped>
.post-meta-header {
  margin-bottom: 2rem;
}

.post-meta-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.post-meta-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.88rem;
  color: var(--vp-c-text-2);
}

.post-meta-icon {
  width: 14px;
  height: 14px;
  vertical-align: -2px;
  margin-right: 0.2rem;
}

.post-meta-date {
  display: inline-flex;
  align-items: center;
  opacity: 0.75;
}

.post-meta-category {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: var(--vp-c-brand);
  font-weight: 600;
  transition: opacity 0.15s;
}
.post-meta-category:hover {
  opacity: 0.7;
}

.post-meta-tags {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.post-meta-tag {
  display: inline-block;
  padding: 0.1rem 0.5rem;
  border-radius: 10px;
  font-size: 0.75rem;
  text-decoration: none;
  border: 1px solid;
  transition: transform 0.15s;
}
.post-meta-tag:hover {
  transform: scale(1.05);
}

.post-meta-divider {
  margin-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

/* 暗色模式 */
html.dark .post-meta-bar {
  color: var(--vp-c-text-2);
}
html.dark .post-meta-divider {
  border-color: #2a2a45;
}
</style>

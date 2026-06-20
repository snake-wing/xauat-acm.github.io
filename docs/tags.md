---
sidebar: false
aside: true
---

<script setup>
import { data as posts } from './posts.data'
import { computed, ref, onMounted } from 'vue'
import { setPosts } from './.vitepress/theme/composables/usePosts'

// 修复问题5：将文章数据注入全局 store，供右侧边栏使用
setPosts(posts)

const activeCategory = ref('')
const activeTag = ref('')

onMounted(() => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    const tag = params.get('tag')
    if (tag) {
      const catNames = categoryCounts.value.map(([c]) => c)
      if (catNames.includes(tag)) {
        activeCategory.value = tag
      } else {
        activeTag.value = tag
      }
    }
  }
})

const categoryCounts = computed(() => {
  const counts = {}
  for (const post of posts) {
    const cat = post.category || '未分类'
    counts[cat] = (counts[cat] || 0) + 1
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])
})

const tagCounts = computed(() => {
  const counts = {}
  for (const post of posts) {
    for (const tag of post.tags) {
      counts[tag] = (counts[tag] || 0) + 1
    }
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])
})

const filterKey = computed(() => activeCategory.value || activeTag.value)

const filteredPosts = computed(() => {
  if (!filterKey.value) return posts
  return posts.filter(p => {
    if (activeCategory.value) return (p.category || '未分类') === activeCategory.value
    if (activeTag.value) return p.tags?.includes(activeTag.value)
    return true
  })
})

function selectCategory(cat) {
  activeCategory.value = activeCategory.value === cat ? '' : cat
  activeTag.value = ''
}

function selectTag(tag) {
  activeTag.value = activeTag.value === tag ? '' : tag
  activeCategory.value = ''
}
</script>

# 🏷️ 标签

<div class="tags-page">

<section class="tags-block">
  <h2 class="tags-block-title">📂 文章分类</h2>
  <div class="tags-cloud">
    <span v-for="[cat, count] in categoryCounts" :key="cat" class="tags-chip" :class="{ active: activeCategory === cat }" @click="selectCategory(cat)">
      {{ cat }}<sup>{{ count }}</sup>
    </span>
  </div>
</section>

<section class="tags-block">
  <h2 class="tags-block-title">🔖 所有标签</h2>
  <div class="tags-cloud">
    <span v-for="[tag, count] in tagCounts" :key="tag" class="tags-chip" :class="{ active: activeTag === tag }" @click="selectTag(tag)">
      {{ tag }}<sup>{{ count }}</sup>
    </span>
  </div>
</section>

<section class="tags-block" v-if="filterKey">
  <h2 class="tags-block-title">「{{ filterKey }}」相关文章 ({{ filteredPosts.length }})</h2>
  <div class="post-list">
    <div v-for="post in filteredPosts" :key="post.url" class="post-item">
      <a :href="post.url" class="post-title">{{ post.title }}</a>
      <div class="post-meta">
        <span class="post-date">{{ post.date }}</span>
        <span class="post-category">{{ post.category }}</span>
        <span class="post-tags">
          <a v-for="t in post.tags" :key="t" :href="`/tags?tag=${encodeURIComponent(t)}`" class="post-tag">{{ t }}</a>
        </span>
      </div>
      <p class="post-excerpt" v-if="post.excerpt">{{ post.excerpt }}</p>
    </div>
    <div v-if="filteredPosts.length === 0" class="post-empty">没有找到相关文章</div>
  </div>
</section>

</div>

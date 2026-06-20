---
layout: page
---

<script setup>
import { data as posts } from './posts.data'
import { computed, ref, onMounted } from 'vue'

// 读取 URL query 参数
const selectedTag = ref('')
onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  const tag = params.get('tag')
  if (tag) selectedTag.value = tag
})

// 按标签统计
const tagCounts = computed(() => {
  const counts = {}
  for (const post of posts) {
    for (const tag of post.tags) {
      counts[tag] = (counts[tag] || 0) + 1
    }
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])
})

// 按分类统计
const categoryCounts = computed(() => {
  const counts = {}
  for (const post of posts) {
    const cat = post.category || '未分类'
    counts[cat] = (counts[cat] || 0) + 1
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])
})

// 筛选后的文章
const filteredPosts = computed(() => {
  if (!selectedTag.value) return posts
  return posts.filter(p => p.tags?.includes(selectedTag.value))
})
</script>

# 标签

<div class="tags-container">
  <h2>文章分类</h2>
  <div class="tag-cloud">
    <span
      v-for="[cat, count] in categoryCounts"
      :key="cat"
      class="tag-item"
      :class="{ active: selectedTag === cat }"
      @click="selectedTag = selectedTag === cat ? '' : cat"
    >
      {{ cat }}
      <span class="tag-count">{{ count }}</span>
    </span>
  </div>

  <h2>所有标签</h2>
  <div class="tag-cloud">
    <span
      v-for="[tag, count] in tagCounts"
      :key="tag"
      class="tag-item"
      :class="{ active: selectedTag === tag }"
      @click="selectedTag = selectedTag === tag ? '' : tag"
    >
      {{ tag }}
      <span class="tag-count">{{ count }}</span>
    </span>
  </div>

  <div v-if="selectedTag" style="margin-top:2rem">
    <h2>「{{ selectedTag }}」相关文章</h2>
    <div class="post-list" style="padding-top:0.5rem">
      <div v-for="post in filteredPosts" :key="post.url" class="post-item">
        <a :href="post.url" class="post-title">{{ post.title }}</a>
        <div class="post-meta">
          <span>{{ post.date }}</span>
          <span class="post-category">{{ post.category }}</span>
        </div>
        <p class="post-excerpt" v-if="post.excerpt">{{ post.excerpt }}</p>
      </div>
      <div v-if="filteredPosts.length === 0" style="text-align:center;padding:2rem;color:var(--vp-c-text-3)">
        没有找到相关文章
      </div>
    </div>
  </div>
</div>

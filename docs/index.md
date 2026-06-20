---
layout: page
---

<script setup>
import { data as posts } from './posts.data'
import { computed } from 'vue'
import TypedBanner from './.vitepress/theme/components/TypedBanner.vue'

// 统计数据
const postCount = computed(() => posts.length)
const tagSet = computed(() => {
  const set = new Set()
  posts.forEach(p => p.tags?.forEach(t => set.add(t)))
  return set
})
const categorySet = computed(() => {
  const set = new Set()
  posts.forEach(p => { if (p.category) set.add(p.category) })
  return set
})
</script>

<!-- Hero 区域 -->
<section class="hero">
  <div class="hero-content">
    <h1 class="hero-title">XAUAT ACM</h1>
    <p class="hero-subtitle">西安建筑科技大学 ACM 协会</p>
    <div class="hero-typed">
      <TypedBanner />
    </div>
    <p class="hero-desc">算法竞赛 · 编程训练 · 技术交流 · 以赛促学</p>
    <div class="hero-actions">
      <a href="/about" class="hero-btn hero-btn-primary">了解我们</a>
      <a href="/about#加入我们" class="hero-btn hero-btn-secondary">加入协会</a>
    </div>
  </div>
</section>

<!-- 统计卡片 -->
<section class="stats">
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-number">{{ postCount }}</div>
      <div class="stat-label">文章</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">{{ categorySet.size }}</div>
      <div class="stat-label">分类</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">{{ tagSet.size }}</div>
      <div class="stat-label">标签</div>
    </div>
  </div>
</section>

<!-- 最新文章 -->
<section class="post-section">
  <h2 class="section-title">📝 最新文章</h2>
  <div class="post-list">
    <div v-for="post in posts" :key="post.url" class="post-item">
      <a :href="post.url" class="post-title">{{ post.title }}</a>
      <div class="post-meta">
        <span class="post-date">{{ post.date }}</span>
        <a :href="`/tags?tag=${post.category}`" class="post-category">{{ post.category }}</a>
        <span class="post-tags">
          <a
            v-for="tag in post.tags"
            :key="tag"
            :href="`/tags?tag=${tag}`"
            class="post-tag"
          >{{ tag }}</a>
        </span>
      </div>
      <p class="post-excerpt" v-if="post.excerpt">{{ post.excerpt }}</p>
    </div>
    <div v-if="posts.length === 0" class="post-empty">
      还没有文章，开始写第一篇吧 ✍️
    </div>
  </div>
  <div class="view-all" v-if="posts.length > 0">
    <a href="/archives" class="view-all-link">查看全部归档 →</a>
  </div>
</section>

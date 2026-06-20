---
layout: page
---

<script setup>
import { data as posts } from './posts.data'
</script>

# XAUAT ACM

西安建筑科技大学 ACM 协会

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
  <div v-if="posts.length === 0" style="text-align:center;padding:3rem 0;color:var(--vp-c-text-3)">
    还没有文章，开始写第一篇吧 ✍️
  </div>
</div>

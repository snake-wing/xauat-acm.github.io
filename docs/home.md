---
sidebar: false
aside: true
---

<script setup>
import { data as posts } from './posts.data'
import { ref, computed, onMounted } from 'vue'
import { withBase } from 'vitepress'
import Pagination from './.vitepress/theme/components/Pagination.vue'
import { setPosts } from './.vitepress/theme/composables/usePosts'

// 将文章数据注入全局 store，供右侧边栏使用
setPosts(posts)

const pageSize = 5
const currentPage = ref(1)
const totalPages = computed(() => Math.max(1, Math.ceil(posts.length / pageSize)))

const pagedPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return posts.slice(start, start + pageSize)
})

function goPage(page) {
  currentPage.value = page
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<!-- 最新文章 -->
<section class="post-section">
  <div class="post-list">
    <div v-for="post in pagedPosts" :key="post.url" class="post-item">
      <a :href="withBase(post.url)" class="post-title">{{ post.title }}</a>
      <div class="post-meta">
        <span class="post-date">{{ post.date }}</span>
        <a :href="withBase(`/tags?tag=${encodeURIComponent(post.category)}`)" class="post-category">{{ post.category }}</a>
        <span class="post-tags">
          <a
            v-for="tag in post.tags"
            :key="tag"
            :href="withBase(`/tags?tag=${encodeURIComponent(tag)}`)"
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

  <Pagination
    v-if="totalPages > 1"
    :currentPage="currentPage"
    :totalPages="totalPages"
    @page-change="goPage"
  />
</section>

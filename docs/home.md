---
sidebar: false
aside: true
---

<script setup>
import { data as posts } from './posts.data'
import HomeDashboard from './.vitepress/theme/components/HomeDashboard.vue'
import { setPosts } from './.vitepress/theme/composables/usePosts'

// 注入全局 store 供右侧边栏使用
setPosts(posts)
</script>

<HomeDashboard :posts="posts" />

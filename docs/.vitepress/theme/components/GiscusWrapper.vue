<script setup>
import { useRoute } from 'vitepress'
import { computed } from 'vue'
import Giscus from './Giscus.vue'

const route = useRoute()
// 仅在首页和文章详情页显示评论
const showGiscus = computed(() => {
  const path = route.path
  return path === '/' || path === '/index.html' || path.startsWith('/posts/')
})
</script>

<template>
  <Giscus v-if="showGiscus" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const runtime = ref('')

// 网站成立日期：2026年6月20日
const BIRTH = new Date('2026-06-20').getTime()

function updateRuntime() {
  const now = Date.now()
  const diff = now - BIRTH
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  runtime.value = `${days}`
}

let timer = null

onMounted(() => {
  updateRuntime()
  timer = setInterval(updateRuntime, 60000) // 每分钟更新
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <span class="site-runtime">
    本站已运行 <strong>{{ runtime }}</strong> 天
  </span>
</template>

<style scoped>
.site-runtime {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}

.site-runtime strong {
  color: var(--vp-c-brand);
}
</style>

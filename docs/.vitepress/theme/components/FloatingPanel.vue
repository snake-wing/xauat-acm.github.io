<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()
const showBackTop = ref(false)

function toggleDark() {
  isDark.value = !isDark.value
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleScroll() {
  showBackTop.value = window.scrollY > 300
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="floating-panel">
    <!-- 回到顶部 -->
    <button
      class="floating-btn back-top"
      :class="{ visible: showBackTop }"
      @click="scrollToTop"
      title="回到顶部"
    >
      ↑
    </button>

    <!-- 深色模式切换 -->
    <button class="floating-btn" @click="toggleDark" :title="isDark ? '浅色模式' : '深色模式'">
      {{ isDark ? '☀️' : '🌙' }}
    </button>
  </div>
</template>

<style scoped>
.floating-panel {
  position: fixed;
  right: 1.5rem;
  bottom: 6rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 100;
}

.floating-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.floating-btn:hover {
  color: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.floating-btn.back-top {
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.floating-btn.back-top.visible {
  opacity: 1;
  visibility: visible;
}

@media (max-width: 768px) {
  .floating-panel {
    right: 0.75rem;
    bottom: 4rem;
  }
}
</style>

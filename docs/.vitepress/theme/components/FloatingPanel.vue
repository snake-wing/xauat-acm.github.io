<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showBackTop = ref(false)

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
  <button
    class="back-to-top"
    :class="{ visible: showBackTop }"
    @click="scrollToTop"
    title="回到顶部"
  >
    ↑
  </button>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  right: 1.5rem;
  bottom: 3rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  background: #fff;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.1rem;
  z-index: 50;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
}

.back-to-top.visible {
  opacity: 1;
  visibility: visible;
}

.back-to-top:hover {
  color: #2563eb;
  border-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(0,0,0,0.12);
}

@media (max-width: 768px) {
  .back-to-top { right: 0.75rem; bottom: 2rem; }
}
</style>

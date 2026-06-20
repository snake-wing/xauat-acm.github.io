<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const el = ref(null)
let typed = null

onMounted(() => {
  // 动态加载 typed.js
  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/typed.js@2.1.0/dist/typed.umd.min.js'
  script.onload = () => {
    if (el.value && window.Typed) {
      typed = new window.Typed(el.value, {
        strings: [
          'Talk is cheap, let\'s code!',
          'just enjoy it!',
          'coding changes the world!',
          '算法改变世界，代码书写未来',
          '欢迎加入 XAUAT ACM 协会',
        ],
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 2000,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
      })
    }
  }
  document.head.appendChild(script)
})

onUnmounted(() => {
  if (typed) typed.destroy()
})
</script>

<template>
  <span ref="el" class="typed-banner"></span>
</template>

<style scoped>
.typed-banner {
  display: inline-block;
  font-size: 1.25rem;
  color: var(--vp-c-brand);
  min-height: 2rem;
}
</style>

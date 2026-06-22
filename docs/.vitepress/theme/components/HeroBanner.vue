<script setup lang="ts">
import { useRoute, useData } from 'vitepress'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const route = useRoute()
const { page } = useData()
// page.relativePath 在 SSR 时更可靠
const isHome = computed(() => {
  const rp = page.value?.relativePath || ''
  return rp === 'index.md' || rp === ''
})

// Typed.js 打字机效果
const typedEl = ref<HTMLElement | null>(null)
let typed: any = null

onMounted(() => {
  if (!isHome.value || typeof window === 'undefined') return
  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/typed.js@2.1.0/dist/typed.umd.min.js'
  script.onload = () => {
    if (typedEl.value && (window as any).Typed) {
      typed = new (window as any).Typed(typedEl.value, {
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

// 平滑滚动到内容区
function scrollToContent() {
  const main = document.querySelector('.VPDoc')
  if (main) {
    main.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section v-if="isHome" class="hero-banner">
    <!-- 背景层: 浮动光斑 -->
    <div class="hero-orb orb-1"></div>
    <div class="hero-orb orb-2"></div>
    <div class="hero-orb orb-3"></div>

    <!-- 网格纹理 -->
    <div class="hero-grid"></div>

    <!-- 主内容 -->
    <div class="hero-content">
      <!-- Logo 光环 -->
      <div class="hero-logo-ring">
        <img src="/favicon.png" alt="XAUAT ACM" class="hero-logo-img" />
      </div>

      <h1 class="hero-title">XAUAT ACM</h1>
      <p class="hero-subtitle">西安建筑科技大学 ACM 协会</p>

      <!-- 打字机标语 -->
      <div class="hero-typed">
        <span ref="typedEl"></span>
      </div>

      <p class="hero-desc">算法竞赛 · 编程训练 · 技术交流 · 以赛促学</p>
    </div>

    <!-- 底部建筑剪影 -->
    <svg class="hero-skyline" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
      <rect x="0" y="60" width="60" height="60" opacity="0.15"/>
      <rect x="70" y="40" width="50" height="80" opacity="0.2"/>
      <rect x="130" y="50" width="70" height="70" opacity="0.12"/>
      <rect x="210" y="30" width="55" height="90" opacity="0.18"/>
      <rect x="280" y="55" width="80" height="65" opacity="0.14"/>
      <rect x="370" y="35" width="45" height="85" opacity="0.22"/>
      <rect x="430" y="65" width="65" height="55" opacity="0.1"/>
      <rect x="510" y="25" width="60" height="95" opacity="0.2"/>
      <rect x="580" y="48" width="75" height="72" opacity="0.13"/>
      <rect x="670" y="38" width="50" height="82" opacity="0.17"/>
      <rect x="740" y="58" width="70" height="62" opacity="0.11"/>
      <rect x="820" y="20" width="55" height="100" opacity="0.23"/>
      <rect x="890" y="45" width="80" height="75" opacity="0.15"/>
      <rect x="980" y="55" width="60" height="65" opacity="0.12"/>
      <rect x="1050" y="28" width="65" height="92" opacity="0.19"/>
      <rect x="1130" y="50" width="75" height="70" opacity="0.14"/>
      <rect x="1210" y="35" width="55" height="85" opacity="0.16"/>
      <rect x="1280" y="60" width="70" height="60" opacity="0.1"/>
      <rect x="1360" y="42" width="80" height="78" opacity="0.13"/>
      <path d="M0 120 L1440 120 L1440 90 Q1200 30 720 70 Q240 40 0 80 Z" opacity="0.08"/>
    </svg>

    <!-- 滚动提示 -->
    <div class="hero-scroll" @click="scrollToContent">
      <span class="hero-scroll-text">向下探索</span>
      <span class="hero-scroll-arrow">▾</span>
    </div>
  </section>
</template>

<style scoped>
/* Typed.js cursor color */
.hero-typed :deep(.typed-cursor) {
  color: rgba(255,255,255,0.8);
}
</style>

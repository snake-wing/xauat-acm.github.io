<script setup>
import { useRoute } from 'vitepress'
import { computed } from 'vue'

const route = useRoute()
const isHome = computed(() => route.path === '/' || route.path === '/index.html')
</script>

<template>
  <section v-if="isHome" class="hero-banner">
    <div class="hero-bg-placeholder">
      <img src="/images/hero-bg.jpg" alt="XAUAT ACM Banner" class="hero-bg-img" />
    </div>

    <div class="hero-banner-overlay">
      <div class="hero-banner-content">
        <h1 class="hero-banner-title">XAUAT ACM</h1>
        <p class="hero-banner-sub">西安建筑科技大学 ACM 协会</p>
        <p class="hero-banner-desc">算法竞赛 · 编程训练 · 技术交流 · 以赛促学</p>
      </div>
      <div class="hero-scroll-arrow">▾</div>
    </div>
  </section>
</template>

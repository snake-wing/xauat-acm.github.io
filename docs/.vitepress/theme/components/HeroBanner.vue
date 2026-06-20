<script setup>
import { useRoute } from 'vitepress'
import { computed } from 'vue'

const route = useRoute()
const isHome = computed(() => route.path === '/' || route.path === '/index.html')
</script>

<template>
  <!-- 需求2：全宽 Banner 区域，位于导航栏下方、双栏内容上方，高度约半屏 -->
  <section v-if="isHome" class="hero-banner">
    <!--
      Banner 图片占位区
      替换方式：将 docs/public/images/hero-bg.jpg 替换为实际图片
      或修改下方 img 标签的 src 属性
    -->
    <div class="hero-bg-placeholder">
      <img src="/images/hero-bg.jpg" alt="XAUAT ACM Banner" class="hero-bg-img" />
      <div class="hero-bg-fallback">
        <span class="hero-bg-icon">🖼️</span>
        <p class="hero-bg-hint">
          Banner 图片位<br/>
          <small>将图片放入 <code>docs/public/images/hero-bg.jpg</code> 并取消下方 img 标签注释</small>
        </p>
      </div>
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

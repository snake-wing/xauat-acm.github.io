<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { computed } from 'vue'
import RightSidebar from './components/RightSidebar.vue'
import FloatingPanel from './components/FloatingPanel.vue'
import Giscus from './components/Giscus.vue'
import SiteRuntime from './components/SiteRuntime.vue'
import TypedBanner from './components/TypedBanner.vue'

const { site, theme, frontmatter, isDark } = useData()
const route = useRoute()

const isHome = computed(() => route.path === '/' || route.path === '/index.html')

const nav = computed(() => theme.value.nav || [])

function openSearch() {
  const btn = document.querySelector('.DocSearch-Button') as HTMLElement
  if (btn) btn.click()
}
</script>

<template>
  <div class="site-root" :class="{ dark: isDark }">
    <!-- 左侧几何装饰 -->
    <div class="geo-decor">
      <div class="geo-circle"></div>
      <div class="geo-triangle"></div>
      <div class="geo-dot-grid"></div>
    </div>

    <!-- 顶部导航栏 -->
    <header class="top-nav">
      <div class="top-nav-inner">
        <a href="/" class="nav-logo">
          <span class="nav-logo-icon">ACM</span>
          <span class="nav-logo-text">{{ site.title }}</span>
        </a>
        <nav class="nav-links">
          <template v-for="item in nav" :key="item.text">
            <div v-if="item.items" class="nav-dropdown">
              <span class="nav-item">{{ item.text }} ▾</span>
              <div class="nav-dropdown-menu">
                <template v-for="child in item.items" :key="child.text || child.link">
                  <a v-if="child.link" :href="child.link" class="nav-dropdown-item">{{ child.text }}</a>
                  <template v-else>
                    <div class="nav-dropdown-group-label">{{ child.text }}</div>
                    <a v-for="sub in child.items" :key="sub.link" :href="sub.link" class="nav-dropdown-item nav-dropdown-sub">{{ sub.text }}</a>
                  </template>
                </template>
              </div>
            </div>
            <a v-else :href="item.link" class="nav-item" :class="{ active: route.path === item.link }">{{ item.text }}</a>
          </template>
          <button class="nav-icon-btn" @click="openSearch" title="搜索 (Ctrl+K)">🔍</button>
        </nav>
      </div>
    </header>

    <!-- Hero Banner (仅首页) — 校园风全屏 -->
    <section v-if="isHome" class="hero-banner">
      <!-- 背景层: 浮动光斑 -->
      <div class="hero-orb orb-1"></div>
      <div class="hero-orb orb-2"></div>
      <div class="hero-orb orb-3"></div>
      <!-- 网格纹理 -->
      <div class="hero-grid"></div>
      <!-- 主内容 -->
      <div class="hero-content">
        <div class="hero-logo-ring">
          <img src="/favicon.png" alt="XAUAT ACM" class="hero-logo-img" />
        </div>
        <h1 class="hero-title">XAUAT ACM</h1>
        <p class="hero-subtitle">西安建筑科技大学 ACM 协会</p>
        <div class="hero-typed">
          <TypedBanner />
        </div>
        <p class="hero-desc">算法竞赛 · 编程训练 · 技术交流 · 以赛促学</p>
      </div>
      <!-- 底部建筑剪影 SVG -->
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
      <div class="hero-scroll">
        <span class="hero-scroll-text">向下探索</span>
        <span class="hero-scroll-arrow">▾</span>
      </div>
    </section>

    <!-- 主内容区 -->
    <div class="main-body">
      <main class="content-area">
        <!-- 页面内容 -->
        <article class="content-card">
          <Content />
        </article>

        <!-- 评论区 -->
        <div class="content-card">
          <Giscus />
        </div>

        <!-- 页脚信息 -->
        <div class="content-card footer-card">
          <SiteRuntime />
          <span id="busuanzi_container_site_uv" style="display:none;margin-left:1rem">
            👀 访客 <span id="busuanzi_value_site_uv">0</span>
            · PV <span id="busuanzi_value_site_pv">0</span>
          </span>
          <div class="footer-copy">Copyright © 2026 XAUAT ACM</div>
        </div>
      </main>

      <!-- 右侧边栏 -->
      <RightSidebar />
    </div>

    <!-- 回到顶部 -->
    <FloatingPanel />
  </div>
</template>

<style scoped>
/* ===== 根容器 ===== */
.site-root {
  min-height: 100vh;
  background: #f6f8fa;
  font-family: Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  color: #4c4948;
  position: relative;
  overflow-x: hidden;
}

/* ===== 左侧几何装饰 ===== */
.geo-decor {
  position: fixed;
  left: 0;
  top: 0;
  width: 300px;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.geo-circle {
  position: absolute;
  left: -80px;
  top: 15%;
  width: 200px;
  height: 200px;
  border: 2px solid rgba(73, 177, 245, 0.08);
  border-radius: 50%;
}

.geo-triangle {
  position: absolute;
  left: 20px;
  bottom: 25%;
  width: 0;
  height: 0;
  border-left: 60px solid transparent;
  border-right: 60px solid transparent;
  border-bottom: 100px solid rgba(73, 177, 245, 0.04);
}

.geo-dot-grid {
  position: absolute;
  left: 40px;
  top: 45%;
  width: 80px;
  height: 80px;
  background-image: radial-gradient(circle, rgba(73, 177, 245, 0.12) 1px, transparent 1px);
  background-size: 12px 12px;
}

/* ===== 顶部导航 ===== */
.top-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
  border-bottom: 1px solid #e8e8ed;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

.top-nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  color: #333;
  font-weight: 700;
  font-size: 1.1rem;
}

.nav-logo-icon {
  background: #49b1f5;
  color: #fff;
  padding: 0.2rem 0.45rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 1px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-item {
  padding: 0.4rem 0.9rem;
  border-radius: 6px;
  text-decoration: none;
  color: #555;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.15s;
  cursor: pointer;
}

.nav-item:hover,
.nav-item.active {
  color: #49b1f5;
  background: rgba(73, 177, 245, 0.06);
}

.nav-icon-btn {
  padding: 0.4rem 0.5rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 6px;
  transition: background 0.15s;
}

.nav-icon-btn:hover {
  background: rgba(0,0,0,0.04);
}

/* 下拉菜单 */
.nav-dropdown {
  position: relative;
}

.nav-dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 180px;
  background: #fff;
  border: 1px solid #e8e8ed;
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  padding: 0.5rem 0;
  z-index: 200;
}

.nav-dropdown:hover .nav-dropdown-menu {
  display: block;
}

.nav-dropdown-item {
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #555;
  font-size: 0.88rem;
  transition: all 0.15s;
}

.nav-dropdown-item:hover {
  background: rgba(73, 177, 245, 0.06);
  color: #49b1f5;
}

.nav-dropdown-group-label {
  padding: 0.4rem 1rem 0.2rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-dropdown-sub {
  padding-left: 1.8rem;
  font-size: 0.84rem;
}

/* ===== Hero Banner — 校园风全屏 ===== */
.hero-banner {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    170deg,
    #0f2b4a 0%,
    #1a4a6f 15%,
    #2d6a9f 28%,
    #5b8cb8 40%,
    #c4a882 55%,
    #e8d5b7 68%,
    #f5e6d3 80%,
    #faf6f0 100%
  );
  overflow: hidden;
  text-align: center;
  color: #fff;
}

/* 浮动光斑 */
.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
  animation: orb-float 12s ease-in-out infinite;
}
.orb-1 {
  width: 300px; height: 300px;
  background: rgba(255, 200, 120, 0.25);
  right: -60px; top: 10%;
  animation-delay: 0s;
}
.orb-2 {
  width: 250px; height: 250px;
  background: rgba(180, 220, 255, 0.2);
  left: -40px; bottom: 25%;
  animation-delay: -4s;
}
.orb-3 {
  width: 200px; height: 200px;
  background: rgba(255, 255, 200, 0.18);
  left: 40%; top: 60%;
  animation-delay: -8s;
}

@keyframes orb-float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25%  { transform: translate(30px, -20px) scale(1.1); }
  50%  { transform: translate(-15px, 25px) scale(0.9); }
  75%  { transform: translate(-25px, -15px) scale(1.05); }
}

/* 网格纹理 */
.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 70%);
}

/* 主内容 */
.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  padding: 2rem 1rem;
}

/* Logo 光环 */
.hero-logo-ring {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  box-shadow: 0 0 40px rgba(255,255,255,0.2), inset 0 0 20px rgba(255,255,255,0.1);
  animation: logo-glow 3s ease-in-out infinite;
}

@keyframes logo-glow {
  0%, 100% { box-shadow: 0 0 40px rgba(255,255,255,0.2), inset 0 0 20px rgba(255,255,255,0.1); }
  50% { box-shadow: 0 0 60px rgba(255,255,255,0.35), inset 0 0 30px rgba(255,255,255,0.2); }
}

.hero-logo-img {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  letter-spacing: 6px;
  color: #fff;
  text-shadow: 0 2px 20px rgba(0,0,0,0.3);
  margin: 0;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  font-weight: 400;
  color: rgba(255,255,255,0.85);
  letter-spacing: 4px;
  margin: 0;
}

.hero-typed {
  margin-top: 0.5rem;
  font-size: clamp(0.95rem, 2vw, 1.2rem);
  color: rgba(255,255,255,0.9);
  font-weight: 500;
  min-height: 2rem;
}

.hero-desc {
  margin-top: 0.25rem;
  font-size: clamp(0.78rem, 1.5vw, 0.95rem);
  color: rgba(255,255,255,0.6);
  letter-spacing: 2px;
}

/* 建筑剪影 */
.hero-skyline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 1;
  pointer-events: none;
}
.hero-skyline rect,
.hero-skyline path {
  fill: #fff;
}

/* 滚动提示 */
.hero-scroll {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}

.hero-scroll-text {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.55);
  letter-spacing: 2px;
}

.hero-scroll-arrow {
  font-size: 1.4rem;
  color: rgba(255,255,255,0.7);
  animation: bounce-down 2s ease-in-out infinite;
}

@keyframes bounce-down {
  0%, 100% { transform: translateY(0); opacity: 0.6; }
  50% { transform: translateY(10px); opacity: 1; }
}

/* ===== 主内容区 ===== */
.main-body {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
}

.content-area {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* ===== 内容卡片 ===== */
.content-card {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem 2rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  border: 1px solid #eee;
}

/* ===== 页脚卡片 ===== */
.footer-card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.82rem;
  color: #999;
  padding: 1rem 2rem;
}

.footer-copy {
  width: 100%;
  text-align: center;
  font-size: 0.78rem;
}

/* ===== 暗色模式 ===== */
.site-root.dark {
  background: #1a1a2e;
  color: #ccc;
}

.dark .top-nav {
  background: #1e1e36;
  border-color: #2a2a45;
}

.dark .nav-logo { color: #eee; }
.dark .nav-item { color: #aaa; }
.dark .nav-item:hover,
.dark .nav-item.active { color: #60a5fa; background: rgba(96,165,250,0.1); }

.dark .nav-dropdown-menu {
  background: #1e1e36;
  border-color: #2a2a45;
}

.dark .nav-dropdown-item { color: #aaa; }
.dark .nav-dropdown-item:hover { background: rgba(96,165,250,0.1); color: #60a5fa; }
.dark .nav-dropdown-group-label { color: #666; }

.dark .content-card {
  background: #1e1e36;
  border-color: #2a2a45;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
}

.dark .nav-icon-btn:hover { background: rgba(255,255,255,0.06); }

/* ===== 响应式 ===== */
@media (max-width: 1024px) {
  .main-body { flex-direction: column; }
  .nav-links .nav-item { padding: 0.4rem 0.6rem; font-size: 0.82rem; }
}

@media (max-width: 768px) {
  .top-nav-inner { padding: 0 1rem; }
  .nav-links { gap: 0; }
  .nav-links .nav-item { padding: 0.3rem 0.5rem; font-size: 0.78rem; }
  .nav-logo-text { display: none; }
  .hero-banner { min-height: 100svh; }
  .hero-title { font-size: 2.2rem; letter-spacing: 3px; }
  .hero-subtitle { font-size: 0.9rem; }
  .hero-desc { font-size: 0.75rem; letter-spacing: 1px; }
  .hero-logo-ring { width: 70px; height: 70px; }
  .hero-logo-img { width: 46px; height: 46px; }
  .hero-skyline { display: none; }
  .hero-grid { background-size: 40px 40px; }
  .main-body { padding: 1rem; }
  .content-card { padding: 1rem 1.25rem; }
  .geo-decor { display: none; }
}
</style>

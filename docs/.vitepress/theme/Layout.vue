<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { computed } from 'vue'
import RightSidebar from './components/RightSidebar.vue'
import FloatingPanel from './components/FloatingPanel.vue'
import Giscus from './components/Giscus.vue'
import SiteRuntime from './components/SiteRuntime.vue'

const { site, theme, frontmatter, isDark } = useData()
const route = useRoute()

const isHome = computed(() => route.path === '/' || route.path === '/index.html')

const nav = computed(() => theme.value.nav || [])

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

    <!-- Hero Banner (仅首页) -->
    <section v-if="isHome" class="hero-banner">
      <div class="hero-banner-content">
        <h1 class="hero-banner-title">XAUAT ACM</h1>
        <p class="hero-banner-sub">西安建筑科技大学 ACM 协会</p>
        <p class="hero-banner-desc">算法竞赛 · 编程训练 · 技术交流 · 以赛促学</p>
      </div>
      <div class="hero-scroll-arrow">▾</div>
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

/* ===== Hero Banner ===== */
.hero-banner {
  background: linear-gradient(135deg, #1e3a5f 0%, #49b1f5 50%, #7c3aed 100%);
  padding: 4rem 1rem 2rem;
  text-align: center;
  color: #fff;
  position: relative;
}

.hero-banner-content {
  max-width: 600px;
  margin: 0 auto;
}

.hero-banner-title {
  font-size: 2.8rem;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
}

.hero-banner-sub {
  font-size: 1.15rem;
  opacity: 0.9;
  margin-bottom: 0.5rem;
}

.hero-banner-desc {
  font-size: 0.9rem;
  opacity: 0.7;
}

.hero-scroll-arrow {
  margin-top: 1.5rem;
  font-size: 1.5rem;
  opacity: 0.6;
  animation: bounce-down 2s infinite;
}

@keyframes bounce-down {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
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
  .hero-banner { padding: 3rem 1rem 1.5rem; }
  .hero-banner-title { font-size: 2rem; }
  .main-body { padding: 1rem; }
  .content-card { padding: 1rem 1.25rem; }
  .geo-decor { display: none; }
}
</style>

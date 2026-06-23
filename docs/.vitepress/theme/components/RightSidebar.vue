<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { usePosts } from '../composables/usePosts'

const posts = usePosts()

// 移动端侧边栏显示/隐藏
const showMobile = ref(false)
function toggleMobile() { showMobile.value = !showMobile.value }

const postCount = computed(() => posts.value.length)

const categoryCounts = computed(() => {
  const counts: Record<string, number> = {}
  for (const p of posts.value) {
    const cat = p.category || '未分类'
    counts[cat] = (counts[cat] || 0) + 1
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])
})

const tagCounts = computed(() => {
  const counts: Record<string, number> = {}
  for (const p of posts.value) {
    for (const t of p.tags || []) counts[t] = (counts[t] || 0) + 1
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])
})

const latestPosts = computed(() => posts.value.slice(0, 5))

const tagColors = ['#49b1f5','#7c3aed','#db2777','#ea580c','#16a34a','#0891b2','#ca8a04','#4f46e5','#be185d','#0284c7']
function tagColor(idx: number) { return tagColors[idx % tagColors.length] }
</script>

<template>
  <aside class="rs-root" :class="{ 'show-mobile': showMobile }">
    <!-- 1. 站点信息模块 -->
    <div class="rs-card">
      <div class="rs-avatar"><img src="/favicon.png" alt="ACM" /></div>
      <div class="rs-site-name">XAUAT ACM</div>
      <div class="rs-tagline">西安建筑科技大学 ACM 协会</div>
      <div class="rs-stats-row">
        <a :href="withBase('/archives')" class="rs-stat">
          <span class="rs-stat-num">{{ postCount }}</span>
          <span class="rs-stat-lbl">文章</span>
        </a>
        <a :href="withBase('/tags')" class="rs-stat">
          <span class="rs-stat-num">{{ categoryCounts.length }}</span>
          <span class="rs-stat-lbl">分类</span>
        </a>
        <a :href="withBase('/tags')" class="rs-stat">
          <span class="rs-stat-num">{{ tagCounts.length }}</span>
          <span class="rs-stat-lbl">标签</span>
        </a>
      </div>
      <div class="rs-socials">
        <!-- QQ 企鹅图标 (Simple Icons: tencentqq) -->
        <a class="rs-social-link" href="https://qm.qq.com/q/xiUbXv19HE" target="_blank" title="加入 QQ 群">
          <svg class="rs-social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M21.395 15.035a40 40 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 17.351 0 12 0S4.474 4.632 4.474 9.241c0 .274.013.804.014.836l-1.08 2.695a39 39 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 2.103-2.472 2.103-2.472 0 1.469.756 3.387 2.394 4.771-.612.188-1.363.479-1.845.835-.434.32-.379.646-.301.778.343.578 5.883.369 7.482.189 1.6.18 7.14.389 7.483-.189.078-.132.132-.458-.301-.778-.483-.356-1.233-.646-1.846-.836 1.637-1.384 2.393-3.302 2.393-4.771 0 0 1.563 2.537 2.103 2.472.251-.03.581-1.39-.438-4.673"/></svg>
        </a>
        <!-- 哔哩哔哩图标 -->
        <a class="rs-social-link" href="#" target="_blank" title="哔哩哔哩">
          <svg class="rs-social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M18.223 3.086a1.25 1.25 0 0 1 0 1.768L17.08 5.996h1.17A3.75 3.75 0 0 1 22 9.747v7.5a3.75 3.75 0 0 1-3.75 3.75H5.75A3.75 3.75 0 0 1 2 17.247v-7.5a3.75 3.75 0 0 1 3.75-3.75h1.166L5.775 4.855a1.25 1.25 0 1 1 1.767-1.768l2.652 2.652c.079.079.145.165.198.257h3.213c.053-.092.12-.178.198-.257l2.652-2.653a1.25 1.25 0 0 1 1.768 0zM7.25 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm9.5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/></svg>
        </a>
      </div>
    </div>

    <!-- 2. 公告模块 -->
    <div class="rs-card">
      <div class="rs-card-head">📢 公告</div>
      <div class="rs-announce">
        <p>欢迎加入 XAUAT ACM 协会！2026 秋季纳新即将开始，敬请期待～</p>
        <p v-if="latestPosts.length > 0" style="margin-top:0.3rem;font-size:0.8rem;color:var(--vp-c-text-3)">
          📝 最新文章：<a :href="withBase(latestPosts[0].url)" style="color:var(--vp-c-brand)">{{ latestPosts[0].title }}</a>
        </p>
      </div>
    </div>

    <!-- 3. 最新内容列表 -->
    <div class="rs-card">
      <div class="rs-card-head">📝 最新内容</div>
      <div class="rs-post-list">
        <a v-for="(p, i) in latestPosts" :key="p.url" :href="withBase(p.url)" class="rs-post-item">
          <span class="rs-post-num">{{ i + 1 }}</span>
          <span class="rs-post-title">{{ p.title }}</span>
          <span class="rs-post-date">{{ p.date }}</span>
        </a>
        <div v-if="latestPosts.length === 0" class="rs-empty">暂无内容</div>
      </div>
    </div>

    <!-- 4. 分类目录 -->
    <div class="rs-card">
      <div class="rs-card-head">📂 分类目录</div>
      <div class="rs-cat-list">
        <a v-for="[cat, cnt] in categoryCounts" :key="cat" :href="withBase(`/tags?tag=${encodeURIComponent(cat)}`)" class="rs-cat-item">
          <span class="rs-cat-name">{{ cat }}</span>
          <span class="rs-cat-count">{{ cnt }}</span>
        </a>
        <div v-if="categoryCounts.length === 0" class="rs-empty">暂无分类</div>
      </div>
    </div>

    <!-- 5. 标签云 -->
    <div class="rs-card">
      <div class="rs-card-head">🏷️ 标签云</div>
      <div class="rs-tags-cloud">
        <a
          v-for="([tag, cnt], idx) in tagCounts"
          :key="tag"
          :href="withBase(`/tags?tag=${encodeURIComponent(tag)}`)"
          class="rs-tag"
          :style="{ background: tagColor(idx) + '18', color: tagColor(idx), borderColor: tagColor(idx) + '30' }"
        >
          {{ tag }} <sup>{{ cnt }}</sup>
        </a>
        <div v-if="tagCounts.length === 0" class="rs-empty">暂无标签</div>
      </div>
    </div>
  </aside>

  <!-- 移动端浮动切换按钮（< 768px 可见） -->
  <button
    class="rs-mobile-toggle"
    :class="{ active: showMobile }"
    @click="toggleMobile"
    aria-label="切换侧边栏"
  >
    <span class="rs-toggle-icon">{{ showMobile ? '✕' : '📋' }}</span>
  </button>
</template>

<style scoped>
.rs-root {
  /* 修复问题2：不设固定宽度，由父容器 .aside 控制，避免布局崩塌 */
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.rs-card {
  background: #fefdfb;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
  border: 1px solid #e8e4dc;
  transition: border-color 0.3s;
}

.rs-card:first-child {
  border-top: 3px solid var(--acm-orange, #ff6b35);
}

.rs-card-head {
  font-weight: 700;
  font-size: 0.9rem;
  color: #3d3a37;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e8e4dc;
}

/* 站点信息 */
.rs-avatar {
  width: 67px; height: 67px;
  border-radius: 12px;
  overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 0.75rem;
}

.rs-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.rs-site-name {
  text-align: center;
  font-weight: 700;
  font-size: 1.15rem;
  color: #3d3a37;
}

.rs-tagline {
  text-align: center;
  font-size: 0.8rem;
  color: #7a7670;
  margin-top: 0.25rem;
}

.rs-stats-row {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.rs-stat {
  flex: 1; text-align: center; text-decoration: none;
  padding: 0.4rem 0.25rem; border-radius: 8px;
  transition: background 0.15s;
}
.rs-stat:hover { background: rgba(255, 107, 53, 0.05); }

.rs-stat-num {
  display: block;
  font-size: 1.3rem; font-weight: 800;
  color: var(--acm-orange, #ff6b35);
}

.rs-stat-lbl {
  font-size: 0.72rem; color: #7a7670;
}

/* 社交链接 */
.rs-socials {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #e8e4dc;
  display: flex;
  gap: 0.5rem;
}

.rs-social-link {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem 0.6rem;
  border-radius: 8px;
  text-decoration: none;
  background: #f8f7f4;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.rs-social-link:hover {
  background: rgba(255, 107, 53, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.12);
}

.rs-social-link:hover .rs-social-icon {
  animation: icon-pop 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.rs-social-icon {
  width: 22px;
  height: 22px;
  color: var(--acm-orange, #ff6b35);
  transition: transform 0.3s ease;
}

@keyframes icon-pop {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.2); }
  100% { transform: scale(1); }
}


/* 公告 */
.rs-announce {
  font-size: 0.84rem; color: #666; line-height: 1.6;
}

/* 最新内容 */
.rs-post-list {
  display: flex; flex-direction: column; gap: 0.3rem;
}

.rs-post-item {
  display: flex; align-items: center; gap: 0.5rem;
  text-decoration: none; padding: 0.35rem 0.4rem; border-radius: 6px;
  transition: background 0.15s;
}
.rs-post-item:hover { background: rgba(255, 107, 53, 0.04); }

.rs-post-num {
  width: 20px; text-align: center;
  font-size: 0.75rem; font-weight: 700; color: #b5b0a8;
}

.rs-post-title {
  flex: 1; font-size: 0.84rem; color: #4d4a45;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

.rs-post-date {
  font-size: 0.72rem; color: #9a9690; white-space: nowrap;
}

/* 分类 */
.rs-cat-list {
  display: flex; flex-direction: column; gap: 0.25rem;
}

.rs-cat-item {
  display: flex; justify-content: space-between; align-items: center;
  text-decoration: none; padding: 0.35rem 0.4rem; border-radius: 6px;
  font-size: 0.84rem; color: #5d5a55; transition: background 0.15s;
}
.rs-cat-item:hover { background: rgba(255, 107, 53, 0.04); }

.rs-cat-count {
  font-size: 0.72rem; color: #9a9690;
  background: #f2f0ec; padding: 0.1rem 0.4rem; border-radius: 8px;
}

/* 标签云 */
.rs-tags-cloud {
  display: flex; flex-wrap: wrap; gap: 0.4rem;
}

.rs-tag {
  display: inline-flex; align-items: center; gap: 0.15rem;
  padding: 0.25rem 0.6rem; border-radius: 12px;
  font-size: 0.78rem; text-decoration: none;
  border: 1px solid;
  transition: transform 0.15s;
}
.rs-tag:hover { transform: scale(1.05); }
.rs-tag sup { font-size: 0.65rem; opacity: 0.7; }

.rs-empty {
  text-align: center; padding: 0.5rem 0;
  font-size: 0.82rem; color: #b5b0a8;
}

/* 暗色模式适配 */
html.dark .rs-card { background: #16162a; border-color: #252540; }
html.dark .rs-card:first-child { border-top-color: #ff9a60; }
html.dark .rs-card-head { color: #ccc; border-color: #252540; }
html.dark .rs-site-name { color: #eee; }
html.dark .rs-tagline { color: #888; }
html.dark .rs-stat-lbl { color: #888; }
html.dark .rs-post-title { color: #bbb; }
html.dark .rs-post-date { color: #666; }
html.dark .rs-cat-item { color: #aaa; }
html.dark .rs-cat-count { background: #252540; color: #666; }
html.dark .rs-announce { color: #aaa; }
html.dark .rs-post-num { color: #555; }
html.dark .rs-stat:hover { background: rgba(255, 140, 80, 0.06); }
html.dark .rs-cat-item:hover { background: rgba(255, 140, 80, 0.06); }
html.dark .rs-post-item:hover { background: rgba(255, 140, 80, 0.06); }
html.dark .rs-empty { color: #555; }
html.dark .rs-socials { border-top-color: #252540; }
html.dark .rs-social-link { background: #16162a; }
html.dark .rs-social-link:hover { background: rgba(255, 140, 80, 0.08); }
html.dark .rs-social-icon { color: #ff9a60; }
html.dark .rs-social-text { color: #ff9a60; }

/* ===== 平板端 (768-1024px)：横向滚动 ===== */
@media (max-width: 1024px) and (min-width: 769px) {
  .rs-root {
    display: flex;
    flex-direction: row;
    gap: 0.6rem;
    overflow-x: auto;
    scroll-snap-type: x proximity;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 0.5rem;
  }

  .rs-card {
    flex: 0 0 280px;
    scroll-snap-align: start;
  }

  .rs-card:first-child {
    border-top: none;
    border-left: 3px solid var(--acm-orange, #ff6b35);
  }
}

/* ===== 手机端 (< 768px)：折叠面板 + 浮动按钮 ===== */
@media (max-width: 768px) {
  .rs-root {
    display: none;
    position: fixed;
    inset: 0;
    top: 56px;
    z-index: 500;
    background: #f8f7f4;
    overflow-y: auto;
    padding: 1rem;
    flex-direction: column;
    gap: 0.5rem;
  }

  .rs-root.show-mobile {
    display: flex;
  }

  .rs-card {
    max-width: 100%;
  }

  .rs-mobile-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    right: 1rem;
    bottom: 5rem;
    z-index: 501;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid var(--acm-orange, #ff6b35);
    background: #fefdfb;
    color: var(--acm-orange, #ff6b35);
    font-size: 1.2rem;
    cursor: pointer;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .rs-mobile-toggle:active {
    transform: scale(0.92);
  }

  .rs-mobile-toggle.active {
    background: var(--acm-orange, #ff6b35);
    color: #fff;
  }

  /* 暗色 */
  html.dark .rs-root.show-mobile {
    background: #0f0f1a;
  }

  html.dark .rs-mobile-toggle {
    background: #16162a;
    border-color: #ff9a60;
    color: #ff9a60;
  }

  html.dark .rs-mobile-toggle.active {
    background: #ff6b35;
    color: #fff;
  }
}

/* 桌面端隐藏按钮 */
@media (min-width: 769px) {
  .rs-mobile-toggle { display: none; }
}
</style>

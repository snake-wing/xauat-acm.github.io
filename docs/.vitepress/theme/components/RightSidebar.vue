<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { usePosts } from '../composables/usePosts'

const posts = usePosts()

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
  <aside class="rs-root">
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
        <a class="rs-social-link rs-social-qq" href="https://qm.qq.com/q/1002960176" target="_blank" title="QQ 群：1002960176">
          <svg class="rs-social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm3.5 13.5c-.3 0-.6-.1-.8-.3l-2.7-2-2.7 2c-.2.2-.5.3-.8.3-.3 0-.6-.1-.8-.3-.4-.4-.4-1 0-1.4l3.5-2.5L7.7 9.8c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0L12 11l2.9-2.6c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-3.5 2.5 3.5 2.5c.4.4.4 1 0 1.4-.2.2-.5.3-.8.3z"/></svg>
          <span class="rs-social-text">1002960176</span>
        </a>
        <a class="rs-social-link rs-social-bili" href="#" target="_blank" title="哔哩哔哩">
          <svg class="rs-social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M17.8 4.5c1.1 0 2 .9 2 2v11c0 1.1-.9 2-2 2H6.2c-1.1 0-2-.9-2-2v-11c0-1.1.9-2 2-2h2.4l1.1-1.8c.2-.3.5-.4.9-.4.3 0 .7.1.9.4l1.1 1.8h2.4zm-5.8 4c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 2c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zm-5.2-1.5c-.4 0-.8.3-.8.8v4c0 .4.3.8.8.8.4 0 .8-.3.8-.8v-4c0-.4-.3-.8-.8-.8zm10.4 0c-.4 0-.8.3-.8.8v4c0 .4.3.8.8.8.4 0 .8-.3.8-.8v-4c0-.4-.3-.8-.8-.8z"/></svg>
          <span class="rs-social-text">哔哩哔哩</span>
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
</template>

<style scoped>
.rs-root {
  /* 修复问题2：不设固定宽度，由父容器 .aside 控制，避免布局崩塌 */
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.rs-card {
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  border: 1px solid #eee;
}

.rs-card-head {
  font-weight: 700;
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #f0f0f0;
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
  color: #333;
}

.rs-tagline {
  text-align: center;
  font-size: 0.8rem;
  color: #999;
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
.rs-stat:hover { background: rgba(73,177,245,0.05); }

.rs-stat-num {
  display: block;
  font-size: 1.3rem; font-weight: 800;
  color: #49b1f5;
}

.rs-stat-lbl {
  font-size: 0.72rem; color: #999;
}

/* 社交链接 */
.rs-socials {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #f0f0f0;
  display: flex;
  gap: 0.5rem;
}

.rs-social-link {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.45rem 0.6rem;
  border-radius: 8px;
  text-decoration: none;
  background: #fff;
  border: 1px solid #eee;
  transition: all 0.2s;
}

.rs-social-link:hover {
  background: #f8fafd;
  border-color: #49b1f5;
  transform: translateY(-1px);
}

.rs-social-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: #49b1f5;
}

.rs-social-text {
  font-size: 0.78rem;
  color: #49b1f5;
  font-weight: 500;
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
.rs-post-item:hover { background: rgba(73,177,245,0.04); }

.rs-post-num {
  width: 20px; text-align: center;
  font-size: 0.75rem; font-weight: 700; color: #ccc;
}

.rs-post-title {
  flex: 1; font-size: 0.84rem; color: #444;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

.rs-post-date {
  font-size: 0.72rem; color: #bbb; white-space: nowrap;
}

/* 分类 */
.rs-cat-list {
  display: flex; flex-direction: column; gap: 0.25rem;
}

.rs-cat-item {
  display: flex; justify-content: space-between; align-items: center;
  text-decoration: none; padding: 0.35rem 0.4rem; border-radius: 6px;
  font-size: 0.84rem; color: #555; transition: background 0.15s;
}
.rs-cat-item:hover { background: rgba(73,177,245,0.04); }

.rs-cat-count {
  font-size: 0.72rem; color: #bbb;
  background: #f5f6f8; padding: 0.1rem 0.4rem; border-radius: 8px;
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
  font-size: 0.82rem; color: #ccc;
}

/* 暗色模式适配 */
html.dark .rs-card { background: #1e1e36; border-color: #2a2a45; }
html.dark .rs-card-head { color: #ccc; border-color: #2a2a45; }
html.dark .rs-site-name { color: #eee; }
html.dark .rs-tagline { color: #888; }
html.dark .rs-stat-lbl { color: #888; }
html.dark .rs-post-title { color: #bbb; }
html.dark .rs-post-date { color: #666; }
html.dark .rs-cat-item { color: #aaa; }
html.dark .rs-cat-count { background: #2a2a45; color: #666; }
html.dark .rs-announce { color: #aaa; }
html.dark .rs-post-num { color: #555; }
html.dark .rs-stat:hover { background: rgba(96,165,250,0.06); }
html.dark .rs-cat-item:hover { background: rgba(96,165,250,0.06); }
html.dark .rs-post-item:hover { background: rgba(96,165,250,0.06); }
html.dark .rs-empty { color: #555; }
html.dark .rs-socials { border-top-color: #2a2a45; }
html.dark .rs-social-link { background: #1e1e36; border-color: #2a2a45; }
html.dark .rs-social-link:hover { background: #252545; border-color: #60a5fa; }
html.dark .rs-social-icon { color: #60a5fa; }
html.dark .rs-social-text { color: #60a5fa; }

@media (max-width: 1024px) {
  .rs-root { display: none; }
}
</style>

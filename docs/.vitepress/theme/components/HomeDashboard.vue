<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps<{ posts: any[] }>()

interface Contest {
  id: string; name: string; platform: string; platformColor: string
  startTimeSeconds: number; durationSeconds: number; url: string
  stars: number; starLabel: string; starColor: string
}

const contests = ref<Contest[]>([])

const upcoming = computed(() =>
  contests.value
    .filter(c => c.startTimeSeconds > Date.now() / 1000)
    .slice(0, 6)
)

const latestPosts = computed(() => props.posts.slice(0, 4))

async function loadContests() {
  try {
    const res = await fetch(withBase('/contests.json'))
    if (!res.ok) return
    const data = await res.json()
    contests.value = data.contests || []
  } catch { /* offline */ }
}

function fmtDate(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString('zh-CN', {
    month: 'short', day: 'numeric',
  }) + ' ' + new Date(ts * 1000).toLocaleTimeString('zh-CN', {
    hour: '2-digit', minute: '2-digit',
  })
}

function durationStr(s: number): string {
  if (!s || s <= 0) return ''
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  return h > 0 ? `${h}h${m > 0 ? ` ${m}m` : ''}` : `${m}m`
}

function daysUntil(startS: number): string {
  const diff = startS - Math.floor(Date.now() / 1000)
  if (diff <= 0) return '进行中'
  const d = Math.floor(diff / 86400)
  const h = Math.floor((diff % 86400) / 3600)
  const m = Math.floor((diff % 3600) / 60)
  if (d > 0) return `${d} 天后`
  if (h > 0) return `${h} 小时后`
  return `${m} 分钟后`
}

onMounted(() => { loadContests() })
</script>

<template>
  <div class="db-root">
    <!-- ================================================
    Stats — compact one-liner
    ================================================= -->
    <p class="db-stats">
      <span>在训队员 <strong>165</strong></span>
      <span class="db-stat-sep">·</span>
      <span>获奖荣誉 <strong>47</strong></span>
      <span class="db-stat-sep">·</span>
      <span>近期比赛 <strong>{{ contests.filter(c => c.startTimeSeconds > Date.now()/1000).length }}</strong></span>
      <span class="db-stat-sep">·</span>
      <span>博客 <strong>{{ props.posts.length }}</strong></span>
    </p>

    <hr class="db-hr">

    <!-- ================================================
    Upcoming contests — simple list, no cards
    ================================================= -->
    <div class="db-block">
      <div class="db-head">
        <span class="db-head-title">近期比赛</span>
        <a :href="withBase('/training')" class="db-head-link">查看全部</a>
      </div>

      <div v-if="upcoming.length > 0" class="db-contest-list">
        <a
          v-for="c in upcoming"
          :key="c.id"
          :href="c.url"
          target="_blank"
          class="db-contest-row"
        >
          <span class="db-cr-platform" :style="{ color: c.platformColor }">
            ● {{ c.platform }}
          </span>
          <span class="db-cr-name">{{ c.name }}</span>
          <span class="db-cr-meta">
            {{ fmtDate(c.startTimeSeconds) }}
            <span v-if="durationStr(c.durationSeconds)"> · {{ durationStr(c.durationSeconds) }}</span>
          </span>
          <span class="db-cr-stars" :style="{ color: c.starColor }">
            {{ '★'.repeat(c.stars) }}
          </span>
          <span class="db-cr-countdown">{{ daysUntil(c.startTimeSeconds) }}</span>
        </a>
      </div>

      <p v-else class="db-empty">暂无近期比赛，请前往<a :href="withBase('/training')">训练平台</a>查看各 OJ 赛程</p>
    </div>

    <hr class="db-hr">

    <!-- ================================================
    Latest posts — text-focused, no card grid
    ================================================= -->
    <div class="db-block">
      <div class="db-head">
        <span class="db-head-title">最新博客</span>
        <a :href="withBase('/archives')" class="db-head-link">全部文章</a>
      </div>

      <div v-if="latestPosts.length > 0" class="db-post-list">
        <a
          v-for="p in latestPosts"
          :key="p.url"
          :href="withBase(p.url)"
          class="db-post-row"
        >
          <span class="db-pr-date">{{ p.date }}</span>
          <span class="db-pr-title">{{ p.title }}</span>
          <span class="db-pr-cat">{{ p.category }}</span>
        </a>
      </div>

      <p v-else class="db-empty">还没有文章，开始写第一篇吧</p>
    </div>

    <hr class="db-hr">

    <!-- ================================================
    Quick links — inline text
    ================================================= -->
    <p class="db-links">
      <a :href="withBase('/training')">训练平台</a>
      <a :href="withBase('/join')">加入我们</a>
      <a :href="withBase('/about/guide')">入门指南</a>
      <a :href="withBase('/award')">获奖荣誉</a>
      <a :href="withBase('/team')">团队成员</a>
    </p>
  </div>
</template>

<style scoped>
/* ============================================================
   Root — intentionally plain
   ============================================================ */
.db-root {
  line-height: 1.6;
}

/* ============================================================
   Stats — single line, dot-separated
   ============================================================ */
.db-stats {
  margin: 0 0 0.5rem;
  font-size: 0.85rem;
  color: #777;
  text-align: center;
}
.db-stats strong {
  color: #333;
  font-weight: 700;
}
.db-stat-sep {
  margin: 0 0.35rem;
  color: #ddd;
}

/* ============================================================
   Divider
   ============================================================ */
.db-hr {
  margin: 0.75rem 0;
  border: none;
  border-top: 1px solid #e8e8ed;
}

/* ============================================================
   Block header
   ============================================================ */
.db-block {
  margin-bottom: 0.25rem;
}

.db-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.db-head-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #333;
}

.db-head-link {
  font-size: 0.78rem;
  color: #49b1f5;
  text-decoration: none;
}
.db-head-link:hover {
  text-decoration: underline;
}

/* ============================================================
   Contest rows — text, not cards
   ============================================================ */
.db-contest-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.db-contest-row {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  padding: 0.45rem 0;
  text-decoration: none;
  border-bottom: 1px solid #f5f5f5;
  transition: background 0.15s;
}
.db-contest-row:hover {
  background: rgba(73,177,245,0.02);
}
.db-contest-row:last-child {
  border-bottom: none;
}

.db-cr-platform {
  font-size: 0.72rem;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: 80px;
}

.db-cr-name {
  flex: 1;
  min-width: 0;
  font-size: 0.85rem;
  color: #4c4948;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.db-contest-row:hover .db-cr-name {
  color: #49b1f5;
}

.db-cr-meta {
  font-size: 0.74rem;
  color: #999;
  white-space: nowrap;
  flex-shrink: 0;
}

.db-cr-stars {
  font-size: 0.68rem;
  letter-spacing: 0.04em;
  flex-shrink: 0;
}

.db-cr-countdown {
  font-size: 0.74rem;
  color: #999;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: 60px;
  text-align: right;
}

/* ============================================================
   Post rows
   ============================================================ */
.db-post-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.db-post-row {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  padding: 0.4rem 0;
  text-decoration: none;
  border-bottom: 1px solid #f5f5f5;
  transition: background 0.15s;
}
.db-post-row:hover {
  background: rgba(73,177,245,0.02);
}
.db-post-row:last-child {
  border-bottom: none;
}

.db-pr-date {
  font-size: 0.74rem;
  color: #bbb;
  white-space: nowrap;
  flex-shrink: 0;
}

.db-pr-title {
  flex: 1;
  min-width: 0;
  font-size: 0.85rem;
  color: #4c4948;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.db-post-row:hover .db-pr-title {
  color: #49b1f5;
}

.db-pr-cat {
  font-size: 0.72rem;
  color: #49b1f5;
  background: rgba(73,177,245,0.06);
  padding: 0.05rem 0.45rem;
  border-radius: 6px;
  white-space: nowrap;
  flex-shrink: 0;
}

/* ============================================================
   Quick links — inline text
   ============================================================ */
.db-links {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  margin: 0.25rem 0 0;
  font-size: 0.84rem;
}

.db-links a {
  color: #666;
  text-decoration: none;
  transition: color 0.2s;
}
.db-links a:hover {
  color: #49b1f5;
}

/* ============================================================
   Empty
   ============================================================ */
.db-empty {
  font-size: 0.84rem;
  color: #bbb;
  padding: 0.5rem 0;
  margin: 0;
}
.db-empty a {
  color: #49b1f5;
  text-decoration: none;
}
.db-empty a:hover {
  text-decoration: underline;
}

/* ============================================================
   Dark mode
   ============================================================ */
html.dark .db-stats         { color: #777; }
html.dark .db-stats strong  { color: #eee; }
html.dark .db-stat-sep      { color: #444; }
html.dark .db-hr            { border-color: #252540; }

html.dark .db-head-title    { color: #eee; }

html.dark .db-contest-row   { border-color: #222238; }
html.dark .db-contest-row:hover { background: rgba(96,165,250,0.03); }
html.dark .db-cr-name       { color: #ccc; }
html.dark .db-cr-meta       { color: #777; }
html.dark .db-cr-countdown  { color: #888; }

html.dark .db-post-row      { border-color: #222238; }
html.dark .db-post-row:hover { background: rgba(96,165,250,0.03); }
html.dark .db-pr-title      { color: #ccc; }
html.dark .db-pr-date       { color: #666; }

html.dark .db-links a       { color: #888; }
html.dark .db-links a:hover { color: #6ec1f7; }

html.dark .db-empty         { color: #555; }

/* ============================================================
   Responsive
   ============================================================ */
@media (max-width: 768px) {
  .db-contest-row {
    flex-wrap: wrap;
    gap: 0.3rem 0.5rem;
    padding: 0.5rem 0;
  }
  .db-cr-platform  { min-width: 0; }
  .db-cr-name      { flex: 1 1 100%; white-space: normal; order: 1; }
  .db-cr-countdown { min-width: 0; }

  .db-post-row {
    flex-wrap: wrap;
    gap: 0.2rem 0.5rem;
  }
  .db-pr-title { flex: 1 1 100%; white-space: normal; }

  .db-links {
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    justify-content: flex-start;
  }
}
</style>

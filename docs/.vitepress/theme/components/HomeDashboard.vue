<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps<{ posts: any[] }>()

/* ================================================================
 * Types
 * ================================================================ */

interface Contest {
  id: string; name: string; platform: string; platformColor: string
  startTimeSeconds: number; durationSeconds: number; url: string
  stars: number; starLabel: string; starColor: string
}

interface ContestsData {
  updatedAt: number; contests: Contest[]
}

/* ================================================================
 * State
 * ================================================================ */

const contests = ref<Contest[]>([])
const now = ref(Math.floor(Date.now() / 1000))
let timer: ReturnType<typeof setInterval> | null = null

const upcoming = computed(() =>
  contests.value.filter(c => c.startTimeSeconds > now.value).slice(0, 6)
)

const heroContest = computed(() => upcoming.value[0] || null)
const nextContests = computed(() => upcoming.value.slice(1, 4))

/* ================================================================
 * Data loading
 * ================================================================ */

async function loadContests() {
  try {
    const res = await fetch(withBase('/contests.json'))
    if (!res.ok) return
    const data: ContestsData = await res.json()
    contests.value = data.contests || []
  } catch { /* offline / dev */ }
}

/* ================================================================
 * Stats
 * ================================================================ */

const stats = computed(() => [
  { value: props.posts.length, label: '技术博客', icon: '📝' },
  { value: contests.value.filter(c => c.startTimeSeconds > now.value).length, label: '近期比赛', icon: '📡' },
  { value: 47, label: '获奖荣誉', icon: '🏆' },
  { value: 165, label: '在训队员', icon: '👥' },
])

/* ================================================================
 * Countdown helpers (second precision for hero)
 * ================================================================ */

interface CountdownParts { d: number; h: number; m: number; s: number; total: number }

function countdownParts(startS: number): CountdownParts {
  const diff = Math.max(0, startS - now.value)
  return {
    d: Math.floor(diff / 86400),
    h: Math.floor((diff % 86400) / 3600),
    m: Math.floor((diff % 3600) / 60),
    s: diff % 60,
    total: diff,
  }
}

function isSoon(startS: number): boolean {
  const diff = startS - now.value
  return diff > 0 && diff < 86400
}

function isLive(startS: number, dur: number): boolean {
  return now.value >= startS && now.value < startS + dur
}

function compactCountdown(startS: number): string {
  const diff = startS - now.value
  if (diff <= 0) return '进行中'
  const d = Math.floor(diff / 86400)
  const h = Math.floor((diff % 86400) / 3600)
  const m = Math.floor((diff % 3600) / 60)
  if (d > 0) return `${d}天${h}小时`
  if (h > 0) return `${h}小时${m}分钟`
  return `${m}分钟后`
}

function fmtDate(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString('zh-CN', {
    month: 'short', day: 'numeric',
  }) + ' ' + new Date(ts * 1000).toLocaleTimeString('zh-CN', {
    hour: '2-digit', minute: '2-digit',
  })
}

function durationStr(s: number): string {
  if (!s || s <= 0) return '—'
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  return h > 0 ? (m > 0 ? `${h}h ${m}m` : `${h}h`) : `${m}m`
}

/* ================================================================
 * Latest posts (capped at 4)
 * ================================================================ */

const latestPosts = computed(() => props.posts.slice(0, 4))

/* ================================================================
 * Lifecycle
 * ================================================================ */

onMounted(() => {
  loadContests()
  timer = setInterval(() => { now.value = Math.floor(Date.now() / 1000) }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="dash-root">
    <!-- ═══════════════════════════════════════════ -->
    <!-- Stats bar -->
    <!-- ═══════════════════════════════════════════ -->
    <div class="dash-stats">
      <div v-for="s in stats" :key="s.label" class="dash-stat">
        <span class="ds-icon">{{ s.icon }}</span>
        <span class="ds-value">{{ s.value }}</span>
        <span class="ds-label">{{ s.label }}</span>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════ -->
    <!-- Hero: next contest -->
    <!-- ═══════════════════════════════════════════ -->
    <div v-if="heroContest" class="dash-hero">
      <div class="dh-badge-row">
        <span class="dh-platform" :style="{ background: heroContest.platformColor }">
          {{ heroContest.platform }}
        </span>
        <span v-if="isLive(heroContest.startTimeSeconds, heroContest.durationSeconds)" class="dh-live-dot">● 进行中</span>
        <span v-else-if="isSoon(heroContest.startTimeSeconds)" class="dh-soon-dot">● 即将开始</span>
        <span class="dh-date">{{ fmtDate(heroContest.startTimeSeconds) }}</span>
      </div>

      <a :href="heroContest.url" target="_blank" class="dh-name">
        {{ heroContest.name }}
      </a>

      <div class="dh-meta">
        <span class="dh-stars" :style="{ color: heroContest.starColor }">
          {{ '★'.repeat(heroContest.stars) }}{{ '☆'.repeat(6 - heroContest.stars) }}
        </span>
        <span v-if="heroContest.starLabel" class="dh-star-label" :style="{ background: heroContest.starColor }">
          {{ heroContest.starLabel }}
        </span>
        <span class="dh-dur">🕐 {{ durationStr(heroContest.durationSeconds) }}</span>
      </div>

      <!-- Countdown -->
      <div v-if="!isLive(heroContest.startTimeSeconds, heroContest.durationSeconds)" class="dh-countdown">
        <div class="dhc-block">
          <span class="dhc-num">{{ String(countdownParts(heroContest.startTimeSeconds).d).padStart(2, '0') }}</span>
          <span class="dhc-unit">天</span>
        </div>
        <span class="dhc-sep">:</span>
        <div class="dhc-block">
          <span class="dhc-num">{{ String(countdownParts(heroContest.startTimeSeconds).h).padStart(2, '0') }}</span>
          <span class="dhc-unit">时</span>
        </div>
        <span class="dhc-sep">:</span>
        <div class="dhc-block">
          <span class="dhc-num">{{ String(countdownParts(heroContest.startTimeSeconds).m).padStart(2, '0') }}</span>
          <span class="dhc-unit">分</span>
        </div>
        <span class="dhc-sep">:</span>
        <div class="dhc-block">
          <span class="dhc-num dhc-sec">{{ String(countdownParts(heroContest.startTimeSeconds).s).padStart(2, '0') }}</span>
          <span class="dhc-unit">秒</span>
        </div>
      </div>

      <a v-if="!isLive(heroContest.startTimeSeconds, heroContest.durationSeconds)" :href="heroContest.url" target="_blank" class="dh-cta">
        参加比赛
        <span class="dh-cta-arrow">→</span>
      </a>
    </div>

    <!-- No contests fallback -->
    <div v-else class="dash-hero dash-hero-empty">
      <span class="dh-empty-icon">📭</span>
      <p>暂无近期比赛数据</p>
      <a :href="withBase('/training')" class="dh-cta">前往训练平台 →</a>
    </div>

    <!-- ═══════════════════════════════════════════ -->
    <!-- Upcoming contests row -->
    <!-- ═══════════════════════════════════════════ -->
    <div v-if="nextContests.length > 0" class="dash-section">
      <div class="dash-sec-head">
        <span class="dsh-title">近期比赛</span>
        <a :href="withBase('/training')" class="dsh-more">查看全部 →</a>
      </div>
      <div class="dash-contest-row">
        <a
          v-for="c in nextContests"
          :key="c.id"
          :href="c.url"
          target="_blank"
          class="dcr-card"
          :style="{ borderTopColor: c.platformColor }"
        >
          <div class="dcr-platform" :style="{ background: c.platformColor }">
            {{ c.platform }}
          </div>
          <div class="dcr-name">{{ c.name }}</div>
          <div class="dcr-stars" :style="{ color: c.starColor }">
            {{ '★'.repeat(c.stars) }}{{ '☆'.repeat(6 - c.stars) }}
          </div>
          <div class="dcr-countdown">{{ compactCountdown(c.startTimeSeconds) }}</div>
        </a>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════ -->
    <!-- Latest posts -->
    <!-- ═══════════════════════════════════════════ -->
    <div v-if="latestPosts.length > 0" class="dash-section">
      <div class="dash-sec-head">
        <span class="dsh-title">最新博客</span>
        <a :href="withBase('/archives')" class="dsh-more">全部文章 →</a>
      </div>
      <div class="dash-post-grid">
        <a
          v-for="p in latestPosts"
          :key="p.url"
          :href="withBase(p.url)"
          class="dpg-card"
        >
          <span class="dpg-cat">{{ p.category }}</span>
          <span class="dpg-title">{{ p.title }}</span>
          <span class="dpg-date">{{ p.date }}</span>
        </a>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════ -->
    <!-- Quick links -->
    <!-- ═══════════════════════════════════════════ -->
    <div class="dash-section">
      <div class="dash-sec-head">
        <span class="dsh-title">快速入口</span>
      </div>
      <div class="dash-links">
        <a :href="withBase('/training')" class="dlnk">🏋 训练平台</a>
        <a :href="withBase('/join')" class="dlnk">📝 加入我们</a>
        <a :href="withBase('/about/guide')" class="dlnk">📖 入门指南</a>
        <a :href="withBase('/award')" class="dlnk">🏆 获奖荣誉</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ============================================================
 * Dashboard root
 * ============================================================ */
.dash-root {
  animation: dash-in 0.6s ease;
}
@keyframes dash-in {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ============================================================
 * Stats bar
 * ============================================================ */
.dash-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.dash-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  padding: 1rem 0.5rem;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #e8e8ed;
  box-shadow: 0 1px 3px rgba(7,17,27,0.03);
  transition: all 0.25s;
}
.dash-stat:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 12px rgba(73,177,245,0.08);
}

.ds-icon  { font-size: 1.3rem; }
.ds-value { font-size: 1.5rem; font-weight: 800; color: #333; line-height: 1.2; }
.ds-label { font-size: 0.75rem; color: #999; }

/* ============================================================
 * Hero contest card
 * ============================================================ */
.dash-hero {
  position: relative;
  padding: 1.5rem 1.75rem;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #e8e8ed;
  box-shadow: 0 2px 8px rgba(7,17,27,0.05);
  margin-bottom: 1.25rem;
  overflow: hidden;
}

.dash-hero::after {
  content: '';
  position: absolute;
  top: -60px; right: -60px;
  width: 180px; height: 180px;
  border-radius: 50%;
  background: rgba(73,177,245,0.04);
  pointer-events: none;
}

.dh-badge-row {
  display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.6rem;
}

.dh-platform {
  display: inline-block;
  padding: 0.15rem 0.55rem;
  border-radius: 7px;
  font-size: 0.7rem; font-weight: 700; color: #fff;
}

.dh-live-dot {
  font-size: 0.72rem; font-weight: 700; color: #22c55e;
  animation: pulse-live 1.2s ease-in-out infinite;
}
@keyframes pulse-live {
  0%,100% { opacity: 1; }
  50%     { opacity: 0.4; }
}

.dh-soon-dot {
  font-size: 0.72rem; font-weight: 700; color: #f59e0b;
  animation: pulse-soon 1.6s ease-in-out infinite;
}
@keyframes pulse-soon {
  0%,100% { opacity: 1; }
  50%     { opacity: 0.5; }
}

.dh-date { font-size: 0.78rem; color: #999; margin-left: auto; }

.dh-name {
  display: block;
  font-size: 1.15rem; font-weight: 700; color: #333;
  text-decoration: none; line-height: 1.4; margin-bottom: 0.4rem;
  transition: color 0.2s;
}
.dh-name:hover { color: #49b1f5; }

.dh-meta {
  display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;
  font-size: 0.82rem;
}

.dh-stars     { letter-spacing: 0.04em; }
.dh-star-label {
  font-size: 0.68rem; font-weight: 600;
  padding: 0.1rem 0.45rem; border-radius: 5px; color: #fff;
}
.dh-dur { color: #aaa; font-size: 0.78rem; margin-left: auto; }

/* ---- countdown ---- */
.dh-countdown {
  display: flex; align-items: center; justify-content: center;
  gap: 0.4rem; margin-bottom: 1rem;
}

.dhc-block {
  display: flex; flex-direction: column; align-items: center;
  min-width: 48px;
}

.dhc-num {
  display: block;
  font-size: 2.2rem; font-weight: 900; color: #333;
  font-variant-numeric: tabular-nums; line-height: 1.1;
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
}
.dhc-sec { color: #49b1f5; }

.dhc-unit {
  font-size: 0.68rem; color: #999; font-weight: 600; text-transform: uppercase;
}

.dhc-sep {
  font-size: 1.4rem; font-weight: 300; color: #ddd;
  align-self: flex-start; margin-top: 0.2rem;
}

/* ---- CTA ---- */
.dh-cta {
  display: inline-flex; align-items: center; gap: 0.4rem;
  margin: 0 auto;
  padding: 0.6rem 2rem;
  border-radius: 25px;
  background: linear-gradient(135deg, #49b1f5, #1a93e0);
  color: #fff; font-weight: 700; font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 4px 14px rgba(73,177,245,0.3);
}
.dh-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 22px rgba(73,177,245,0.45);
}
.dh-cta-arrow { transition: transform 0.3s; }
.dh-cta:hover .dh-cta-arrow { transform: translateX(4px); }

/* ---- empty state ---- */
.dash-hero-empty {
  text-align: center; padding: 2.5rem 1rem; color: #bbb; font-size: 0.9rem;
}
.dh-empty-icon { font-size: 2.5rem; display: block; margin-bottom: 0.5rem; }
.dash-hero-empty .dh-cta { margin-top: 0.75rem; }

/* ============================================================
 * Section shared
 * ============================================================ */
.dash-section { margin-bottom: 1.25rem; }

.dash-sec-head {
  display: flex; align-items: baseline; justify-content: space-between;
  margin-bottom: 0.65rem;
}

.dsh-title {
  font-size: 0.95rem; font-weight: 700; color: #333;
}

.dsh-more {
  font-size: 0.78rem; color: #49b1f5; text-decoration: none; font-weight: 600;
  transition: opacity 0.2s;
}
.dsh-more:hover { opacity: 0.7; }

/* ============================================================
 * Contest row (3-upcoming)
 * ============================================================ */
.dash-contest-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.65rem;
}

.dcr-card {
  display: flex; flex-direction: column; gap: 0.3rem;
  padding: 0.75rem 0.85rem;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #e8e8ed;
  border-top: 3px solid transparent;
  box-shadow: 0 1px 3px rgba(7,17,27,0.03);
  text-decoration: none;
  transition: all 0.25s;
}
.dcr-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 12px rgba(73,177,245,0.08);
}

.dcr-platform {
  display: inline-block;
  align-self: flex-start;
  padding: 0.08rem 0.45rem;
  border-radius: 6px;
  font-size: 0.65rem; font-weight: 700; color: #fff;
}

.dcr-name {
  font-size: 0.82rem; font-weight: 600; color: #4c4948; line-height: 1.35;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}

.dcr-stars   { font-size: 0.7rem; letter-spacing: 0.03em; }
.dcr-countdown { font-size: 0.72rem; color: #999; font-weight: 600; margin-top: auto; }

/* ============================================================
 * Post grid
 * ============================================================ */
.dash-post-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.65rem;
}

.dpg-card {
  display: flex; flex-direction: column; gap: 0.3rem;
  padding: 0.85rem 0.9rem;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #e8e8ed;
  box-shadow: 0 1px 3px rgba(7,17,27,0.03);
  text-decoration: none;
  transition: all 0.25s;
}
.dpg-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 12px rgba(73,177,245,0.08);
}

.dpg-cat {
  font-size: 0.66rem; font-weight: 600; color: #49b1f5;
  background: rgba(73,177,245,0.08);
  padding: 0.08rem 0.5rem; border-radius: 8px;
  align-self: flex-start;
}

.dpg-title {
  font-size: 0.84rem; font-weight: 600; color: #4c4948; line-height: 1.4;
  overflow: hidden; text-overflow: ellipsis;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
}

.dpg-date { font-size: 0.7rem; color: #bbb; margin-top: auto; }

/* ============================================================
 * Quick links
 * ============================================================ */
.dash-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.65rem;
}

.dlnk {
  display: flex; align-items: center; justify-content: center;
  padding: 0.7rem 0.5rem;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #e8e8ed;
  box-shadow: 0 1px 3px rgba(7,17,27,0.03);
  text-decoration: none;
  font-size: 0.84rem; font-weight: 600; color: #555;
  transition: all 0.25s;
}
.dlnk:hover {
  transform: translateY(-2px);
  border-color: #49b1f5;
  color: #49b1f5;
  box-shadow: 0 3px 12px rgba(73,177,245,0.1);
}

/* ============================================================
 * Dark mode
 * ============================================================ */
html.dark .dash-stat       { background: #1a1a30; border-color: #252540; }
html.dark .dash-stat:hover { box-shadow: 0 3px 12px rgba(96,165,250,0.06); }
html.dark .ds-value        { color: #eee; }
html.dark .ds-label        { color: #777; }

html.dark .dash-hero       { background: #1a1a30; border-color: #252540; }
html.dark .dh-name         { color: #eee; }
html.dark .dh-name:hover   { color: #6ec1f7; }
html.dark .dh-date         { color: #777; }
html.dark .dh-dur          { color: #666; }
html.dark .dhc-num         { color: #eee; }
html.dark .dhc-unit        { color: #777; }
html.dark .dhc-sep         { color: #444; }
html.dark .dhc-sec         { color: #6ec1f7; }

html.dark .dsh-title       { color: #eee; }

html.dark .dcr-card        { background: #1a1a30; border-color: #252540; }
html.dark .dcr-card:hover  { box-shadow: 0 3px 12px rgba(96,165,250,0.06); }
html.dark .dcr-name        { color: #ccc; }
html.dark .dcr-countdown   { color: #888; }

html.dark .dpg-card        { background: #1a1a30; border-color: #252540; }
html.dark .dpg-card:hover  { box-shadow: 0 3px 12px rgba(96,165,250,0.06); }
html.dark .dpg-title       { color: #ccc; }
html.dark .dpg-date        { color: #666; }

html.dark .dlnk            { background: #1a1a30; border-color: #252540; color: #aaa; }
html.dark .dlnk:hover      { border-color: #6ec1f7; color: #6ec1f7; }

html.dark .dash-hero-empty { color: #666; }

/* ============================================================
 * Responsive
 * ============================================================ */
@media (max-width: 1024px) {
  .dash-stats       { grid-template-columns: repeat(2, 1fr); }
  .dash-contest-row { grid-template-columns: repeat(2, 1fr); }
  .dash-post-grid   { grid-template-columns: repeat(2, 1fr); }
  .dash-links       { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .dash-hero        { padding: 1rem 1.15rem; }
  .dh-name          { font-size: 1rem; }
  .dhc-num          { font-size: 1.6rem; }
  .dhc-block        { min-width: 38px; }
  .dh-countdown     { gap: 0.25rem; }
  .dash-contest-row { grid-template-columns: 1fr; }
  .dash-post-grid   { grid-template-columns: 1fr; }
  .dash-links       { grid-template-columns: 1fr 1fr; }
}
</style>

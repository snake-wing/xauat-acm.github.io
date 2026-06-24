<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { withBase } from 'vitepress'

/* ================================================================
 * 类型
 * ================================================================ */

interface ContestItem {
  id: string
  name: string
  platform: string
  platformColor: string
  startTimeSeconds: number
  durationSeconds: number
  url: string
  stars: number
  starLabel: string
  starColor: string
}

interface ContestsData {
  updatedAt: number
  updatedAtISO: string
  total: number
  failedPlatforms: string[]
  contests: ContestItem[]
  error?: string
}

/* ================================================================
 * 状态
 * ================================================================ */

const contests = ref<ContestItem[]>([])
const loading = ref(true)
const updatedAt = ref('')
const failedPlatforms = ref<string[]>([])
const now = ref(Date.now())
let timer: ReturnType<typeof setInterval> | null = null

/* ================================================================
 * 数据加载 — 优先读取构建时预抓取的 JSON
 * ================================================================ */

async function loadData() {
  loading.value = true

  try {
    // 1. 读取构建时抓取的数据（所有平台，零延迟）
    const res = await fetch(withBase('/contests.json'), { cache: 'no-cache' })
    if (res.ok) {
      const data: ContestsData = await res.json()
      contests.value = data.contests || []
      updatedAt.value = data.updatedAtISO || ''
      failedPlatforms.value = data.failedPlatforms || []

      // 2. 尝试用 CF 实时 API 刷新 (CF 支持浏览器 CORS)
      if (data.contests?.length > 0) {
        refreshCFLive() // fire-and-forget, 不阻塞渲染
      }

      loading.value = false
      return
    }
  } catch { /* 文件不存在 (dev 模式或首次构建) */ }

  // 3. 兜底：浏览器端直接调 CF API (唯一支持 CORS 的)
  try {
    const cfContests = await fetchCFLive()
    contests.value = cfContests
    updatedAt.value = new Date().toISOString()
    failedPlatforms.value = ['AtCoder', 'NowCoder', 'Luogu']
  } catch {
    contests.value = []
  }

  loading.value = false
}

/**
 * 浏览器端实时调用 Codeforces API (CF 支持 CORS)
 */
async function fetchCFLive(): Promise<ContestItem[]> {
  const res = await fetch('https://codeforces.com/api/contest.list?gym=false')
  const data = await res.json()
  if (data.status !== 'OK') throw new Error(data.comment)

  return data.result
    .filter((c: any) => c.phase === 'BEFORE')
    .slice(0, 8)
    .map((c: any) => {
      const stars = analyzeCFLive(c.name)
      return {
        id: `cf-${c.id}`,
        name: c.name,
        platform: 'Codeforces',
        platformColor: '#1f8acb',
        startTimeSeconds: c.startTimeSeconds,
        durationSeconds: c.durationSeconds,
        url: `https://codeforces.com/contests/${c.id}`,
        stars: stars.stars,
        starLabel: stars.label,
        starColor: starColorLive(stars.stars),
      }
    })
}

/**
 * 用 CF 实时数据刷新已加载列表中的 CF 比赛
 */
async function refreshCFLive() {
  try {
    const fresh = await fetchCFLive()
    // 替换旧的 CF 条目
    const nonCF = contests.value.filter(c => c.platform !== 'Codeforces')
    contests.value = [...fresh, ...nonCF].sort((a, b) => a.startTimeSeconds - b.startTimeSeconds).slice(0, 12)
    // 如果 CF 刷新成功，从失败列表中移除
    failedPlatforms.value = failedPlatforms.value.filter(p => p !== 'Codeforces')
  } catch { /* 静默失败，保留构建时数据 */ }
}

/* ================================================================
 * 浏览器端的简易难度分析 (仅 CF，兜底用)
 * ================================================================ */

function analyzeCFLive(name: string): { stars: number; label: string } {
  // 统一格式：CF API 可能返回 "Div.1" 或 "Div. 1"
  const n = name.toLowerCase().replace(/div\.\s*(\d)/g, 'div.$1')

  // ═══ 6★ ═══
  if ((/div\.1/).test(n) && !(/div\.[234]/).test(n))
    return { stars: 6, label: 'Div.1' }
  if ((/div\.1/).test(n) && (/div\.2/).test(n))
    return { stars: 6, label: 'Div.1+2' }
  if (n.includes('global'))
    return { stars: 6, label: 'Global' }
  if (n.includes('world finals'))
    return { stars: 6, label: 'World Finals' }

  // ═══ 4★: Edu (对标牛客练习赛) — 必须在 Div.2 之前 ═══
  if (n.includes('educational'))
    return { stars: 4, label: 'Edu' }

  // ═══ 5★: Div.2 ═══
  if ((/div\.2/).test(n))
    return { stars: 5, label: 'Div.2' }
  if (n.includes('championship') || n.includes('cup'))
    return { stars: 5, label: 'Cup' }
  if (n.includes('icpc'))
    return { stars: 5, label: 'ICPC' }
  if (n.includes('ioi'))
    return { stars: 5, label: 'IOI' }

  // ═══ 3★: Div.3 (对标牛客周赛) ═══
  if ((/div\.3/).test(n)) return { stars: 3, label: 'Div.3' }

  // ═══ 2★ ═══
  if ((/div\.4/).test(n)) return { stars: 2, label: 'Div.4' }

  return { stars: 4, label: '' }
}

function starColorLive(s: number): string {
  if (s >= 6) return '#ef4444'
  if (s >= 5) return '#f59e0b'
  if (s >= 4) return '#8b5cf6'
  if (s >= 3) return '#3b82f6'
  return '#22c55e'
}

/* ================================================================
 * 辅助函数
 * ================================================================ */

function durationStr(s: number): string {
  if (!s || s <= 0) return '—'
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  return h > 0 ? (m > 0 ? `${h}h ${m}m` : `${h}h`) : `${m}m`
}

function countdown(startS: number): string {
  const diff = startS * 1000 - now.value
  if (diff <= 0) return '进行中'
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  if (d > 0) return `${d}天${h}小时`
  if (h > 0) return `${h}小时${m}分钟`
  return `${m}分钟后`
}

function fmtDate(ts: number): string {
  const d = new Date(ts * 1000)
  return d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }) +
    ' ' + d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

function isSoon(startS: number): boolean {
  return (startS * 1000 - now.value) > 0 && (startS * 1000 - now.value) < 86400000
}

function timeAgo(iso: string): string {
  if (!iso) return ''
  const diff = Date.now() - new Date(iso).getTime()
  const min = Math.floor(diff / 60000)
  if (min < 1) return '刚刚'
  if (min < 60) return `${min} 分钟前`
  const h = Math.floor(min / 60)
  if (h < 24) return `${h} 小时前`
  return `${Math.floor(h / 24)} 天前`
}

onMounted(() => {
  loadData()
  timer = setInterval(() => { now.value = Date.now() }, 30000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="cb-root">
    <!-- Loading -->
    <div v-if="loading" class="cb-skeleton">
      <div v-for="i in 4" :key="i" class="cb-sk-card">
        <span class="cb-sk-bar w-25"></span>
        <span class="cb-sk-bar w-70"></span>
        <span class="cb-sk-bar w-50"></span>
      </div>
    </div>

    <!-- All failed -->
    <div v-else-if="contests.length === 0 && !loading" class="cb-error">
      <span class="cb-error-icon">📭</span>
      <p>近期暂无比赛数据</p>
      <p class="cb-error-hint">
        请直接访问各平台查看：
        <a href="https://codeforces.com/contests" target="_blank">CF</a> ·
        <a href="https://atcoder.jp/contests" target="_blank">AtCoder</a> ·
        <a href="https://ac.nowcoder.com/acm/contest/vip-index" target="_blank">牛客</a> ·
        <a href="https://www.luogu.com.cn/contest/list" target="_blank">洛谷</a>
      </p>
    </div>

    <!-- Contest list -->
    <div v-else class="cb-list">
      <!-- 更新时间 & 部分失败提示 -->
      <div class="cb-meta">
        <span v-if="updatedAt" class="cb-updated">🕐 数据更新于 {{ timeAgo(updatedAt) }}</span>
        <span v-if="failedPlatforms.length > 0" class="cb-warning">
          ⚠️ <template v-for="(p, i) in failedPlatforms" :key="p"><strong>{{ p }}</strong><span v-if="i < failedPlatforms.length - 1">、</span></template> 未获取到，可直接点击上方平台卡片
        </span>
      </div>

      <!-- Cards -->
      <div
        v-for="c in contests"
        :key="c.id"
        class="cb-card"
        :style="{ borderLeftColor: c.platformColor }"
      >
        <div class="cb-top">
          <span class="cb-platform-badge" :style="{ background: c.platformColor }">
            {{ c.platform }}
          </span>
          <a :href="c.url" target="_blank" class="cb-name" :title="c.name">{{ c.name }}</a>
          <span class="cb-stars" :style="{ color: c.starColor || '#3b82f6' }">
            <span class="cb-star-chars">
              {{ '★'.repeat(Math.max(0, c.stars)) }}{{ '☆'.repeat(Math.max(0, 6 - c.stars)) }}
            </span>
            <span v-if="c.starLabel" class="cb-star-label" :style="{ background: c.starColor || '#3b82f6' }">
              {{ c.starLabel }}
            </span>
          </span>
        </div>
        <div class="cb-bottom">
          <span class="cb-date">📅 {{ fmtDate(c.startTimeSeconds) }}</span>
          <span class="cb-countdown" :class="{ 'cb-urgent': isSoon(c.startTimeSeconds) }">
            ⏳ {{ countdown(c.startTimeSeconds) }}
          </span>
          <span class="cb-duration">🕐 {{ durationStr(c.durationSeconds) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ---- root ---- */
.cb-root { margin-top: 0.25rem; }

/* ---- skeleton ---- */
.cb-skeleton { display: flex; flex-direction: column; gap: 0.55rem; }
.cb-sk-card {
  display: flex; flex-direction: column; gap: 0.4rem;
  padding: 0.8rem 1rem;
  border-radius: 10px; background: #f5f6f8; border: 1px solid #eee;
}
.cb-sk-bar {
  height: 14px; border-radius: 6px;
  background: linear-gradient(90deg, #e8e8ed 25%, #f0f0f3 50%, #e8e8ed 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
.w-25 { width: 25%; } .w-50 { width: 50%; } .w-70 { width: 70%; }
@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ---- error ---- */
.cb-error { text-align: center; padding: 2rem; color: #999; font-size: 0.88rem; }
.cb-error-icon { font-size: 2rem; display: block; margin-bottom: 0.5rem; }
.cb-error-hint { margin-top: 0.75rem; font-size: 0.8rem; }
.cb-error-hint a { color: #49b1f5; font-weight: 600; text-decoration: none; margin: 0 0.15rem; }
.cb-error-hint a:hover { text-decoration: underline; }

/* ---- meta row ---- */
.cb-meta {
  display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;
  margin-bottom: 0.15rem;
}
.cb-updated { font-size: 0.72rem; color: #bbb; white-space: nowrap; }
.cb-warning {
  font-size: 0.73rem; color: #92400e;
  background: rgba(245,158,11,0.06);
  border: 1px solid rgba(245,158,11,0.15);
  padding: 0.25rem 0.6rem; border-radius: 6px;
}

/* ---- list ---- */
.cb-list { display: flex; flex-direction: column; gap: 0.5rem; }

/* ---- card ---- */
.cb-card {
  padding: 0.7rem 1rem;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #e8e8ed;
  border-left: 3px solid transparent;
  box-shadow: 0 1px 4px rgba(7,17,27,0.04);
  transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
}
.cb-card:hover {
  border-color: #c0dff5;
  box-shadow: 0 3px 12px rgba(73,177,245,0.1);
  transform: translateX(4px);
}

/* ---- top row ---- */
.cb-top { display: flex; align-items: center; gap: 0.55rem; margin-bottom: 0.35rem; }
.cb-platform-badge {
  display: inline-block; padding: 0.08rem 0.5rem;
  border-radius: 8px;
  font-size: 0.68rem; font-weight: 700; color: #fff;
  white-space: nowrap; flex-shrink: 0;
}
.cb-name {
  flex: 1; min-width: 0;
  font-size: 0.87rem; font-weight: 600;
  color: #4c4948; text-decoration: none;
  line-height: 1.35; transition: color 0.2s;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.cb-name:hover { color: #49b1f5; }

/* ---- stars ---- */
.cb-stars { display: flex; align-items: center; gap: 0; flex-shrink: 0; white-space: nowrap; }
.cb-star-chars { font-size: 0.76rem; letter-spacing: 0.04em; line-height: 1; }
.cb-star-label {
  font-size: 0.66rem; font-weight: 700;
  margin-left: 0.4rem;
  padding: 0.1rem 0.45rem; border-radius: 5px; color: #fff; line-height: 1.3;
}

/* ---- bottom row ---- */
.cb-bottom { display: flex; align-items: center; gap: 0.9rem; font-size: 0.74rem; }
.cb-date      { color: #999; white-space: nowrap; }
.cb-countdown { color: #666; font-weight: 600; white-space: nowrap; }
.cb-duration  { color: #aaa; white-space: nowrap; margin-left: auto; }
.cb-urgent { color: #f59e0b; animation: pulse-urgent 1.6s ease-in-out infinite; }
@keyframes pulse-urgent {
  0%,100% { opacity: 1; }
  50%     { opacity: 0.5; }
}

/* ---- dark mode ---- */
html.dark .cb-card            { background: #1a1a30; border-color: #252540; border-left: 3px solid transparent; }
html.dark .cb-card:hover      { border-color: #3a5080; box-shadow: 0 3px 12px rgba(96,165,250,0.12); }
html.dark .cb-name            { color: #ddd; }
html.dark .cb-name:hover      { color: #6ec1f7; }
html.dark .cb-date            { color: #777; }
html.dark .cb-countdown       { color: #aaa; }
html.dark .cb-duration        { color: #666; }
html.dark .cb-urgent          { color: #fbbf24; }
html.dark .cb-sk-card         { background: #1a1a30; border-color: #252540; }
html.dark .cb-sk-bar          { background: linear-gradient(90deg, #2a2a40 25%, #30304a 50%, #2a2a40 75%); background-size: 200% 100%; }
html.dark .cb-warning         { background: rgba(245,158,11,0.08); border-color: rgba(245,158,11,0.12); color: #fbbf24; }
html.dark .cb-error           { color: #777; }
html.dark .cb-updated         { color: #555; }

/* ---- responsive ---- */
@media (max-width: 768px) {
  .cb-top      { flex-wrap: wrap; gap: 0.35rem; }
  .cb-star-chars { font-size: 0.7rem; }
  .cb-star-label { font-size: 0.6rem; padding: 0.06rem 0.35rem; margin-left: 0.25rem; }
  .cb-bottom   { flex-wrap: wrap; gap: 0.4rem; }
  .cb-duration { margin-left: 0; }
  .cb-name     { font-size: 0.8rem; }
}
</style>

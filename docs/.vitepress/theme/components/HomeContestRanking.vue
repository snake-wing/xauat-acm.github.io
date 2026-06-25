<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
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
  url: string
}

interface ContestsData {
  contests: ContestItem[]
  updatedAtISO: string
}

interface RankingSlot {
  rank: number
  label: string
  platform: string
  platformColor: string
  medal: '' | 'gold' | 'silver' | 'bronze'
  match: (c: ContestItem) => boolean
  contest: ContestItem | null
}

interface OfflineContest {
  name: string
  date: string
  location: string
  url: string
  status: string
}

/* ================================================================
 * 排行定义
 * ================================================================ */

const RANKING_SLOTS: RankingSlot[] = [
  {
    rank: 1, label: 'AtCoder Beginner Contest', platform: 'AtCoder', platformColor: '#1a1a1a', medal: 'gold',
    match: (c) => c.platform === 'AtCoder' && /\b(?:Beginner\s+Contest|ABC\s*\d)\b/i.test(c.name),
    contest: null,
  },
  {
    rank: 2, label: 'Educational Codeforces Round', platform: 'Codeforces', platformColor: '#1f8acb', medal: 'silver',
    match: (c) => c.platform === 'Codeforces' && /educational/i.test(c.name),
    contest: null,
  },
  {
    rank: 3, label: 'Codeforces Div.3', platform: 'Codeforces', platformColor: '#1f8acb', medal: 'bronze',
    match: (c) => c.platform === 'Codeforces' && /div\.\s*3/i.test(c.name),
    contest: null,
  },
  {
    rank: 4, label: 'Codeforces Div.2', platform: 'Codeforces', platformColor: '#1f8acb', medal: '',
    match: (c) => c.platform === 'Codeforces' && /div\.\s*2/i.test(c.name) && !/educational/i.test(c.name),
    contest: null,
  },
  {
    rank: 5, label: '牛客周赛', platform: 'NowCoder', platformColor: '#5cb85c', medal: '',
    match: (c) => c.platform === 'NowCoder' && /周赛/.test(c.name),
    contest: null,
  },
  {
    rank: 6, label: '牛客小白月赛', platform: 'NowCoder', platformColor: '#5cb85c', medal: '',
    match: (c) => c.platform === 'NowCoder' && /小白月赛/.test(c.name),
    contest: null,
  },
  {
    rank: 7, label: 'Codeforces Div.1', platform: 'Codeforces', platformColor: '#1f8acb', medal: '',
    match: (c) => c.platform === 'Codeforces' && /div\.\s*1/i.test(c.name) && !/div\.\s*[234]/i.test(c.name),
    contest: null,
  },
  {
    rank: 8, label: 'AtCoder Regular Contest', platform: 'AtCoder', platformColor: '#1a1a1a', medal: '',
    match: (c) => c.platform === 'AtCoder' && /\b(?:Regular\s+Contest|ARC\s*\d)\b/i.test(c.name),
    contest: null,
  },
]

/* ================================================================
 * 状态
 * ================================================================ */

const slots = ref<RankingSlot[]>(RANKING_SLOTS.map(s => ({ ...s })))
const offlineContests = ref<OfflineContest[]>([])
const loading = ref(true)
const now = ref(Date.now())
let timer: ReturnType<typeof setInterval> | null = null

/* ================================================================
 * 数据加载 + 匹配
 * ================================================================ */

async function loadData() {
  loading.value = true
  try {
    // 在线比赛
    const res = await fetch(withBase('/contests.json'), { cache: 'no-cache' })
    if (res.ok) {
      const data: ContestsData = await res.json()
      const all = (data.contests || []).filter(c => c.startTimeSeconds > Date.now() / 1000)
      for (const slot of slots.value) {
        const matched = all.filter(c => slot.match(c)).sort((a, b) => a.startTimeSeconds - b.startTimeSeconds)
        slot.contest = matched[0] || null
      }
    }
  } catch { /* 静默 */ }

  try {
    // 线下比赛
    const offRes = await fetch(withBase('/offline-contests.json'), { cache: 'no-cache' })
    if (offRes.ok) {
      offlineContests.value = await offRes.json()
    }
  } catch { /* 静默 */ }

  loading.value = false
}

/* ================================================================
 * 辅助
 * ================================================================ */

function countdown(startS: number): string {
  const diff = startS * 1000 - now.value
  if (diff <= 0) return '进行中'
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  if (d > 0) return `${d}天${h}h`
  if (h > 0) return `${h}h${m}m`
  return `${m}m`
}

function isSoon(startS: number): boolean {
  const diff = startS * 1000 - now.value
  return diff > 0 && diff < 86400000
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
  <div class="cr-root">
    <!-- 左：值得训练的比赛 -->
    <div class="cr-left">
      <div class="cr-title">🏆 值得训练的比赛</div>

      <div v-if="loading" class="cr-grid">
        <div v-for="i in 8" :key="i" class="cr-cell-sk"></div>
      </div>

      <div v-else class="cr-grid">
        <a
          v-for="slot in slots"
          :key="slot.rank"
          :href="slot.contest?.url || '#'"
          :target="slot.contest ? '_blank' : undefined"
          class="cr-cell"
          :class="{ 'cr-empty': !slot.contest }"
        >
          <div class="cr-top">
            <span class="cr-rank">{{ slot.rank }}</span>
            <span class="cr-label">{{ slot.label }}</span>
          </div>
          <div class="cr-bottom">
            <span class="cr-platform" :style="{ background: slot.platformColor }">{{ slot.platform }}</span>
            <span v-if="slot.contest" class="cr-cd" :class="{ 'cr-soon': isSoon(slot.contest.startTimeSeconds) }">{{ countdown(slot.contest.startTimeSeconds) }}</span>
            <span v-else class="cr-na">—</span>
          </div>
        </a>
      </div>
    </div>

    <!-- 分割线 -->
    <div class="cr-divider"></div>

    <!-- 右：即将举行的比赛（正式） -->
    <div class="cr-right">
      <div class="cr-title">📅 即将举行的比赛（正式）</div>
      <div v-if="offlineContests.length === 0" class="cr-right-empty">暂无数据</div>
      <div v-else class="cr-offline-list">
        <a
          v-for="(c, i) in offlineContests"
          :key="i"
          :href="c.url || undefined"
          :target="c.url ? '_blank' : undefined"
          class="cr-offline-item"
          :class="{ 'cr-offline-link': !!c.url }"
        >
          <span class="cr-offline-name">{{ c.name }}</span>
          <span class="cr-offline-meta">{{ c.date }} · {{ c.location }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ===== 根 ===== */
.cr-root {
  display: flex;
  align-items: flex-start;
  gap: 0;
}

/* ===== 左右面板：等宽 ===== */
.cr-left,
.cr-right {
  flex: 1;
  min-width: 0;
}

/* ===== 面板标题 ===== */
.cr-title {
  font-size: 0.82rem;
  font-weight: 700;
  color: #4c4948;
  margin-bottom: 0.5rem;
  text-align: center;
}

/* ===== 分割线 ===== */
.cr-divider {
  width: 1px;
  align-self: stretch;
  background: #e0e0e5;
  margin: 0 0.8rem;
}

/* ===== 右侧空态 ===== */
.cr-right-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 6rem;
  font-size: 0.8rem;
  color: #bbb;
}

/* ===== 右侧线下比赛列表 ===== */
.cr-offline-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cr-offline-item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.45rem 0.55rem;
  border-radius: 7px;
  background: #f8f9fb;
  border: 1px solid #eef0f3;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
}

.cr-offline-link {
  cursor: pointer;
}

.cr-offline-link:hover {
  background: #f0f4f8;
  border-color: #d0dae5;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.cr-offline-name {
  font-size: 0.72rem;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
}

.cr-offline-link:hover .cr-offline-name {
  color: #49b1f5;
}

.cr-offline-meta {
  font-size: 0.65rem;
  color: #999;
}

/* ===== 网格：2 列 ===== */
.cr-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem;
}

/* ===== 单元格 ===== */
.cr-cell {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.45rem 0.55rem;
  border-radius: 7px;
  background: #f8f9fb;
  border: 1px solid #eef0f3;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
  cursor: pointer;
}

.cr-cell:hover {
  background: #f0f4f8;
  border-color: #d0dae5;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.cr-empty {
  opacity: 0.45;
}
.cr-empty:hover {
  transform: none;
  box-shadow: none;
  border-color: #eef0f3;
  background: #f8f9fb;
  cursor: default;
}

/* ===== 上排：排名 + 标签 ===== */
.cr-top {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.cr-rank {
  flex-shrink: 0;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 800;
  background: #e8e8ed;
  color: #999;
}

.cr-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
}

.cr-cell:hover .cr-label {
  color: #49b1f5;
}

/* ===== 下排：平台 + 倒计时 ===== */
.cr-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.3rem;
}

.cr-platform {
  font-size: 0.52rem;
  font-weight: 700;
  color: #fff;
  padding: 0.06rem 0.35rem;
  border-radius: 3px;
  letter-spacing: 0.3px;
  white-space: nowrap;
}

.cr-cd {
  font-size: 0.7rem;
  font-weight: 700;
  color: #555;
  white-space: nowrap;
}

.cr-soon {
  color: #f59e0b;
  animation: pulse-urgent 1.6s ease-in-out infinite;
}

@keyframes pulse-urgent {
  0%, 100% { opacity: 1; }
  50%     { opacity: 0.5; }
}

.cr-na {
  font-size: 0.7rem;
  color: #ccc;
}

/* ===== 骨架 ===== */
.cr-cell-sk {
  height: 4rem;
  border-radius: 8px;
  background: linear-gradient(90deg, #f0f1f4 25%, #f6f7f9 50%, #f0f1f4 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ===== 暗色模式 ===== */
html.dark .cr-title            { color: #ddd; }
html.dark .cr-divider          { background: #2a2a45; }
html.dark .cr-right-empty      { color: #555; }
html.dark .cr-offline-item     { background: #1e1e36; border-color: #2a2a45; }
html.dark .cr-offline-link:hover { background: #242440; border-color: #3a5080; }
html.dark .cr-offline-name     { color: #ddd; }
html.dark .cr-offline-link:hover .cr-offline-name { color: #6ec1f7; }
html.dark .cr-offline-meta     { color: #666; }
html.dark .cr-cell             { background: #1e1e36; border-color: #2a2a45; }
html.dark .cr-cell:hover       { background: #242440; border-color: #3a5080; }
html.dark .cr-label            { color: #ddd; }
html.dark .cr-cell:hover .cr-label { color: #6ec1f7; }
html.dark .cr-cd               { color: #bbb; }
html.dark .cr-na               { color: #555; }
html.dark .cr-soon             { color: #fbbf24; }
html.dark .cr-rank      { background: #252540; color: #555; }

html.dark .cr-empty:hover { background: #1e1e36; border-color: #2a2a45; }
html.dark .cr-cell-sk      { background: linear-gradient(90deg, #252540 25%, #2a2a48 50%, #252540 75%); background-size: 200% 100%; }

/* ===== 响应式 ===== */
@media (max-width: 640px) {
  .cr-root {
    flex-direction: column;
  }
  .cr-divider {
    width: 100%;
    height: 1px;
    margin: 0.75rem 0;
  }
}

@media (max-width: 480px) {
  .cr-grid {
    grid-template-columns: 1fr;
  }
}
</style>

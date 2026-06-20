---
layout: page
---

<script setup>
import { computed } from 'vue'

// ============================================================
// 「获奖荣誉」数据 —— 按年份分组，直接修改此数组即可
// awardLevel: gold / silver / bronze / iron / special
// ============================================================
const awardsByYear = [
  {
    year: 2026,
    items: [
      // 示例数据，请替换为真实获奖记录
      // {
      //   competition: 'ICPC 亚洲区域赛（西安站）',
      //   level: 'silver',
      //   levelLabel: '银牌',
      //   team: '队伍名',
      //   members: '张三、李四、王五',
      //   date: '2026-12',
      // },
      // {
      //   competition: '蓝桥杯省赛',
      //   level: 'gold',
      //   levelLabel: '一等奖',
      //   team: '-',
      //   members: '张三',
      //   date: '2026-04',
      // },
    ],
  },
]

// 统计
const stats = computed(() => {
  let gold = 0, silver = 0, bronze = 0, other = 0
  awardsByYear.forEach(y => {
    y.items.forEach(item => {
      if (item.level === 'gold') gold++
      else if (item.level === 'silver') silver++
      else if (item.level === 'bronze') bronze++
      else other++
    })
  })
  return { gold, silver, bronze, other }
})

const levelClass = (level) => {
  return { gold: 'level-gold', silver: 'level-silver', bronze: 'level-bronze', iron: 'level-iron', special: 'level-special' }[level] || ''
}
</script>

# 🏆 获奖荣誉

<div class="award-section">

<p class="award-intro">
建队以来，XAUAT ACM 集训队在各项算法竞赛中奋勇拼搏。每一份荣誉背后，都是无数个日夜的刷题与坚持。
</p>

<!-- 荣誉统计 -->
<div class="award-stats">
  <div class="award-stat gold">
    <span class="award-stat-num">{{ stats.gold }}</span>
    <span class="award-stat-label">金牌 / 一等奖</span>
  </div>
  <div class="award-stat silver">
    <span class="award-stat-num">{{ stats.silver }}</span>
    <span class="award-stat-label">银牌 / 二等奖</span>
  </div>
  <div class="award-stat bronze">
    <span class="award-stat-num">{{ stats.bronze }}</span>
    <span class="award-stat-label">铜牌 / 三等奖</span>
  </div>
</div>

<!-- 按年份展示 -->
<div v-for="yearGroup in awardsByYear" :key="yearGroup.year" class="award-year">
  <h2 class="award-year-title">{{ yearGroup.year }} 年</h2>
  <div class="award-list">
    <div v-for="(item, idx) in yearGroup.items" :key="idx" class="award-item">
      <div class="award-badge" :class="levelClass(item.level)">
        {{ item.levelLabel }}
      </div>
      <div class="award-detail">
        <div class="award-comp">{{ item.competition }}</div>
        <div class="award-team" v-if="item.team && item.team !== '-'">🏆 {{ item.team }}</div>
        <div class="award-members">👤 {{ item.members }}</div>
        <div class="award-date">{{ item.date }}</div>
      </div>
    </div>
  </div>
  <div v-if="yearGroup.items.length === 0" class="award-empty-year">
    暂无 {{ yearGroup.year }} 年的获奖记录
  </div>
</div>

<!-- 空状态 -->
<div v-if="awardsByYear.length === 0" class="award-empty">
  <p>🏅 暂无获奖记录，期待首金！</p>
  <p>每一次参赛都是成长，每一份努力都会有回报。加油训练，荣誉墙等你来书写！</p>
</div>

</div>

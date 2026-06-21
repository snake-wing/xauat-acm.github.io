---
sidebar: false
aside: true
---

<script setup>
import { ref } from 'vue'

const activeTab = ref('ICPC')

const tabs = ['ICPC', 'CCPC', '蓝桥杯', '天梯赛']

const awards = {
  ICPC: {
    title: 'ICPC 国际大学生程序设计竞赛',
    icon: '🌍',
    levels: [
      { label: '🥇 金奖', color: 'gold', items: [] },
      { label: '🥈 银奖', color: 'silver', items: [] },
      { label: '🥉 铜奖', color: 'bronze', items: [] },
    ],
  },
  CCPC: {
    title: 'CCPC 中国大学生程序设计竞赛',
    icon: '🇨🇳',
    levels: [
      { label: '🥇 金奖', color: 'gold', items: [] },
      { label: '🥈 银奖', color: 'silver', items: [] },
      { label: '🥉 铜奖', color: 'bronze', items: [] },
    ],
  },
  蓝桥杯: {
    title: '蓝桥杯全国软件和信息技术专业人才大赛',
    icon: '🏔️',
    levels: [
      { label: '🥇 国一', color: 'gold', items: [] },
      { label: '🥈 国二', color: 'silver', items: [] },
      { label: '🥉 国三', color: 'bronze', items: [] },
      { label: '省一', color: 'iron', items: [] },
      { label: '省二', color: 'iron', items: [] },
      { label: '省三', color: 'iron', items: [] },
    ],
  },
  天梯赛: {
    title: '中国高校计算机大赛-团体程序设计天梯赛',
    icon: '🪜',
    subsections: [
      {
        title: '团队奖项',
        levels: [
          { label: '🥇 国一', color: 'gold', items: [] },
          { label: '🥈 国二', color: 'silver', items: [] },
          { label: '🥉 国三', color: 'bronze', items: [] },
          { label: '省一', color: 'iron', items: [] },
          { label: '省二', color: 'iron', items: [] },
          { label: '省三', color: 'iron', items: [] },
        ],
      },
      {
        title: '个人奖项',
        levels: [
          { label: '🥇 国一', color: 'gold', items: [] },
          { label: '🥈 国二', color: 'silver', items: [] },
          { label: '🥉 国三', color: 'bronze', items: [] },
        ],
      },
    ],
  },
}

function levelClass(color) {
  return { gold: 'lv-gold', silver: 'lv-silver', bronze: 'lv-bronze', iron: 'lv-iron' }[color] || ''
}

function totalCount(data) {
  if (data.subsections) {
    return data.subsections.reduce((s, sub) => s + sub.levels.reduce((ss, l) => ss + l.items.length, 0), 0)
  }
  return data.levels.reduce((s, l) => s + l.items.length, 0)
}
</script>

# 🏆 获奖荣誉

<div class="award-page">

<div class="award-tabs">
  <button
    v-for="tab in tabs"
    :key="tab"
    class="award-tab"
    :class="{ active: activeTab === tab }"
    @click="activeTab = tab"
  >
    {{ tab }}
    <span class="award-tab-count" v-if="totalCount(awards[tab]) > 0">{{ totalCount(awards[tab]) }}</span>
  </button>
</div>

<div class="award-section" v-show="activeTab === 'ICPC'">
  <div class="award-section-head">
    <img src="/images/icpc-logo.png" alt="ICPC" class="award-logo" />
    <span class="award-section-title">{{ awards.ICPC.title }}</span>
  </div>
  <div class="award-levels-grid">
    <div class="award-level-col" v-for="level in awards.ICPC.levels" :key="level.label">
      <div class="award-level-head" :class="levelClass(level.color)">
        {{ level.label }}
        <span class="award-level-count">{{ level.items.length }}</span>
      </div>
      <div class="award-level-items">
        <div class="award-row" v-for="(item, idx) in level.items" :key="idx">
          <span class="award-row-year">{{ item.year }}</span>
          <span class="award-row-comp">{{ item.competition }}</span>
          <span class="award-row-team" v-if="item.team">{{ item.team }}</span>
          <span class="award-row-members">{{ item.members }}</span>
        </div>
        <div class="award-row-empty" v-if="level.items.length === 0">暂无</div>
      </div>
    </div>
  </div>
</div>

<div class="award-section" v-show="activeTab === 'CCPC'">
  <div class="award-section-head">
    <img src="/images/ccpc-logo.png" alt="CCPC" class="award-logo" />
    <span class="award-section-title">{{ awards.CCPC.title }}</span>
  </div>
  <div class="award-levels-grid">
    <div class="award-level-col" v-for="level in awards.CCPC.levels" :key="level.label">
      <div class="award-level-head" :class="levelClass(level.color)">
        {{ level.label }}
        <span class="award-level-count">{{ level.items.length }}</span>
      </div>
      <div class="award-level-items">
        <div class="award-row" v-for="(item, idx) in level.items" :key="idx">
          <span class="award-row-year">{{ item.year }}</span>
          <span class="award-row-comp">{{ item.competition }}</span>
          <span class="award-row-team" v-if="item.team">{{ item.team }}</span>
          <span class="award-row-members">{{ item.members }}</span>
        </div>
        <div class="award-row-empty" v-if="level.items.length === 0">暂无</div>
      </div>
    </div>
  </div>
</div>

<div class="award-section" v-show="activeTab === '蓝桥杯'">
  <div class="award-section-head">
    <img src="/images/lanqiao-logo.png" alt="蓝桥杯" class="award-logo" />
    <span class="award-section-title">{{ awards['蓝桥杯'].title }}</span>
  </div>
  <div class="award-levels-grid">
    <div class="award-level-col" v-for="level in awards['蓝桥杯'].levels" :key="level.label">
      <div class="award-level-head" :class="levelClass(level.color)">
        {{ level.label }}
        <span class="award-level-count">{{ level.items.length }}</span>
      </div>
      <div class="award-level-items">
        <div class="award-row" v-for="(item, idx) in level.items" :key="idx">
          <span class="award-row-year">{{ item.year }}</span>
          <span class="award-row-comp">{{ item.competition }}</span>
          <span class="award-row-team" v-if="item.team">{{ item.team }}</span>
          <span class="award-row-members">{{ item.members }}</span>
        </div>
        <div class="award-row-empty" v-if="level.items.length === 0">暂无</div>
      </div>
    </div>
  </div>
</div>

<div class="award-section" v-show="activeTab === '天梯赛'">
  <div class="award-section-head">
    <img src="/images/ladder-logo.png" alt="天梯赛" class="award-logo" />
    <span class="award-section-title">{{ awards['天梯赛'].title }}</span>
  </div>
  <div v-for="sub in awards['天梯赛'].subsections" :key="sub.title" class="award-subsection">
    <h3 class="award-sub-title">{{ sub.title }}</h3>
    <div class="award-levels-grid">
      <div class="award-level-col" v-for="level in sub.levels" :key="level.label">
        <div class="award-level-head" :class="levelClass(level.color)">
          {{ level.label }}
          <span class="award-level-count">{{ level.items.length }}</span>
        </div>
        <div class="award-level-items">
          <div class="award-row" v-for="(item, idx) in level.items" :key="idx">
            <span class="award-row-year">{{ item.year }}</span>
            <span class="award-row-comp">{{ item.competition }}</span>
            <span class="award-row-team" v-if="item.team">{{ item.team }}</span>
            <span class="award-row-members">{{ item.members }}</span>
          </div>
          <div class="award-row-empty" v-if="level.items.length === 0">暂无</div>
        </div>
      </div>
    </div>
  </div>
</div>

</div>

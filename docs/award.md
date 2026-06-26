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
      { label: '🥇 金奖', color: 'gold', items: [
          { year: '2025', competition: 'ICPC 亚洲区域赛（南京站）', team: 'XAUAT-1', members: '张三, 李四, 王五' },
        ] },
      { label: '🥈 银奖', color: 'silver', items: [
          { year: '2025', competition: 'ICPC 亚洲区域赛（西安站）', team: 'XAUAT-2', members: '赵六, 孙七, 周八' },
          { year: '2024', competition: 'ICPC 亚洲区域赛（济南站）', team: 'XAUAT-3', members: '吴九, 郑十, 陈十一' },
        ] },
      { label: '🥉 铜奖', color: 'bronze', items: [
          { year: '2024', competition: 'ICPC 邀请赛（武汉站）', members: '钱十二' },
        ] },
    ],
  },
  CCPC: {
    title: 'CCPC 中国大学生程序设计竞赛',
    icon: '🇨🇳',
    levels: [
      { label: '🥇 金奖', color: 'gold', items: [] },
      { label: '🥈 银奖', color: 'silver', items: [
          { year: '2025', competition: 'CCPC 西安站', team: 'XAUAT-1', members: '张三, 李四, 王五' },
        ] },
      { label: '🥉 铜奖', color: 'bronze', items: [
          { year: '2025', competition: 'CCPC 秦皇岛站', team: 'XAUAT-2', members: '赵六, 孙七, 周八' },
          { year: '2024', competition: 'CCPC 哈尔滨站', team: 'XAUAT-3', members: '吴九, 郑十' },
        ] },
    ],
  },
  蓝桥杯: {
    title: '蓝桥杯全国软件和信息技术专业人才大赛',
    icon: '🏔️',
    sections: [
      {
        year: '2026',
        levels: [
          { label: '🥇 国一', color: 'gold', items: [
              { year: '2026', competition: '蓝桥杯 C/C++ 程序设计大学 B 组（国赛）', members: '张渊博' },
            ] },
          { label: '🥈 国二', color: 'silver', items: [
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学 B 组（国赛）', members: '潘扬' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学 B 组（国赛）', members: '黄章满' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学 B 组（国赛）', members: '庞钧溢' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学 B 组（国赛）', members: '王子鹏' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学 B 组（国赛）', members: '苑晓舰' },
              { year: '2026', competition: '蓝桥杯 C/C++ 程序设计大学 B 组（国赛）', members: '孙子芮' },
              { year: '2026', competition: '蓝桥杯 C/C++ 程序设计大学 B 组（国赛）', members: '邹凯' },
              { year: '2026', competition: '蓝桥杯 C/C++ 程序设计大学 B 组（国赛）', members: '姚艺欣' },
            ] },
          { label: '🥉 国三', color: 'bronze', items: [
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学 B 组（国赛）', members: '王思远' },
              { year: '2026', competition: '蓝桥杯 Python 程序设计大学 B 组（国赛）', members: '叶帅杰' },
              { year: '2026', competition: '蓝桥杯 C/C++ 程序设计大学 B 组（国赛）', members: '杨帆' },
              { year: '2026', competition: '蓝桥杯 C/C++ 程序设计大学 B 组（国赛）', members: '刘家林' },
              { year: '2026', competition: '蓝桥杯 C/C++ 程序设计大学 B 组（国赛）', members: '张帅' },
              { year: '2026', competition: '蓝桥杯 C/C++ 程序设计大学 B 组（国赛）', members: '刘济荣' },
              { year: '2026', competition: '蓝桥杯 C/C++ 程序设计大学 B 组（国赛）', members: '王树茂' },
              { year: '2026', competition: '蓝桥杯 C/C++ 程序设计大学研究生组（国赛）', members: '郭旭东' },
            ] },
          { label: '省一', color: 'iron', items: [] },
          { label: '省二', color: 'iron', items: [] },
          { label: '省三', color: 'iron', items: [] },
        ],
      },
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
          { label: '🥉 国三', color: 'bronze', items: [
              { year: '2025', competition: '天梯赛全国总决赛', members: '张三, 李四, 王五, 赵六, 孙七, 周八, 吴九, 郑十, 陈十一, 钱十二' },
            ] },
          { label: '省一', color: 'iron', items: [
              { year: '2024', competition: '天梯赛陕西省赛', members: '张三, 李四, 王五, 赵六, 孙七, 周八, 吴九, 郑十, 陈十一, 钱十二' },
            ] },
          { label: '省二', color: 'iron', items: [] },
          { label: '省三', color: 'iron', items: [] },
        ],
      },
      {
        title: '个人奖项',
        levels: [
          { label: '🥇 国一', color: 'gold', items: [] },
          { label: '🥈 国二', color: 'silver', items: [
              { year: '2025', competition: '天梯赛个人排名', members: '张三' },
            ] },
          { label: '🥉 国三', color: 'bronze', items: [] },
        ],
      },
    ],
  },
}

function levelClass(color) {
  return { gold: 'lv-gold', silver: 'lv-silver', bronze: 'lv-bronze', iron: 'lv-iron' }[color] || ''
}

const achievedSvg = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 11l3.5 3.5L16 6" stroke="#49b1f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
const unachievedSvg = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5l-10 10" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/></svg>'

function flatItems(data) {
  if (!data) return []
  if (data.subsections) {
    return data.subsections.flatMap(sub =>
      sub.levels.flatMap(level =>
        level.items.map(item => ({ ...item, award: level.label, color: level.color }))
      )
    )
  }
  return data.levels.flatMap(level =>
    level.items.map(item => ({ ...item, award: level.label, color: level.color }))
  )
}

/* ===== 蓝桥杯年份折叠 ===== */
const lanqiaoExpanded = ref(new Set(['2026']))

function toggleLanqiaoYear(year) {
  if (lanqiaoExpanded.value.has(year)) {
    lanqiaoExpanded.value.delete(year)
  } else {
    lanqiaoExpanded.value.add(year)
  }
  lanqiaoExpanded.value = new Set(lanqiaoExpanded.value)
}

// 扁平列表：年份头 + 条目交替，单层 v-for 避开 SSR 嵌套限制
const lanqiaoFlatList = (() => {
  const list = []
  for (const sec of (awards['蓝桥杯'].sections || [])) {
    const items = sec.levels ? sec.levels.flatMap(level =>
      level.items.map(item => ({ ...item, award: level.label, color: level.color }))
    ) : []
    list.push({ _type: 'year', _key: `y-${sec.year}`, _count: items.length, year: sec.year })
    for (let i = 0; i < items.length; i++) {
      list.push({ ...items[i], _type: 'item', _key: `i-${sec.year}-${i}` })
    }
  }
  return list
})()

// 蓝桥杯汇总统计（跨年份聚合）
const lanqiaoSummary = (() => {
  const labelOrder = ['🥇 国一', '🥈 国二', '🥉 国三', '省一', '省二', '省三']
  const colorMap = { '🥇 国一': 'gold', '🥈 国二': 'silver', '🥉 国三': 'bronze', '省一': 'iron', '省二': 'iron', '省三': 'iron' }
  const merged = {}
  for (const label of labelOrder) merged[label] = { label, color: colorMap[label], count: 0 }
  for (const sec of (awards['蓝桥杯'].sections || [])) {
    for (const level of (sec.levels || [])) {
      if (merged[level.label]) merged[level.label].count += level.items.length
    }
  }
  return labelOrder.map(l => merged[l])
})()

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
        <span class="award-check-icon" v-html="level.items.length ? achievedSvg : unachievedSvg"></span>
      </div>
      <div class="award-level-items">
        <div class="award-count-num">{{ level.items.length || 0 }}</div>
      </div>
    </div>
  </div>

  <div v-show="flatItems(awards.ICPC).length" class="award-table-section">
    <table class="award-table">
        <colgroup><col class="at-year"><col class="at-comp"><col class="at-members"><col class="at-award"></colgroup>
        <thead><tr><th class="at-year">年份</th><th class="at-comp">比赛名称</th><th class="at-members">队员</th><th class="at-award">奖项</th></tr></thead>
        <tbody>
          <tr v-for="(item, idx) in flatItems(awards.ICPC)" :key="idx">
            <td class="at-year">{{ item.year }}</td>
            <td class="at-comp">{{ item.competition }}</td>
            <td class="at-members">{{ item.members }}</td>
            <td class="at-award"><span class="award-tag" :class="levelClass(item.color)">{{ item.award }}</span></td>
          </tr>
        </tbody>
      </table>
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
        <span class="award-check-icon" v-html="level.items.length ? achievedSvg : unachievedSvg"></span>
      </div>
      <div class="award-level-items">
        <div class="award-count-num">{{ level.items.length || 0 }}</div>
      </div>
    </div>
  </div>

  <div v-show="flatItems(awards.CCPC).length" class="award-table-section">
    <table class="award-table">
        <colgroup><col class="at-year"><col class="at-comp"><col class="at-members"><col class="at-award"></colgroup>
        <thead><tr><th class="at-year">年份</th><th class="at-comp">比赛名称</th><th class="at-members">队员</th><th class="at-award">奖项</th></tr></thead>
        <tbody>
          <tr v-for="(item, idx) in flatItems(awards.CCPC)" :key="idx">
            <td class="at-year">{{ item.year }}</td>
            <td class="at-comp">{{ item.competition }}</td>
            <td class="at-members">{{ item.members }}</td>
            <td class="at-award"><span class="award-tag" :class="levelClass(item.color)">{{ item.award }}</span></td>
          </tr>
        </tbody>
      </table>
  </div>
</div>

<div class="award-section" v-show="activeTab === '蓝桥杯'">
  <div class="award-section-head">
    <img src="/images/lanqiao-logo.png" alt="蓝桥杯" class="award-logo" />
    <span class="award-section-title">{{ awards['蓝桥杯'].title }}</span>
  </div>

  <!-- 总体统计卡片（跨年份汇总） -->
  <div class="award-levels-grid">
    <div class="award-level-col" v-for="level in lanqiaoSummary" :key="level.label">
      <div class="award-level-head" :class="levelClass(level.color)">
        {{ level.label }}
        <span class="award-check-icon" v-html="level.count ? achievedSvg : unachievedSvg"></span>
      </div>
      <div class="award-level-items">
        <div class="award-count-num">{{ level.count || 0 }}</div>
      </div>
    </div>
  </div>

  <!-- 按年份分组（扁平列表，单层 v-for，避开 SSR 嵌套限制） -->
  <div v-for="entry in lanqiaoFlatList" :key="entry._key" :class="entry._type === 'year' ? 'lanqiao-year-section' : ''">
    <div v-if="entry._type === 'year'" class="lanqiao-year-header" @click="toggleLanqiaoYear(entry.year)">
      <span class="lanqiao-year-arrow">{{ lanqiaoExpanded.has(entry.year) ? '▼' : '▶' }}</span>
      <span class="lanqiao-year-label">{{ entry.year }} 年</span>
      <span class="lanqiao-year-count">{{ entry._count }} 人获奖</span>
    </div>
    <div v-else-if="lanqiaoExpanded.has(entry.year)" class="award-table-row">
      <span class="at-year">{{ entry.year }}</span>
      <span class="at-comp">{{ entry.competition }}</span>
      <span class="at-members">{{ entry.members }}</span>
      <span class="at-award"><span class="award-tag" :class="levelClass(entry.color)">{{ entry.award }}</span></span>
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
          <span class="award-check-icon" v-html="level.items.length ? achievedSvg : unachievedSvg"></span>
        </div>
        <div class="award-level-items">
          <div class="award-count-num">{{ level.items.length || 0 }}</div>
        </div>
      </div>
    </div>
  </div>

  <div v-show="flatItems(awards['天梯赛']).length" class="award-table-section">
    <table class="award-table">
        <colgroup><col class="at-year"><col class="at-comp"><col class="at-members"><col class="at-award"></colgroup>
        <thead><tr><th class="at-year">年份</th><th class="at-comp">比赛名称</th><th class="at-members">队员</th><th class="at-award">奖项</th></tr></thead>
        <tbody>
          <tr v-for="(item, idx) in flatItems(awards['天梯赛'])" :key="idx">
            <td class="at-year">{{ item.year }}</td>
            <td class="at-comp">{{ item.competition }}</td>
            <td class="at-members">{{ item.members }}</td>
            <td class="at-award"><span class="award-tag" :class="levelClass(item.color)">{{ item.award }}</span></td>
          </tr>
        </tbody>
      </table>
  </div>
</div>

</div>

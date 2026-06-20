---
layout: page
---

<script setup>
import { ref, computed } from 'vue'

// ============================================================
// 「团队成员」数据 —— 直接修改此数组即可增删成员
// 新增成员：在对应届数的 members 数组中添加一个对象
// ============================================================
const generations = [
  {
    year: '2026 级',
    members: [
      {
        name: '张三',
        avatar: '',
        role: '队长',
        major: '计算机科学与技术',
        grade: '2024 级',
        achievements: 'ICPC 亚洲区域赛银牌，Codeforces Expert (1800+)',
        links: {
          github: 'https://github.com',
          cf: 'https://codeforces.com',
        },
      },
      {
        name: '李四',
        avatar: '',
        role: '副队长',
        major: '软件工程',
        grade: '2024 级',
        achievements: 'CCPC 省赛金牌，蓝桥杯省赛一等奖',
        links: {
          github: 'https://github.com',
        },
      },
      {
        name: '王五',
        avatar: '',
        role: '队员',
        major: '计算机科学与技术',
        grade: '2025 级',
        achievements: '洛谷蓝名，CF Pupil',
        links: {},
      },
      {
        name: '赵六',
        avatar: '',
        role: '队员',
        major: '人工智能',
        grade: '2025 级',
        achievements: '零基础加入，刻苦训练进步飞速',
        links: {},
      },
    ],
  },
  // 后续届数在此添加，格式同上
  // {
  //   year: '2027 级',
  //   members: [ ... ],
  // },
]

// 统计
const totalMembers = computed(() => {
  return generations.reduce((sum, g) => sum + g.members.length, 0)
})
</script>

# 👥 集训队成员

<div class="team-section">

<p class="team-intro">
XAUAT ACM 集训队汇聚了全校最优秀的算法竞赛选手。目前共有 <strong>{{ totalMembers }}</strong> 名成员，按入学年份分组。
</p>

<!-- 统计条 -->
<div class="team-stats-bar">
  <div class="team-stat">
    <span class="team-stat-num">{{ totalMembers }}</span>
    <span class="team-stat-label">现役队员</span>
  </div>
  <div class="team-stat">
    <span class="team-stat-num">{{ generations.length }}</span>
    <span class="team-stat-label">涵盖年级</span>
  </div>
</div>

<!-- 按届数分组 -->
<div v-for="gen in generations" :key="gen.year" class="team-generation">
  <h2 class="gen-title">{{ gen.year }}</h2>
  <div class="member-grid">
    <div v-for="member in gen.members" :key="member.name" class="member-card">
      <div class="member-avatar">
        <span v-if="!member.avatar">{{ member.name.charAt(0) }}</span>
        <img v-else :src="member.avatar" :alt="member.name" />
      </div>
      <div class="member-info">
        <div class="member-name">
          {{ member.name }}
          <span class="member-role" :class="member.role">{{ member.role }}</span>
        </div>
        <div class="member-detail">{{ member.major }} · {{ member.grade }}</div>
        <div class="member-achievements" v-if="member.achievements">{{ member.achievements }}</div>
        <div class="member-links" v-if="Object.keys(member.links).length">
          <a v-if="member.links.github" :href="member.links.github" target="_blank" class="member-link" title="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a v-if="member.links.cf" :href="member.links.cf" target="_blank" class="member-link" title="Codeforces">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><text x="2" y="18" font-size="14" font-weight="bold" fill="currentColor">CF</text></svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- 空状态 -->
<div v-if="generations.length === 0" class="team-empty">
  <p>暂无成员数据，期待你的加入！</p>
</div>

</div>

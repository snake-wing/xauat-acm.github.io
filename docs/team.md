---
sidebar: false
aside: true
---

<script setup>
import { ref } from 'vue'

const generations = [
  {
    year: '2024 级',
    members: [
      {
        grade: '2024级',
        name: '张三',
        department: '计算机科学与技术',
        status: '现役',
        graduation: '-',
        contact: { github: 'https://github.com/zhangsan', cf: 'https://codeforces.com/profile/zhangsan' },
      },
      {
        grade: '2024级',
        name: '李四',
        department: '软件工程',
        status: '现役',
        graduation: '-',
        contact: { github: 'https://github.com/lisi', blog: 'https://lisi.dev' },
      },
    ],
  },
  {
    year: '2025 级',
    members: [
      {
        grade: '2025级',
        name: '王五',
        department: '计算机科学与技术',
        status: '现役',
        graduation: '-',
        contact: { cf: 'https://codeforces.com/profile/wangwu' },
      },
      {
        grade: '2025级',
        name: '赵六',
        department: '人工智能',
        status: '现役',
        graduation: '-',
        contact: {},
      },
    ],
  },
  {
    year: '已毕业',
    members: [
      {
        grade: '2020级',
        name: '前辈A',
        department: '计算机科学与技术',
        status: '退役',
        graduation: '腾讯 · 后端开发',
        contact: { github: 'https://github.com/senior-a' },
      },
    ],
  },
]

const collapsed = ref({})
function toggle(year) {
  collapsed.value[year] = !collapsed.value[year]
}
function isCollapsed(year) {
  return !!collapsed.value[year]
}
</script>

# 👥 集训队成员

<div class="team-section">

<div class="team-table-wrapper" v-for="gen in generations" :key="gen.year">
  <div class="team-group-header" @click="toggle(gen.year)">
    <span class="team-arrow" :class="{ collapsed: isCollapsed(gen.year) }">▾</span>
    <span class="team-group-year">{{ gen.year }}</span>
    <span class="team-group-count">{{ gen.members.length }} 人</span>
  </div>

  <div class="team-table" v-show="!isCollapsed(gen.year)">
    <div class="team-table-head">
      <span class="col-grade">年级</span>
      <span class="col-name">姓名</span>
      <span class="col-dept">学院/专业</span>
      <span class="col-status">状态</span>
      <span class="col-grad">毕业去向</span>
      <span class="col-contact">联系方式</span>
    </div>
    <div class="team-table-row" v-for="m in gen.members" :key="m.name">
      <span class="col-grade">{{ m.grade }}</span>
      <span class="col-name">{{ m.name }}</span>
      <span class="col-dept">{{ m.department }}</span>
      <span class="col-status">
        <span class="status-tag" :class="m.status === '现役' ? 'active' : 'retired'">{{ m.status }}</span>
      </span>
      <span class="col-grad">{{ m.graduation }}</span>
      <span class="col-contact">
        <a v-if="m.contact.github" :href="m.contact.github" target="_blank" class="contact-link" title="GitHub">GH</a>
        <a v-if="m.contact.cf" :href="m.contact.cf" target="_blank" class="contact-link" title="Codeforces">CF</a>
        <a v-if="m.contact.blog" :href="m.contact.blog" target="_blank" class="contact-link" title="Blog">📝</a>
      </span>
    </div>
    <div class="team-empty-row" v-if="gen.members.length === 0">暂无成员</div>
  </div>
</div>

</div>

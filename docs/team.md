---
sidebar: false
aside: true
---

<!--
  ============================================================
  添加新成员：在下方 generations 数组中找到对应年级，
  在 members 数组末尾追加对象即可。
  字段：grade(年级) name(姓名) department(学院/专业)
        status(现役/退役) graduation(毕业去向，现役填 '-')
        contact: { github, cf, blog } 可选
  ============================================================
-->

<script setup>
import { ref } from 'vue'

const generations = [
  {
    year: '2025 级',
    members: [
      { grade: '2025 级', name: '张三', department: '计算机科学与技术', status: '现役', graduation: '-', contact: { github: 'https://github.com/zhangsan', cf: 'https://codeforces.com/profile/zhangsan' } },
      { grade: '2025 级', name: '李四', department: '软件工程', status: '现役', graduation: '-', contact: { github: 'https://github.com/lisi', blog: 'https://lisi.dev' } },
    ],
  },
  {
    year: '2024 级',
    members: [
      { grade: '2024 级', name: '王五', department: '计算机科学与技术', status: '现役', graduation: '-', contact: { cf: 'https://codeforces.com/profile/wangwu' } },
      { grade: '2024 级', name: '赵六', department: '人工智能', status: '现役', graduation: '-', contact: {} },
    ],
  },
  {
    year: '2023 级',
    members: [
      { grade: '2023 级', name: '前辈A', department: '计算机科学与技术', status: '退役', graduation: '腾讯 · 后端开发', contact: { github: 'https://github.com/senior-a' } },
      { grade: '2023 级', name: '前辈B', department: '软件工程', status: '退役', graduation: '字节跳动 · 前端开发', contact: { github: 'https://github.com/senior-b', blog: 'https://senior-b.dev' } },
    ],
  },
]

// 默认只展开 2025 级，其他折叠
const collapsed = ref({
  '2024 级': true,
  '2023 级': true,
})

function toggle(year) {
  collapsed.value[year] = !collapsed.value[year]
}

function isCollapsed(year) {
  return !!collapsed.value[year]
}
</script>

<h1 class="team-page-title">ACM 集训队成员名单</h1>

<div class="team-section">

<div class="team-group" v-for="gen in generations" :key="gen.year">

  <div class="team-grade-bar" :class="{ 'collapsed-bar': isCollapsed(gen.year) }" @click="toggle(gen.year)">
    <span class="team-grade-year">{{ gen.year }}</span>
    <span class="team-grade-count">{{ gen.members.length }} 人</span>
    <span class="team-grade-arrow" :class="{ collapsed: isCollapsed(gen.year) }">&#9660;</span>
  </div>

  <div class="team-table-wrapper" v-show="!isCollapsed(gen.year)">
    <table class="team-table">
      <thead>
        <tr>
          <th>年级</th>
          <th>姓名</th>
          <th>学院 / 专业</th>
          <th>状态</th>
          <th>毕业去向</th>
          <th>联系方式</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="m in gen.members" :key="m.name">
          <td>{{ m.grade }}</td>
          <td>{{ m.name }}</td>
          <td>{{ m.department }}</td>
          <td>
            <span class="status-tag" :class="m.status === '现役' ? 'active' : 'retired'">{{ m.status }}</span>
          </td>
          <td>{{ m.graduation }}</td>
          <td class="col-contact">
            <a v-if="m.contact.github" :href="m.contact.github" target="_blank">GitHub</a>
            <template v-if="m.contact.github && m.contact.cf"> / </template>
            <a v-if="m.contact.cf" :href="m.contact.cf" target="_blank">Codeforces</a>
            <template v-if="(m.contact.github || m.contact.cf) && m.contact.blog"> / </template>
            <a v-if="m.contact.blog" :href="m.contact.blog" target="_blank">Blog</a>
            <span v-if="!m.contact.github && !m.contact.cf && !m.contact.blog">-</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</div>

</div>

<style>
/* 全局重置 */
.team-section,
.team-section * {
  box-sizing: border-box;
}

/* 页面标题 */
.team-page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c2c2c;
  margin: 0 0 1.5rem 0;
  text-align: left;
  letter-spacing: 0.5px;
}

/* 年级分组 */
.team-group {
  width: 100%;
  margin-bottom: 1rem;
}

.team-group:first-child {
  margin-top: 0;
}

/* 年级折叠栏 */
.team-grade-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, rgba(73,177,245,0.08), rgba(73,177,245,0.03));
  border: 1px solid rgba(73,177,245,0.2);
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s;
}

.team-grade-bar:hover {
  background: linear-gradient(135deg, rgba(73,177,245,0.12), rgba(73,177,245,0.05));
  border-color: rgba(73,177,245,0.3);
  transform: translateY(-1px);
}

/* 折叠状态 */
.team-grade-bar.collapsed-bar {
  border-radius: 10px;
  background: #f8f8f8;
  border-color: #e8e8e8;
}

.team-grade-bar.collapsed-bar:hover {
  background: #f0f0f0;
}

.team-grade-year {
  font-size: 1rem;
  font-weight: 700;
  color: #49b1f5;
}

.team-grade-bar.collapsed-bar .team-grade-year {
  color: #555;
}

.team-grade-count {
  font-size: 0.78rem;
  color: #999;
  background: rgba(0,0,0,0.05);
  padding: 0.15rem 0.5rem;
  border-radius: 10px;
}

.team-grade-arrow {
  font-size: 0.7rem;
  color: #999;
  transition: transform 0.2s;
  margin-left: auto;
}

.team-grade-arrow.collapsed {
  transform: rotate(-90deg);
}

/* 表格容器 */
.team-table-wrapper {
  margin-top: 0.5rem;
}

/* 表格 — 覆写 VitePress 对 table 的 display: block */
.team-table {
  display: table !important;
  width: 100% !important;
  border-collapse: collapse;
  table-layout: fixed;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif;
  font-size: 0.86rem;
  color: #333;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  overflow: hidden;
}

/* 列宽 */
.team-table th:nth-child(1),
.team-table td:nth-child(1) { width: 12%; }

.team-table th:nth-child(2),
.team-table td:nth-child(2) { width: 13%; }

.team-table th:nth-child(3),
.team-table td:nth-child(3) { width: 25%; }

.team-table th:nth-child(4),
.team-table td:nth-child(4) { width: 10%; }

.team-table th:nth-child(5),
.team-table td:nth-child(5) { width: 22%; }

.team-table th:nth-child(6),
.team-table td:nth-child(6) { width: 18%; }

/* 表头 */
.team-table thead th {
  background: #f8f8f8;
  color: #555;
  font-weight: 600;
  text-align: left;
  padding: 0.7rem 1rem;
  border-bottom: 2px solid #e8e8e8;
  font-size: 0.8rem;
  letter-spacing: 0.3px;
}

/* 数据行 */
.team-table tbody td {
  background: #fff;
  text-align: left;
  padding: 0.6rem 1rem;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: middle;
  font-size: 0.86rem;
}

.team-table tbody tr:hover td {
  background: rgba(73,177,245,0.03);
}

.team-table tbody tr:last-child td {
  border-bottom: none;
}

/* 联系方式 */
.col-contact a {
  color: #666;
  text-decoration: none;
  font-size: 0.82rem;
  transition: color 0.15s;
}

.col-contact a:hover {
  color: #49b1f5;
}

/* 状态标签 */
.status-tag {
  display: inline-block;
  padding: 0.18rem 0.6rem;
  border-radius: 10px;
  font-size: 0.76rem;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.3px;
}

.status-tag.active {
  background: rgba(45,138,78,0.12);
  color: #2d8a4e;
}

.status-tag.retired {
  background: #f0f0f0;
  color: #888;
}
</style>

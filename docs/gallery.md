---
layout: page
---

<script setup>
import { ref } from 'vue'

// ============================================================
// 「获奖瞬间」照片墙数据 —— 直接修改此数组即可
// 照片放入 docs/public/images/gallery/ 目录
// 引用时路径为 /images/gallery/文件名
// ============================================================
const photos = [
  // 示例数据，请替换为真实照片
  // {
  //   src: '/images/gallery/photo1.jpg',
  //   title: '2026 ICPC 区域赛现场',
  //   date: '2026-12',
  //   desc: '西安站比赛现场，队员们紧张答题中',
  // },
  // {
  //   src: '/images/gallery/photo2.jpg',
  //   title: '暑期集训合影',
  //   date: '2026-08',
  //   desc: '2026 年暑期集训圆满结束',
  // },
  // {
  //   src: '/images/gallery/photo3.jpg',
  //   title: '算法讲堂',
  //   date: '2026-10',
  //   desc: '学长正在讲解动态规划专题',
  // },
]
</script>

# 📸 获奖瞬间

<div class="gallery-section">

<p class="gallery-intro">
记录协会在各项赛事中的精彩时刻和日常训练的难忘瞬间。
</p>

<!-- 照片网格 -->
<div class="gallery-grid" v-if="photos.length > 0">
  <div v-for="(photo, idx) in photos" :key="idx" class="gallery-item">
    <img :src="photo.src" :alt="photo.title" class="gallery-img" loading="lazy" />
    <div class="gallery-overlay">
      <div class="gallery-title">{{ photo.title }}</div>
      <div class="gallery-date">{{ photo.date }}</div>
      <div class="gallery-desc" v-if="photo.desc">{{ photo.desc }}</div>
    </div>
  </div>
</div>

<!-- 空状态 —— 使用占位图片展示布局效果 -->
<div v-else class="gallery-placeholder">
  <div class="gallery-empty-msg">
    <div class="gallery-empty-icon">📷</div>
    <p>暂无照片，期待第一张精彩瞬间！</p>
    <p class="gallery-empty-hint">
      将照片放入 <code>docs/public/images/gallery/</code> 目录，
      然后在 <code>gallery.md</code> 的 <code>photos</code> 数组中添加照片信息即可。
    </p>
  </div>

  <!-- 布局预览 -->
  <div class="gallery-preview-grid">
    <div v-for="i in 6" :key="i" class="gallery-item gallery-item-placeholder">
      <div class="placeholder-img">🖼️</div>
      <div class="gallery-overlay">
        <div class="gallery-title">示例照片 {{ i }}</div>
        <div class="gallery-date">2026-XX</div>
      </div>
    </div>
  </div>
</div>

</div>

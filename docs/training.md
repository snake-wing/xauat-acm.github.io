---
title: 训练平台
aside: true
---

<script setup>
import ContestBoard from './.vitepress/theme/components/ContestBoard.vue'
import { withBase } from 'vitepress'
</script>

<div class="training-page">

# 训练平台

一站式聚合算法竞赛训练资源，快捷直达各大在线评测平台，实时掌握近期比赛动态。

---

## 🧭 在线评测平台

<div class="platform-grid">

<a class="platform-card" href="https://codeforces.com" target="_blank" rel="noopener" style="--pc: #1f8acb">
  <div class="pc-icon">
    <img :src="withBase('/icons/codeforces.png')" alt="Codeforces" class="pc-logo">
  </div>
  <div class="pc-body">
    <span class="pc-name">Codeforces</span>
    <span class="pc-desc">全球最大算法竞赛平台 · Div.1~4 各级别周赛</span>
  </div>
  <span class="pc-arrow">→</span>
</a>

<a class="platform-card" href="https://atcoder.jp" target="_blank" rel="noopener" style="--pc: #1a1a1a">
  <div class="pc-icon">
    <img :src="withBase('/icons/atcoder.png')" alt="AtCoder" class="pc-logo">
  </div>
  <div class="pc-body">
    <span class="pc-name">AtCoder</span>
    <span class="pc-desc">日本顶级算法平台 · ABC/ARC/AGC 系列赛</span>
  </div>
  <span class="pc-arrow">→</span>
</a>

<a class="platform-card" href="https://ac.nowcoder.com" target="_blank" rel="noopener" style="--pc: #5cb85c">
  <div class="pc-icon">
    <img :src="withBase('/icons/nowcoder.png')" alt="牛客" class="pc-logo">
  </div>
  <div class="pc-body">
    <span class="pc-name">牛客竞赛</span>
    <span class="pc-desc">国内最大 IT 校招+竞赛平台 · 小白月赛/周赛/多校</span>
  </div>
  <span class="pc-arrow">→</span>
</a>

<a class="platform-card" href="https://www.luogu.com.cn" target="_blank" rel="noopener" style="--pc: #e67e22">
  <div class="pc-icon">
    <img :src="withBase('/icons/luogu.png')" alt="洛谷" class="pc-logo">
  </div>
  <div class="pc-body">
    <span class="pc-name">洛谷</span>
    <span class="pc-desc">中文算法社区 · 海量题单/模板/题解/日报</span>
  </div>
  <span class="pc-arrow">→</span>
</a>

<a class="platform-card" href="https://acm.hdu.edu.cn" target="_blank" rel="noopener" style="--pc: #1a6fb5">
  <div class="pc-icon">
    <img :src="withBase('/icons/hdu.svg')" alt="HDU OJ" class="pc-logo-hdu">
  </div>
  <div class="pc-body">
    <span class="pc-name">HDU OJ</span>
    <span class="pc-desc">杭州电子科技大学 OJ · 老牌经典题库/题解丰富</span>
  </div>
  <span class="pc-arrow">→</span>
</a>

<a class="platform-card" href="https://www.acwing.com" target="_blank" rel="noopener" style="--pc: #2ecc71">
  <div class="pc-icon">
    <img :src="withBase('/icons/acwing.png')" alt="AcWing" class="pc-logo">
  </div>
  <div class="pc-body">
    <span class="pc-name">AcWing</span>
    <span class="pc-desc">算法课程体系完善 · 从入门到进阶系统学习</span>
  </div>
  <span class="pc-arrow">→</span>
</a>

</div>

---

## 📡 近期比赛

> 数据来自 **Codeforces** · **AtCoder** · **牛客** · **洛谷** 四大平台 API，每 30 秒自动刷新。
> 点击比赛名称即可直达参赛页面。难度参考星级 (★) 基于赛制与历史难度分析。

<ContestBoard />

</div>

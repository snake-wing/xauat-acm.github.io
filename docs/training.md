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
    <img :src="withBase('/icons/codeforces.ico')" alt="Codeforces" class="pc-logo"
         @error="$event.target.style.display='none';$event.target.nextElementSibling.style.display='block'">
    <svg class="pc-logo-fb" style="display:none" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" fill="#1f8acb" opacity=".12"/>
      <rect x="9" y="14" width="5" height="20" rx="1.5" fill="#1f8acb"/>
      <rect x="17" y="10" width="5" height="28" rx="1.5" fill="#1f8acb"/>
      <rect x="25" y="18" width="5" height="18" rx="1.5" fill="#1f8acb"/>
    </svg>
  </div>
  <div class="pc-body">
    <span class="pc-name">Codeforces</span>
    <span class="pc-desc">全球最大算法竞赛平台 · Div.1~4 各级别周赛</span>
  </div>
  <span class="pc-arrow">→</span>
</a>

<a class="platform-card" href="https://atcoder.jp" target="_blank" rel="noopener" style="--pc: #1a1a1a">
  <div class="pc-icon">
    <img :src="withBase('/icons/atcoder.ico')" alt="AtCoder" class="pc-logo"
         @error="$event.target.style.display='none';$event.target.nextElementSibling.style.display='block'">
    <svg class="pc-logo-fb" style="display:none" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" fill="#1a1a1a" opacity=".08"/>
      <path d="M16 30l6-18 6 18" stroke="#1a1a1a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="13" y1="24" x2="35" y2="24" stroke="#1a1a1a" stroke-width="2" stroke-linecap="round"/>
    </svg>
  </div>
  <div class="pc-body">
    <span class="pc-name">AtCoder</span>
    <span class="pc-desc">日本顶级算法平台 · ABC/ARC/AGC 系列赛</span>
  </div>
  <span class="pc-arrow">→</span>
</a>

<a class="platform-card" href="https://ac.nowcoder.com" target="_blank" rel="noopener" style="--pc: #5cb85c">
  <div class="pc-icon">
    <img :src="withBase('/icons/nowcoder.ico')" alt="牛客" class="pc-logo"
         @error="$event.target.style.display='none';$event.target.nextElementSibling.style.display='block'">
    <svg class="pc-logo-fb" style="display:none" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" fill="#5cb85c" opacity=".12"/>
      <polyline points="12,32 18,24 24,28 30,18 36,20" stroke="#5cb85c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="30" cy="18" r="2" fill="#5cb85c"/>
    </svg>
  </div>
  <div class="pc-body">
    <span class="pc-name">牛客竞赛</span>
    <span class="pc-desc">国内最大 IT 校招+竞赛平台 · 小白月赛/周赛/多校</span>
  </div>
  <span class="pc-arrow">→</span>
</a>

<a class="platform-card" href="https://www.luogu.com.cn" target="_blank" rel="noopener" style="--pc: #e67e22">
  <div class="pc-icon">
    <img :src="withBase('/icons/luogu.ico')" alt="洛谷" class="pc-logo"
         @error="$event.target.style.display='none';$event.target.nextElementSibling.style.display='block'">
    <svg class="pc-logo-fb" style="display:none" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" fill="#e67e22" opacity=".12"/>
      <polygon points="24,8 8,34 40,34" fill="#e67e22" opacity=".3"/>
      <polyline points="16,28 24,18 32,28" stroke="#e67e22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>
  </div>
  <div class="pc-body">
    <span class="pc-name">洛谷</span>
    <span class="pc-desc">中文算法社区 · 海量题单/模板/题解/日报</span>
  </div>
  <span class="pc-arrow">→</span>
</a>

<a class="platform-card" href="https://vjudge.net" target="_blank" rel="noopener" style="--pc: #e74c3c">
  <div class="pc-icon">
    <img :src="withBase('/icons/vjudge.ico')" alt="Virtual Judge" class="pc-logo"
         @error="$event.target.style.display='none';$event.target.nextElementSibling.style.display='block'">
    <svg class="pc-logo-fb" style="display:none" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" fill="#e74c3c" opacity=".12"/>
      <line x1="24" y1="30" x2="24" y2="12" stroke="#e74c3c" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="14" y1="18" x2="34" y2="18" stroke="#e74c3c" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="14" cy="18" r="4" stroke="#e74c3c" stroke-width="2" fill="none"/>
      <circle cx="34" cy="18" r="4" stroke="#e74c3c" stroke-width="2" fill="none"/>
    </svg>
  </div>
  <div class="pc-body">
    <span class="pc-name">Virtual Judge</span>
    <span class="pc-desc">多 OJ 聚合虚拟裁判 · 团队训练赛/补题神器</span>
  </div>
  <span class="pc-arrow">→</span>
</a>

<a class="platform-card" href="https://www.acwing.com" target="_blank" rel="noopener" style="--pc: #2ecc71">
  <div class="pc-icon">
    <img :src="withBase('/icons/acwing.ico')" alt="AcWing" class="pc-logo"
         @error="$event.target.style.display='none';$event.target.nextElementSibling.style.display='block'">
    <svg class="pc-logo-fb" style="display:none" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" fill="#2ecc71" opacity=".12"/>
      <path d="M14 34V18l10 5 10-5v16l-10-5-10 5z" fill="#2ecc71" opacity=".3"/>
      <polyline points="14,18 24,23 34,18" stroke="#2ecc71" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="24" y1="23" x2="24" y2="34" stroke="#2ecc71" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
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

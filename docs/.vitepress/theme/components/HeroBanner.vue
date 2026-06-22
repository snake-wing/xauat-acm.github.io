<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const { page } = useData()

// 判断首页（Splash 只在首页显示）
const isHome = computed(() => {
  const rp = page.value?.relativePath || ''
  return rp === 'index.md' || rp === ''
})

// 遮罩状态
const dismissed = ref(false)
const leaving = ref(false)
const SPLASH_KEY = 'xauat-acm-splash-dismissed'

// 页面加载时检查是否已关闭过
onMounted(() => {
  if (!isHome.value) return
  if (typeof sessionStorage !== 'undefined') {
    if (sessionStorage.getItem(SPLASH_KEY) === '1') {
      dismissed.value = true
    }
  }
})

// 点击 Enter
function onEnter() {
  leaving.value = true
  // 等待动画结束
  setTimeout(() => {
    dismissed.value = true
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(SPLASH_KEY, '1')
    }
  }, 600)
}

// Typed.js 打字机效果
const typedEl = ref<HTMLElement | null>(null)
let typed: any = null

onMounted(() => {
  if (!isHome.value || dismissed.value || typeof window === 'undefined') return
  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/typed.js@2.1.0/dist/typed.umd.min.js'
  script.onload = () => {
    if (typedEl.value && (window as any).Typed) {
      typed = new (window as any).Typed(typedEl.value, {
        strings: [
          'Talk is cheap, let\'s code!',
          'just enjoy it!',
          'coding changes the world!',
          '算法改变世界，代码书写未来',
          '欢迎加入 XAUAT ACM 协会',
        ],
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 2000,
        startDelay: 800,
        loop: true,
        showCursor: true,
        cursorChar: '|',
      })
    }
  }
  document.head.appendChild(script)
})

onUnmounted(() => {
  if (typed) typed.destroy()
})
</script>

<template>
  <!-- Splash 遮罩：仅在首页且未关闭时显示 -->
  <Teleport to="body">
    <div
      v-if="isHome && !dismissed"
      class="splash-overlay"
      :class="{ 'splash-leaving': leaving }"
    >
      <!-- 背景浮动光斑 -->
      <div class="splash-orb orb-1"></div>
      <div class="splash-orb orb-2"></div>
      <div class="splash-orb orb-3"></div>

      <!-- 网格纹理 -->
      <div class="splash-grid"></div>

      <!-- 主内容 -->
      <div class="splash-content">
        <!-- Logo 光环 -->
        <div class="splash-logo-ring">
          <img src="/favicon.png" alt="XAUAT ACM" class="splash-logo-img" />
        </div>

        <h1 class="splash-title">XAUAT ACM</h1>
        <p class="splash-subtitle">西安建筑科技大学 ACM 协会</p>

        <!-- 打字机标语 -->
        <div class="splash-typed">
          <span ref="typedEl"></span>
        </div>

        <p class="splash-desc">算法竞赛 · 编程训练 · 技术交流 · 以赛促学</p>

        <!-- Enter 按钮 -->
        <button class="splash-enter" @click="onEnter">
          <span class="splash-enter-text">Enter</span>
          <span class="splash-enter-arrow">→</span>
        </button>
      </div>

      <!-- 底部建筑剪影 -->
      <svg class="splash-skyline" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <rect x="0" y="60" width="60" height="60" opacity="0.12"/>
        <rect x="70" y="40" width="50" height="80" opacity="0.17"/>
        <rect x="130" y="50" width="70" height="70" opacity="0.1"/>
        <rect x="210" y="30" width="55" height="90" opacity="0.15"/>
        <rect x="280" y="55" width="80" height="65" opacity="0.11"/>
        <rect x="370" y="35" width="45" height="85" opacity="0.19"/>
        <rect x="430" y="65" width="65" height="55" opacity="0.08"/>
        <rect x="510" y="25" width="60" height="95" opacity="0.17"/>
        <rect x="580" y="48" width="75" height="72" opacity="0.11"/>
        <rect x="670" y="38" width="50" height="82" opacity="0.14"/>
        <rect x="740" y="58" width="70" height="62" opacity="0.09"/>
        <rect x="820" y="20" width="55" height="100" opacity="0.2"/>
        <rect x="890" y="45" width="80" height="75" opacity="0.13"/>
        <rect x="980" y="55" width="60" height="65" opacity="0.1"/>
        <rect x="1050" y="28" width="65" height="92" opacity="0.16"/>
        <rect x="1130" y="50" width="75" height="70" opacity="0.12"/>
        <rect x="1210" y="35" width="55" height="85" opacity="0.14"/>
        <rect x="1280" y="60" width="70" height="60" opacity="0.08"/>
        <rect x="1360" y="42" width="80" height="78" opacity="0.11"/>
        <path d="M0 120 L1440 120 L1440 90 Q1200 30 720 70 Q240 40 0 80 Z" opacity="0.06"/>
      </svg>
    </div>
  </Teleport>
</template>

<style scoped>
/* ===== Splash 全屏遮罩 ===== */
.splash-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    170deg,
    #0f2b4a 0%,
    #1a4a6f 15%,
    #2d6a9f 28%,
    #5b8cb8 40%,
    #c4a882 55%,
    #e8d5b7 68%,
    #f5e6d3 80%,
    #faf6f0 100%
  );
  overflow: hidden;
  text-align: center;
  color: #fff;
  animation: splash-in 0.8s ease;
}

/* 入场动画 */
@keyframes splash-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

/* 退场动画 */
.splash-leaving {
  animation: splash-out 0.6s ease forwards;
  pointer-events: none;
}

@keyframes splash-out {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-100%);
  }
}

/* 暗色模式 */
html.dark .splash-overlay {
  background: linear-gradient(
    170deg,
    #060e1a 0%,
    #0d1f33 15%,
    #1a3350 28%,
    #2a4a6a 40%,
    #3a3a3a 55%,
    #2a2a30 68%,
    #1e1e28 80%,
    #1a1a22 100%
  );
}

/* ===== 浮动光斑 ===== */
.splash-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
  animation: orb-float 12s ease-in-out infinite;
}
.orb-1 {
  width: 300px; height: 300px;
  background: rgba(255, 200, 120, 0.25);
  right: -60px; top: 10%;
  animation-delay: 0s;
}
.orb-2 {
  width: 250px; height: 250px;
  background: rgba(180, 220, 255, 0.2);
  left: -40px; bottom: 25%;
  animation-delay: -4s;
}
.orb-3 {
  width: 200px; height: 200px;
  background: rgba(255, 255, 200, 0.18);
  left: 40%; top: 60%;
  animation-delay: -8s;
}

@keyframes orb-float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25%  { transform: translate(30px, -20px) scale(1.1); }
  50%  { transform: translate(-15px, 25px) scale(0.9); }
  75%  { transform: translate(-25px, -15px) scale(1.05); }
}

/* ===== 网格纹理 ===== */
.splash-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 70%);
}

/* ===== 主内容 ===== */
.splash-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem 1rem;
  animation: content-in 1s 0.2s ease both;
}

@keyframes content-in {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* Logo 光环 */
.splash-logo-ring {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  box-shadow: 0 0 40px rgba(255,255,255,0.2), inset 0 0 20px rgba(255,255,255,0.1);
  animation: logo-glow 3s ease-in-out infinite;
}

@keyframes logo-glow {
  0%, 100% { box-shadow: 0 0 40px rgba(255,255,255,0.2), inset 0 0 20px rgba(255,255,255,0.1); }
  50% { box-shadow: 0 0 60px rgba(255,255,255,0.35), inset 0 0 30px rgba(255,255,255,0.2); }
}

.splash-logo-img {
  width: 66px;
  height: 66px;
  object-fit: contain;
}

.splash-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  letter-spacing: 6px;
  color: #fff;
  text-shadow: 0 2px 20px rgba(0,0,0,0.3);
  margin: 0;
  line-height: 1.2;
  font-family: 'Titillium Web', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.splash-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  font-weight: 400;
  color: rgba(255,255,255,0.85);
  letter-spacing: 4px;
  margin: 0;
}

.splash-typed {
  margin-top: 0.3rem;
  font-size: clamp(0.95rem, 2vw, 1.2rem);
  color: rgba(255,255,255,0.9);
  font-weight: 500;
  min-height: 2rem;
}

/* Typed.js 光标颜色 */
.splash-typed :deep(.typed-cursor) {
  color: rgba(255,255,255,0.8);
}

.splash-desc {
  margin-top: 0.25rem;
  font-size: clamp(0.78rem, 1.5vw, 0.95rem);
  color: rgba(255,255,255,0.6);
  letter-spacing: 2px;
}

/* ===== Enter 按钮 ===== */
.splash-enter {
  margin-top: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 2.5rem;
  background: rgba(255,255,255,0.12);
  border: 2px solid rgba(255,255,255,0.35);
  border-radius: 50px;
  color: #fff;
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: 3px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(4px);
}

.splash-enter:hover {
  background: rgba(255,255,255,0.22);
  border-color: rgba(255,255,255,0.6);
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(255,255,255,0.15);
}

.splash-enter:active {
  transform: scale(0.97);
}

.splash-enter-arrow {
  display: inline-block;
  transition: transform 0.3s ease;
}

.splash-enter:hover .splash-enter-arrow {
  transform: translateX(4px);
}

/* ===== 建筑剪影 ===== */
.splash-skyline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 1;
  pointer-events: none;
}
.splash-skyline rect,
.splash-skyline path {
  fill: #fff;
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .splash-logo-ring { width: 80px; height: 80px; }
  .splash-logo-img { width: 52px; height: 52px; }
  .splash-title { font-size: 2rem; letter-spacing: 3px; }
  .splash-subtitle { font-size: 0.85rem; letter-spacing: 2px; }
  .splash-desc { font-size: 0.72rem; }
  .splash-grid { background-size: 40px 40px; }
  .splash-skyline { display: none; }
  .splash-enter { padding: 0.65rem 2rem; font-size: 1rem; }
}
</style>

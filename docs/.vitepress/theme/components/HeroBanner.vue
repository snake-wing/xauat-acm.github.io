<script setup lang="ts">
import { useData, useRouter, withBase } from 'vitepress'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const { page } = useData()
const router = useRouter()

// 判断首页（Splash 只在首页显示）
const isHome = computed(() => {
  const rp = page.value?.relativePath || ''
  return rp === 'index.md' || rp === ''
})

// 遮罩状态
const leaving = ref(false)

// 点击 Enter：播放退场动画后导航到 /home
function onEnter() {
  leaving.value = true
  setTimeout(() => {
    window.location.href = withBase('/home')
  }, 600)
}

// Typed.js 打字机效果
const typedEl = ref<HTMLElement | null>(null)
let typed: any = null

onMounted(() => {
  if (!isHome.value || typeof window === 'undefined') return
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
      v-if="isHome"
      class="splash-overlay"
      :class="{ 'splash-leaving': leaving }"
    >
      <!-- 背景浮动光斑 -->
      <div class="splash-orb orb-1"></div>
      <div class="splash-orb orb-2"></div>
      <div class="splash-orb orb-3"></div>

      <!-- 网格纹理 -->
      <div class="splash-grid"></div>

      <!-- 浮动代码涂鸦 -->
      <div class="splash-doodles" aria-hidden="true">
        <span class="doodle doodle-brace" style="left:8%;top:20%;">{ }</span>
        <span class="doodle doodle-paren" style="left:85%;top:30%;">( )</span>
        <span class="doodle doodle-angle" style="left:15%;top:75%;">&lt; / &gt;</span>
        <span class="doodle doodle-semi" style="left:78%;top:68%;">;;</span>
        <span class="doodle doodle-star" style="left:5%;top:50%;">*</span>
        <span class="doodle doodle-dot" style="left:90%;top:55%;">&#x2022;</span>
        <span class="doodle doodle-eq" style="left:25%;top:12%;">==</span>
        <span class="doodle doodle-fn" style="left:70%;top:82%;">fn()</span>
      </div>

      <!-- 主内容 -->
      <div class="splash-content">
        <!-- Logo 手绘圆圈 -->
        <div class="splash-logo-ring">
          <svg class="splash-hand-circle" viewBox="0 0 120 120" aria-hidden="true">
            <path
              d="M60 8
                 C85 6, 112 28, 113 55
                 C114 78, 96 108, 66 112
                 C38 116, 8 98, 7 68
                 C6 42, 28 9, 60 8Z"
              fill="none"
              stroke="rgba(255,107,53,0.35)"
              stroke-width="2.5"
              stroke-dasharray="4 2"
              stroke-linecap="round"
            />
            <path
              d="M60 5
                 C88 4, 115 30, 116 56
                 C117 80, 98 112, 66 115
                 C35 118, 6 97, 5 66
                 C4 40, 26 7, 60 5Z"
              fill="none"
              stroke="rgba(255,209,102,0.2)"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          <img :src="withBase('/favicon.png')" alt="XAUAT ACM" class="splash-logo-img" />
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
          <span class="splash-enter-text">🚀 开始探索</span>
          <span class="splash-enter-arrow">→</span>
        </button>
      </div>

      <!-- 底部波浪分割线 -->
      <svg class="splash-wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M0 120 L1440 120 L1440 70
             Q1260 30, 1080 55
             Q900 80, 720 45
             Q540 10, 360 50
             Q180 85, 0 55 Z"
          fill="rgba(255,107,53,0.08)"
        />
        <path
          d="M0 120 L1440 120 L1440 90
             Q1200 50, 1000 75
             Q800 100, 600 65
             Q400 35, 200 70
             Q100 95, 0 75 Z"
          fill="rgba(255,209,102,0.06)"
        />
        <circle cx="180" cy="62" r="3" fill="rgba(255,107,53,0.25)" />
        <circle cx="420" cy="48" r="2" fill="rgba(255,209,102,0.3)" />
        <circle cx="660" cy="55" r="3.5" fill="rgba(255,107,53,0.2)" />
        <circle cx="900" cy="52" r="2" fill="rgba(6,214,160,0.25)" />
        <circle cx="1140" cy="68" r="3" fill="rgba(255,209,102,0.22)" />
        <circle cx="1320" cy="58" r="2.5" fill="rgba(255,107,53,0.18)" />
        <circle cx="280" cy="70" r="1.5" fill="rgba(6,214,160,0.2)" />
        <circle cx="780" cy="60" r="2" fill="rgba(255,209,102,0.2)" />
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
  background: radial-gradient(
    ellipse 80% 60% at 50% 35%,
    #2d2535 0%,
    #241f2f 25%,
    #1a1a2e 50%,
    #161528 75%,
    #121220 100%
  );
  overflow: hidden;
  text-align: center;
  color: #f5f0e8;
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
  background: radial-gradient(
    ellipse 80% 60% at 50% 35%,
    #2a2030 0%,
    #1e1928 25%,
    #151225 50%,
    #110f1e 75%,
    #0e0c18 100%
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
  background: rgba(255, 107, 53, 0.18);
  right: -60px; top: 10%;
  animation-delay: 0s;
}
.orb-2 {
  width: 250px; height: 250px;
  background: rgba(255, 209, 102, 0.15);
  left: -40px; bottom: 25%;
  animation-delay: -4s;
}
.orb-3 {
  width: 200px; height: 200px;
  background: rgba(6, 214, 160, 0.1);
  left: 40%; top: 60%;
  animation-delay: -8s;
}

@keyframes orb-float {
  0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
  25%     { transform: translate(35px, -20px) scale(1.08) rotate(5deg); }
  50%     { transform: translate(-20px, 30px) scale(0.92) rotate(-3deg); }
  75%     { transform: translate(-30px, -10px) scale(1.05) rotate(2deg); }
}

/* ===== 网格纹理 ===== */
.splash-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  mask-image: radial-gradient(ellipse 65% 55% at 50% 38%, black 35%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse 65% 55% at 50% 38%, black 35%, transparent 70%);
}

/* ===== 浮动代码涂鸦 ===== */
.splash-doodles {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.doodle {
  position: absolute;
  font-family: 'Fira Code', 'Cascadia Code', 'JetBrains Mono', 'Consolas', monospace;
  font-size: 1.4rem;
  color: rgba(255, 107, 53, 0.18);
  animation: doodle-float 8s ease-in-out infinite;
  text-shadow: 0 0 12px rgba(255, 107, 53, 0.15);
}

.doodle-brace { animation-delay: 0s; }
.doodle-paren { animation-delay: -1.5s; font-size: 1.1rem; color: rgba(255, 209, 102, 0.18); }
.doodle-angle { animation-delay: -3s; font-size: 1rem; color: rgba(6, 214, 160, 0.15); }
.doodle-semi  { animation-delay: -4.5s; font-size: 1.6rem; color: rgba(255, 107, 53, 0.12); }
.doodle-star  { animation-delay: -2s; font-size: 1.8rem; color: rgba(255, 209, 102, 0.2); }
.doodle-dot   { animation-delay: -5.5s; font-size: 2rem; color: rgba(255, 107, 53, 0.13); }
.doodle-eq    { animation-delay: -6s; font-size: 1rem; color: rgba(6, 214, 160, 0.13); }
.doodle-fn    { animation-delay: -7s; font-size: 1.05rem; color: rgba(255, 209, 102, 0.16); }

@keyframes doodle-float {
  0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.18; }
  25%      { transform: translateY(-15px) translateX(8px) rotate(3deg); opacity: 0.28; }
  50%      { transform: translateY(-5px) translateX(-6px) rotate(-2deg); opacity: 0.14; }
  75%      { transform: translateY(-20px) translateX(4px) rotate(1deg); opacity: 0.24; }
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

/* Logo 手绘圆圈 */
.splash-logo-ring {
  position: relative;
  width: 110px;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.splash-hand-circle {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  animation: circle-wobble 4s ease-in-out infinite;
}

@keyframes circle-wobble {
  0%, 100% { transform: rotate(0deg) scale(1); }
  30%      { transform: rotate(3deg) scale(1.03); }
  60%      { transform: rotate(-2deg) scale(0.98); }
}

.splash-logo-img {
  width: 62px;
  height: 62px;
  object-fit: contain;
  position: relative;
  z-index: 1;
  animation: logo-bounce 3s ease-in-out infinite;
}

@keyframes logo-bounce {
  0%, 100% { transform: translateY(0); }
  40%      { transform: translateY(-4px); }
  60%      { transform: translateY(-2px); }
}

.splash-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  letter-spacing: 4px;
  color: #f5f0e8;
  text-shadow: 0 2px 16px rgba(255, 107, 53, 0.25), 0 0 40px rgba(255, 209, 102, 0.1);
  margin: 0;
  line-height: 1.2;
  font-family: 'Titillium Web', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.splash-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  font-weight: 400;
  color: rgba(245, 240, 232, 0.75);
  letter-spacing: 4px;
  margin: 0;
}

.splash-typed {
  margin-top: 0.3rem;
  font-size: clamp(0.95rem, 2vw, 1.2rem);
  color: rgba(6, 214, 160, 0.85);
  font-weight: 500;
  min-height: 2rem;
}

/* Typed.js 光标颜色 */
.splash-typed :deep(.typed-cursor) {
  color: rgba(6, 214, 160, 0.7);
}

.splash-desc {
  margin-top: 0.25rem;
  font-size: clamp(0.78rem, 1.5vw, 0.95rem);
  color: rgba(245, 240, 232, 0.5);
  letter-spacing: 2px;
}

/* ===== Enter 按钮 ===== */
.splash-enter {
  margin-top: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 2.5rem;
  background: linear-gradient(135deg, #ff6b35, #e55a2b);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 20px rgba(255, 107, 53, 0.35), 0 0 40px rgba(255, 107, 53, 0.1);
}

.splash-enter:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 28px rgba(255, 107, 53, 0.5), 0 0 60px rgba(255, 107, 53, 0.2);
  background: linear-gradient(135deg, #ff8755, #ff6b35);
}

.splash-enter:active {
  transform: scale(0.95);
}

.splash-enter-arrow {
  display: inline-block;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.splash-enter:hover .splash-enter-arrow {
  transform: translateX(5px) scale(1.15);
}

/* ===== 底部波浪分割线 ===== */
.splash-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 1;
  pointer-events: none;
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .splash-logo-ring { width: 85px; height: 85px; }
  .splash-logo-img { width: 48px; height: 48px; }
  .splash-title { font-size: 2rem; letter-spacing: 2px; }
  .splash-subtitle { font-size: 0.85rem; letter-spacing: 2px; }
  .splash-desc { font-size: 0.72rem; }
  .splash-grid { background-size: 40px 40px; }
  .splash-wave { display: none; }
  .splash-enter { padding: 0.65rem 2rem; font-size: 1rem; }
  .doodle { font-size: 1rem !important; }
  .doodle-angle, .doodle-eq, .doodle-fn { display: none; }
}
</style>

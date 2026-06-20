<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/butterfly-extsrc@1/dist/canvas-ribbon.min.js'
  script.async = true
  script.onload = () => {
    // 配置飘带参数
    if (window.CanvasRibbon) {
      new window.CanvasRibbon({
        size: 120,
        alpha: 0.6,
        zIndex: -1,
      })
    }
  }
  document.head.appendChild(script)
})
</script>

<template>
  <div class="canvas-ribbon-container"></div>
</template>

<style scoped>
.canvas-ribbon-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}
</style>

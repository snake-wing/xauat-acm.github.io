<template>
  <div class="giscus-wrapper">
    <div v-if="!isPlaceholder" ref="giscusContainer">
      <div class="giscus-loading">
        <span class="giscus-spinner"></span>
        <span>评论加载中...</span>
      </div>
    </div>
    <div v-else class="giscus-placeholder">
      <div class="giscus-placeholder-icon">💬</div>
      <p class="giscus-placeholder-title">评论功能暂未开启</p>
      <p class="giscus-placeholder-desc">
        需要在
        <a href="https://giscus.app" target="_blank">Giscus</a>
        配置仓库后，将生成的
        <code>data-repo-id</code> 和 <code>data-category-id</code>
        替换 <code>docs/.vitepress/theme/components/Giscus.vue</code> 中的占位符即可启用。
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch, nextTick } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()
const giscusContainer = ref(null)
const isLoading = ref(true)

const GISCUS_REPO = 'snake-wing/xauat-acm.github.io'
const GISCUS_REPO_ID = 'R_kgDOTAB1Pw'
const GISCUS_CATEGORY = 'Announcements'
const GISCUS_CATEGORY_ID = 'DIC_kwDOTAB1P84C_jCz'

const isPlaceholder = computed(() => {
  return GISCUS_REPO_ID === 'R_kgDOXXXXXX' || GISCUS_CATEGORY_ID === 'DIC_kwDOXXXXXX'
})

function loadGiscus() {
  if (!giscusContainer.value || isPlaceholder.value) return

  isLoading.value = true
  giscusContainer.value.innerHTML = ''

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', GISCUS_REPO)
  script.setAttribute('data-repo-id', GISCUS_REPO_ID)
  script.setAttribute('data-category', GISCUS_CATEGORY)
  script.setAttribute('data-category-id', GISCUS_CATEGORY_ID)
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('data-loading', 'lazy')
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true

  script.onload = () => {
    isLoading.value = false
  }

  giscusContainer.value.appendChild(script)
}

onMounted(() => {
  loadGiscus()
})

watch(isDark, () => {
  nextTick(() => loadGiscus())
})
</script>

<style scoped>
.giscus-wrapper {
  margin-top: 1rem;
}

.giscus-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem 0;
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
}

.giscus-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand);
  border-radius: 50%;
  animation: giscus-spin 0.8s linear infinite;
}

@keyframes giscus-spin {
  to { transform: rotate(360deg); }
}

.giscus-placeholder {
  text-align: center;
  padding: 2rem 1rem;
}

.giscus-placeholder-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.giscus-placeholder-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
}

.giscus-placeholder-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
  line-height: 1.7;
  max-width: 500px;
  margin: 0.5rem auto 0;
}

.giscus-placeholder-desc code {
  padding: 0.1rem 0.35rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  font-size: 0.78rem;
}

.giscus-placeholder-desc a {
  color: var(--vp-c-brand);
}
</style>

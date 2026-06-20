<template>
  <div class="giscus-wrapper">
    <!-- 修复问题3：当 Giscus 配置为占位符时，优雅降级显示空状态，不暴露原始错误 -->
    <div v-if="!isPlaceholder" ref="giscusContainer"></div>
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

const GISCUS_REPO = 'XAUAT-ACM/xauat-acm.github.io'
// ⚠️ 部署前需要替换为你的实际 ID（在 https://giscus.app 填写仓库信息后自动生成）
const GISCUS_REPO_ID = 'R_kgDOXXXXXX'
const GISCUS_CATEGORY = 'Announcements'
const GISCUS_CATEGORY_ID = 'DIC_kwDOXXXXXX'

// 修复问题3：检测是否为占位符 ID，若是则不加载 giscus 避免报错
const isPlaceholder = computed(() => {
  return GISCUS_REPO_ID === 'R_kgDOXXXXXX' || GISCUS_CATEGORY_ID === 'DIC_kwDOXXXXXX'
})

function loadGiscus() {
  if (!giscusContainer.value || isPlaceholder.value) return

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
  margin-top: 1.5rem;
}

/* 修复问题3：占位空状态样式，与页面白色卡片风格统一 */
.giscus-placeholder {
  text-align: center;
  padding: 2rem 1rem;
  color: var(--vp-c-text-2);
}

.giscus-placeholder-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.giscus-placeholder-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.giscus-placeholder-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
  line-height: 1.7;
  max-width: 500px;
  margin: 0 auto;
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

<template>
  <div class="giscus-wrapper">
    <div ref="giscusContainer"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, nextTick } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()
const giscusContainer = ref(null)

const GISCUS_REPO = 'XAUAT-ACM/xauat-acm.github.io'
// ⚠️ 部署前需要替换为你的实际 ID
// 在 https://giscus.app 填写仓库信息后会自动生成
const GISCUS_REPO_ID = 'R_kgDOXXXXXX'        // ← 替换
const GISCUS_CATEGORY = 'Announcements'
const GISCUS_CATEGORY_ID = 'DIC_kwDOXXXXXX'  // ← 替换

function loadGiscus() {
  if (!giscusContainer.value) return

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

// 主题切换时自动更新 Giscus
watch(isDark, () => {
  nextTick(() => loadGiscus())
})
</script>

import { h, computed } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Router } from 'vitepress'
import { useRoute, useData } from 'vitepress'
import mediumZoom from 'medium-zoom'
import RightSidebar from './components/RightSidebar.vue'
import FloatingPanel from './components/FloatingPanel.vue'
import GiscusWrapper from './components/GiscusWrapper.vue'
import SiteRuntime from './components/SiteRuntime.vue'
import CanvasRibbon from './components/CanvasRibbon.vue'
import HeroBanner from './components/HeroBanner.vue'
import PostMeta from './components/PostMeta.vue'
import './styles/custom.css'

export default {
  extends: DefaultTheme,

  Layout() {
    const route = useRoute()
    const { page } = useData()
    // 用 page.relativePath 判断更可靠（SSR 时 route.path 可能含 base 前缀）
    const isPostPage = computed(() => {
      const rp = page.value?.relativePath || ''
      const rPath = route.path || ''
      return rp.startsWith('posts/') || rPath.startsWith('/posts/') || rPath.includes('/posts/')
    })

    return h(DefaultTheme.Layout, null, {
      // 文章页元数据（日期、分类、标签）
      'doc-before': () => h(PostMeta),

      // Hero
      'layout-top': () => [
        h(HeroBanner),
      ],
      // 文章底部：评论区 + 页脚信息
      'doc-after': () => [
        h(GiscusWrapper),
        h('div', { class: 'footer-extras' }, [
          h(SiteRuntime),
          h('span', { id: 'busuanzi_container_site_uv', style: 'display:none' }, [
            '👀 访客 ',
            h('span', { id: 'busuanzi_value_site_uv' }, '0'),
            ' · PV ',
            h('span', { id: 'busuanzi_value_site_pv' }, '0'),
          ]),
        ]),
      ],
      // 右侧边栏（文章页隐藏，居中阅读）
      'aside-outline-before': () => isPostPage.value ? null : h(RightSidebar),
      // 底部
      'layout-bottom': () => [
        h(CanvasRibbon),
        h(FloatingPanel),
      ],
    })
  },

  enhanceApp({ app, router }: { app: any; router: Router }) {
    if (typeof window !== 'undefined') {
      router.onAfterRouteChanged = () => {
        mediumZoom('.vp-doc img:not(.no-zoom)', {
          background: 'var(--vp-c-bg)',
          margin: 24,
        })
      }
    }
  },
}

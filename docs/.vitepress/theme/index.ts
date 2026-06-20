import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Router } from 'vitepress'
import mediumZoom from 'medium-zoom'
import Giscus from './components/Giscus.vue'
import CanvasRibbon from './components/CanvasRibbon.vue'
import FloatingPanel from './components/FloatingPanel.vue'
import SiteRuntime from './components/SiteRuntime.vue'
import './styles/custom.css'

export default {
  extends: DefaultTheme,

  // 在所有页面注入全局组件
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 文章底部：评论 + 运行时间 + 访客统计
      'doc-after': () => [
        h(Giscus),
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
      // 布局底部：飘带 + 浮动面板
      'layout-bottom': () => [
        h(CanvasRibbon),
        h(FloatingPanel),
      ],
    })
  },

  enhanceApp({ app, router }: { app: any; router: Router }) {
    // 图片灯箱：仅在客户端初始化
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

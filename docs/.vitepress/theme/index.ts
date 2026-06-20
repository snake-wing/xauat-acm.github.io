import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Router } from 'vitepress'
import mediumZoom from 'medium-zoom'
import RightSidebar from './components/RightSidebar.vue'
import FloatingPanel from './components/FloatingPanel.vue'
import Giscus from './components/Giscus.vue'
import SiteRuntime from './components/SiteRuntime.vue'
import CanvasRibbon from './components/CanvasRibbon.vue'
import HeroBanner from './components/HeroBanner.vue'
import GeoDecor from './components/GeoDecor.vue'
import './styles/custom.css'

export default {
  extends: DefaultTheme,

  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 几何装饰 + Hero
      'layout-top': () => [
        h(GeoDecor),
        h(HeroBanner),
      ],
      // 文章底部：评论区 + 页脚信息
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
      // 右侧边栏
      'aside-outline-before': () => h(RightSidebar),
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

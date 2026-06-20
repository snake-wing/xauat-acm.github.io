import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import Giscus from './components/Giscus.vue'
import './styles/custom.css'

export default {
  extends: DefaultTheme,

  // 在所有 doc 页面底部自动添加 Giscus 评论区
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(Giscus),
    })
  },

  enhanceApp({ app, router, siteData }) {
    // 可在此注册全局组件
  },
}

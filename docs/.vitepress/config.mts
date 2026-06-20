import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'XAUAT ACM',
  description: '西安建筑科技大学 ACM 协会',
  lang: 'zh-CN',

  // 部署到 GitHub Pages 时使用
  base: '/',

  // 开启 clean URL（/about 而非 /about.html）
  cleanUrls: true,

  // 本地搜索
  themeConfig: {
    // 网站 Logo（先注释，等有 logo 后替换）
    // logo: '/logo.svg',

    // 顶部导航
    nav: [
      { text: '首页', link: '/' },
      { text: '归档', link: '/archives' },
      { text: '标签', link: '/tags' },
      { text: '关于', link: '/about' },
    ],

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/XAUAT-ACM' },
    ],

    // 侧边栏（文章页面显示）
    sidebar: {
      '/posts/': [
        {
          text: '最近文章',
          items: [], // 自动生成或留空
        },
      ],
    },

    // 页脚
    footer: {
      message: '西安建筑科技大学 ACM 协会',
      copyright: 'Copyright © 2024 XAUAT ACM',
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/XAUAT-ACM/xauat-acm.github.io/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short',
      },
    },

    // 搜索
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索',
          },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '重置',
            backButtonTitle: '返回',
            noResultsText: '没有找到结果',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },

    // 文档页配置
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    // 大纲
    outline: {
      label: '页面导航',
      level: [2, 3],
    },
  },

  // Markdown 配置
  markdown: {
    lineNumbers: true,
    // 数学公式支持
    math: true,
  },
})

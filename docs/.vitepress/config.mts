import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'XAUAT ACM',
  description: '西安建筑科技大学 ACM 协会 — 算法竞赛、编程训练、技术交流',
  lang: 'zh-CN',

  // 部署到 GitHub Pages 时使用（仓库名作为路径前缀）
  base: '/xauat-acm.github.io/',

  // 开启 clean URL（/about 而非 /about.html）
  cleanUrls: true,

  // SEO & Meta
  head: [
    ['link', { rel: 'icon', href: '/xauat-acm.github.io/favicon.svg' }],
    ['meta', { name: 'author', content: 'XAUAT ACM' }],
    ['meta', { name: 'keywords', content: 'XAUAT,西安建筑科技大学,ACM,算法竞赛,程序设计,ICPC,编程训练' }],
    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'XAUAT ACM — 西安建筑科技大学 ACM 协会' }],
    ['meta', { property: 'og:description', content: '西安建筑科技大学 ACM 协会官网，提供算法竞赛培训、技术交流与赛事信息。' }],
    ['meta', { property: 'og:site_name', content: 'XAUAT ACM' }],
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: 'XAUAT ACM — 西安建筑科技大学 ACM 协会' }],
    ['meta', { name: 'twitter:description', content: '西安建筑科技大学 ACM 协会官网，提供算法竞赛培训、技术交流与赛事信息。' }],
    // 不蒜子访客统计
    ['script', { async: '', src: 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js' }],
  ],

  // 本地搜索
  themeConfig: {
    // 网站 Logo
    logo: '/favicon.svg',

    // 顶部导航
    nav: [
      { text: '首页', link: '/' },
      { text: '归档', link: '/archives' },
      { text: '标签', link: '/tags' },
      {
        text: '集训队',
        items: [
          { text: '成员', link: '/team' },
          { text: '获奖荣誉', link: '/award' },
          { text: '获奖瞬间', link: '/gallery' },
        ],
      },
      {
        text: '关于',
        items: [
          { text: '协会简介', link: '/about' },
          { text: '加入我们', link: '/about#加入我们' },
          { text: '友链', link: '/links' },
        ],
      },
    ],

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/XAUAT-ACM' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
        },
        link: 'https://jq.qq.com/?_wv=1027&k=xxxxx',
        ariaLabel: 'QQ 群',
      },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M18.223 3.086a1.25 1.25 0 0 1 0 1.768L17.08 5.996h1.17A3.75 3.75 0 0 1 22 9.747v7.5a3.75 3.75 0 0 1-3.75 3.75H5.75A3.75 3.75 0 0 1 2 17.247v-7.5a3.75 3.75 0 0 1 3.75-3.75h1.166L5.775 4.855a1.25 1.25 0 1 1 1.767-1.768l2.652 2.652c.079.079.145.165.198.257h3.213c.053-.092.12-.178.198-.257l2.652-2.653a1.25 1.25 0 0 1 1.768 0zM7.25 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm9.5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/></svg>',
        },
        link: 'https://space.bilibili.com/xxxxx',
        ariaLabel: 'Bilibili',
      },
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
      copyright: 'Copyright © 2026 XAUAT ACM',
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

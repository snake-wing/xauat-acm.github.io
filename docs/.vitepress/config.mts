import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'XAUAT ACM',
  description: '西安建筑科技大学 ACM 协会 — 算法竞赛、编程训练、技术交流',
  lang: 'zh-CN',

  base: '/xauat-acm.github.io/',

  cleanUrls: true,

  // 默认白色主题
  appearance: { initialValue: 'light' },

  head: [
    ['link', { rel: 'icon', href: '/xauat-acm.github.io/favicon.svg' }],
    ['meta', { name: 'author', content: 'XAUAT ACM' }],
    ['meta', { name: 'keywords', content: 'XAUAT,西安建筑科技大学,ACM,算法竞赛,程序设计,ICPC,编程训练' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'XAUAT ACM — 西安建筑科技大学 ACM 协会' }],
    ['meta', { property: 'og:description', content: '西安建筑科技大学 ACM 协会官网，提供算法竞赛培训、技术交流与赛事信息。' }],
    ['meta', { property: 'og:site_name', content: 'XAUAT ACM' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: 'XAUAT ACM — 西安建筑科技大学 ACM 协会' }],
    ['meta', { name: 'twitter:description', content: '西安建筑科技大学 ACM 协会官网，提供算法竞赛培训、技术交流与赛事信息。' }],
    ['script', { async: '', src: 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js' }],
  ],

  themeConfig: {
    logo: '/favicon.svg',

    nav: [
      { text: '首页', link: '/' },
      {
        text: '集训队',
        items: [
          { text: '成员', link: '/team' },
          { text: '获奖荣誉', link: '/award' },
          { text: '获奖瞬间', link: '/gallery' },
        ],
      },
      {
        text: '关于我们',
        items: [
          { text: '什么是算法竞赛和ACM', link: '/about/competitions' },
          { text: '协会活动', link: '/about/activities' },
          { text: '入门指南', link: '/about/guide' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/XAUAT-ACM' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path fill="currentColor" d="M8 12l3 3 5-5"/></svg>',
        },
        link: '#',  /* TODO: 替换为实际 QQ 群链接 */
        ariaLabel: 'QQ 群（待创建）',
      },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M18.223 3.086a1.25 1.25 0 0 1 0 1.768L17.08 5.996h1.17A3.75 3.75 0 0 1 22 9.747v7.5a3.75 3.75 0 0 1-3.75 3.75H5.75A3.75 3.75 0 0 1 2 17.247v-7.5a3.75 3.75 0 0 1 3.75-3.75h1.166L5.775 4.855a1.25 1.25 0 1 1 1.767-1.768l2.652 2.652c.079.079.145.165.198.257h3.213c.053-.092.12-.178.198-.257l2.652-2.653a1.25 1.25 0 0 1 1.768 0zM7.25 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm9.5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/></svg>',
        },
        link: '#',  /* TODO: 替换为实际 B站链接 */
        ariaLabel: 'Bilibili（待开通）',
      },
    ],

    sidebar: false,

    footer: {
      message: '西安建筑科技大学 ACM 协会',
      copyright: 'Copyright © 2026 XAUAT ACM',
    },

    editLink: {
      pattern: 'https://github.com/XAUAT-ACM/xauat-acm.github.io/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: { dateStyle: 'short', timeStyle: 'short' },
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '重置',
            backButtonTitle: '返回',
            noResultsText: '没有找到结果',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
          },
        },
      },
    },

    docFooter: { prev: '上一篇', next: '下一篇' },

    outline: { label: '页面导航', level: [2, 3] },
  },

  markdown: {
    lineNumbers: true,
    math: true,
  },
})

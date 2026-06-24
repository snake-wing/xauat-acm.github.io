import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'XAUAT ACM',
  description: '西安建筑科技大学 ACM 协会 — 算法竞赛、编程训练、技术交流',
  lang: 'zh-CN',

  base: '/xauat-acm.github.io/',

  cleanUrls: true,

  // 固定浅色主题，不显示切换按钮
  appearance: false,

  head: [
    ['link', { rel: 'icon', href: '/xauat-acm.github.io/favicon.png' }],
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
    logo: '/favicon.png',

    nav: [
      { text: '首页', link: '/home' },
      {
        text: '集训队',
        items: [
          { text: '成员', link: '/team' },
          { text: '获奖荣誉', link: '/award' },
          { text: '获奖瞬间', link: '/gallery' },
        ],
      },
      { text: '训练平台', link: '/training' },
      { text: '招新', link: '/join' },
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
      { icon: 'github', link: 'https://github.com/snake-wing/xauat-acm.github.io' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5" fill="#9ca3af"/><g transform="translate(2.4,2.5) scale(0.8)"><path fill="#fff" d="M21.395 15.035a40 40 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 17.351 0 12 0S4.474 4.632 4.474 9.241c0 .274.013.804.014.836l-1.08 2.695a39 39 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 2.103-2.472 2.103-2.472 0 1.469.756 3.387 2.394 4.771-.612.188-1.363.479-1.845.835-.434.32-.379.646-.301.778.343.578 5.883.369 7.482.189 1.6.18 7.14.389 7.483-.189.078-.132.132-.458-.301-.778-.483-.356-1.233-.646-1.846-.836 1.637-1.384 2.393-3.302 2.393-4.771 0 0 1.563 2.537 2.103 2.472.251-.03.581-1.39-.438-4.673"/></g></svg>',
        },
        link: 'https://qm.qq.com/q/xiUbXv19HE',
        ariaLabel: 'QQ 群',
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
      pattern: 'https://github.com/snake-wing/xauat-acm.github.io/edit/main/docs/:path',
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

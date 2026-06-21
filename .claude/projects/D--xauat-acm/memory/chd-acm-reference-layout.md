---
name: chd-acm-reference-layout
description: CHD ACM 主页布局结构分析，作为 XAUAT ACM 网站设计的参考模板
metadata:
  type: reference
---

# CHD ACM 主页布局参考

参考文件: `D:\xauat_acm\chd_acm.html`（长安大学 ACM 协会主页完整 HTML）

## 整体配色

| 元素 | 颜色 | 用途 |
|------|------|------|
| 页面背景 | `#f4f5f7` | 全局浅灰背景 |
| 导航栏渐变 | `#f97316` → `#ef4444`（橙→红） | 固定顶部导航 |
| Hero 区域 | `#9bd63c`（亮绿） | 首页大标题背景 |
| 主题色/链接 | `#49b1f5`（蓝） | 分页、hover、按钮 |
| 文章标题 hover | `#ef4444`（红） | 文字悬停效果 |
| 图标色 | `text-red-400` | 文章元数据小图标 |
| 卡片 | 白色 `bg-white` | 圆角 + 阴影 + hover:shadow-md |
| Footer | `rgba(0,0,0,0.85)` | 深色页脚 |

## 布局结构（从上到下）

### 1. Header — 固定顶部导航
- `fixed top-0`, `h-14`, `z-50`
- 渐变背景 `nav-gradient`（橙→红）
- 左侧: 协会名称（加粗）
- 右侧: 导航链接（搜索/首页/关于我们▼/相关链接▼/集训队▼）+ 圆形用户头像
- 移动端: 汉堡菜单按钮
- 对应现有: VitePress 默认 navbar（`config.mts` 中 nav 配置）

### 2. Hero Section — 首页大标题
- 亮绿背景全宽
- 居中白色大标题（text-4xl~6xl），带 `drop-shadow-lg`
- 底部 SVG 波浪分割线 → 过渡到 `#f4f5f7` 背景
- 对应现有: `HeroBanner.vue`（当前为深蓝紫渐变，无波浪分割线）

### 3. Main Content — 双栏布局
- `max-w-[1200px]` 居中容器
- `flex-col lg:flex-row` 响应式
- 间距: `gap-6`, `px-4 py-8`

#### 左侧 73% (文章列表区)
每篇文章卡片:
- 标题 (text-2xl, bold, hover:text-red-500)
- 元数据行 (text-xs):
  - 作者 (`fa-user` 图标)
  - 日期 (`fa-calendar-alt` 图标)
  - 分类 (`fa-folder` 图标)
  - 阅读量 (`fa-eye` 图标)
  - 分隔符 `|`
- 摘要文字 (text-sm, text-justify, line-clamp-3)
- 卡片: `bg-white rounded-lg shadow-sm hover:shadow-md p-6 md:p-8`

底部分页器:
- 主题色 `#49b1f5`（蓝）
- 上一页/页码/省略号/下一页
- 当前页: 蓝色背景白色文字
- 其他页: 白色背景, hover 变蓝
- 对应现有: `Pagination.vue`

#### 右侧 27% (侧边栏)
从上到下的小部件卡片，每个都是 `bg-white rounded-lg shadow-sm hover:shadow-md p-5`:

1. **个人信息卡片** (Profile Card)
   - 圆形头像 (`rounded-full`), hover 旋转 360° (duration-700)
   - 名称 + 格言（斜体）
   - 三列统计: 文章数/标签数/分类数
   - "Go To OnlineJudge" 按钮 (蓝色 `#49b1f5`, 带弹跳纸飞机图标)
   - 对应现有: `RightSidebar.vue` 中站点信息部分

2. **公告** (Notice)
   - 标题 + 喇叭图标 (`fa-bullhorn`, animate-pulse)
   - 文字内容
   - 对应现有: `RightSidebar.vue` 中公告部分

3. **最新文章** (Recent Articles)
   - 标题 + 历史图标 (`fa-history`)
   - 列表: 标题 (hover 变蓝, line-clamp-1) + 日期
   - 对应现有: `RightSidebar.vue` 中最新内容部分

4. **分类** (Categories)
   - 标题 + 文件夹图标 (`fa-folder-open`)
   - 列表: 分类名 + 文章数量徽章
   - hover 背景变灰, 文字变蓝
   - 对应现有: `RightSidebar.vue` 中分类目录部分

5. **标签云** (Tag Cloud)
   - 标题 + 标签图标 (`fa-tags`)
   - 多彩标签: 每个标签不同颜色、不同字号 (12px~18px)
   - 颜色包括: 紫 `#8e44ad`、绿 `#27ae60`、黄 `#f1c40f`、蓝 `#2980b9`、红 `#e74c3c`、橙 `#d35400` 等
   - hover 统一变 `#49b1f5`
   - 对应现有: `RightSidebar.vue` 中标签云部分

6. **归档** (Archives)
   - 标题 + 归档图标 (`fa-archive`)
   - 按月份列表: 月份名 + 文章数
   - 对应现有: XAUAT 暂无此小部件

7. **网站资讯** (Site Stats)
   - 标题 + 图表图标 (`fa-chart-line`)
   - 键值对列表: 运行时间/访问次数/文章数/访客数/最后更新
   - 对应现有: `SiteRuntime.vue`（仅运行时间）

### 4. Footer
- `mt-8 py-8`
- 深色背景 `rgba(0,0,0,0.85)`
- 居中版权文字 `© 2014 - 2024 By CHD-ACM`
- 对应现有: VitePress 默认 footer（`config.mts` 中 footer 配置）

## 技术栈
- Tailwind CSS (CDN)
- Font Awesome 6.4.0 (CDN)
- 纯 HTML，无框架

## 当前 XAUAT ACM 已实现的部分
- ✅ 双栏布局 (75%/25%) — `custom.css` + `Layout.vue`
- ✅ Hero Banner — `HeroBanner.vue`
- ✅ 打字机标语 — `TypedBanner.vue`
- ✅ 文章列表卡片 — `index.md` + `posts.data.mts`
- ✅ 分页器 — `Pagination.vue`
- ✅ 右侧个人信息卡片 — `RightSidebar.vue`
- ✅ 公告 — `RightSidebar.vue`
- ✅ 最新文章 — `RightSidebar.vue`
- ✅ 分类 — `RightSidebar.vue`
- ✅ 标签云 — `RightSidebar.vue`
- ✅ 站点运行时间 — `SiteRuntime.vue`
- ✅ 暗色模式 — `Layout.vue`

## 当前 XAUAT ACM 可补充的部分
- ❌ 归档小部件 (Archives widget in sidebar)
- ❌ 网站资讯小部件 (Site stats widget in sidebar)
- ❌ Hero 区域波浪分割线 (SVG wave divider)
- ❌ 头像 hover 旋转动画 (已在 CHD 中实现但 XAUAT 侧边栏头像是静态的)
- ❌ 多色多尺寸标签云 (当前标签云颜色和大小相对统一)
- ❌ 移动端响应式汉堡菜单 (VitePress 已有，但样式不同)

**Why:** 长安大学 ACM 主页是 XAUAT ACM 网站设计的直接参考对象。理解其布局结构有助于后续迭代改进。
**How to apply:** 在修改 XAUAT ACM 网站布局、侧边栏、配色或新增小部件时，参考此文档中的 CHD ACM 设计模式。

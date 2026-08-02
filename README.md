# XAUAT ACM 协会官网项目说明与维护手册

> 最后核对：2026-08-02  
> 核对范围：当前仓库源码、构建脚本与 GitHub Actions 配置  
> 维护对象：西安建筑科技大学 ACM 协会官网

本文档按当前仓库的实际代码整理，是后续内容更新、开发和交接的主要说明。若旧说明、注释或《图片替换指南》与本文冲突，以实际代码和本文记录为准。

## 1. 项目概览

这是一个基于 VitePress 和 Vue 3 的静态网站，通过 GitHub Actions 构建并部署到 GitHub Pages。

网站目前包含以下功能：

- 独立欢迎页：访问根路径 `/` 后显示全屏欢迎动画，点击按钮进入 `/home`。
- 内容首页：展示文章列表、分类、标签、最新内容以及近期比赛推荐。
- 协会内容：成员归档、获奖荣誉、获奖照片、协会活动、赛事介绍和入门指南。
- 训练平台：提供常用在线评测平台入口，并聚合 Codeforces、AtCoder、牛客和洛谷的近期比赛。
- 招新页面：介绍协会优势、招新流程、常见问题和 QQ 群入口。
- 文章系统：支持 Markdown 文章、摘要、分类、标签、归档和本地搜索。
- 外部功能：Giscus 评论、不蒜子访问统计、Typed.js 打字动画、图片点击放大和 Canvas 飘带动画。

当前 Git 信息：

| 项目 | 当前值 |
| --- | --- |
| 远程仓库 | `https://github.com/snake-wing/xauat-acm.github.io.git` |
| 主分支 | `main` |
| GitHub Pages 基础路径 | `/xauat-acm.github.io/` |
| 按配置推导的站点入口 | `https://snake-wing.github.io/xauat-acm.github.io/` |
| CI 使用的 Node.js | Node.js 20 |

> 如果仓库以后迁移到协会组织或改成用户主页仓库，需要同步修改基础路径、仓库链接、编辑链接和 Giscus 配置，详见第 10 节。

## 2. 网站访问结构

网站的主要访问流程是：

```text
访问 /
  └─ 全屏欢迎页 HeroBanner
       └─ 点击“开始探索”
            └─ /home 内容首页
                 ├─ 文章列表、分类、标签与评论
                 ├─ 值得训练的比赛
                 └─ 正式比赛日程
```

主要页面如下：

| 路由 | 源文件 | 内容 |
| --- | --- | --- |
| `/` | `docs/index.md` | 全屏欢迎页，只渲染 `HeroBanner` |
| `/home` | `docs/home.md` | 文章列表与分页，页面底部显示比赛推荐 |
| `/team` | `docs/team.md` | 按年级折叠显示成员信息 |
| `/award` | `docs/award.md` | ICPC、CCPC、蓝桥杯、天梯赛获奖记录 |
| `/gallery` | `docs/gallery.md` | 获奖及活动照片墙 |
| `/training` | `docs/training.md` | OJ 平台入口与近期线上比赛 |
| `/join` | `docs/join.md` | 招新介绍、流程、FAQ 和联系方式 |
| `/about/competitions` | `docs/about/competitions.md` | 算法竞赛和主要赛事概览 |
| `/about/activities` | `docs/about/activities.md` | 协会活动安排 |
| `/about/guide` | `docs/about/guide.md` | 算法竞赛入门路线 |
| `/about/icpc` | `docs/about/icpc.md` | ICPC 单项介绍，目前未加入顶部导航 |
| `/about/ccpc` | `docs/about/ccpc.md` | CCPC 单项介绍，目前未加入顶部导航 |
| `/about/lanqiao` | `docs/about/lanqiao.md` | 蓝桥杯单项介绍，目前未加入顶部导航 |
| `/about/ladder` | `docs/about/ladder.md` | 天梯赛单项介绍，目前未加入顶部导航 |
| `/archives` | `docs/archives.md` | 按年份归档文章，入口位于右侧栏 |
| `/tags` | `docs/tags.md` | 按分类或标签筛选文章，入口位于右侧栏 |
| `/posts/welcome` | `docs/posts/welcome.md` | 当前唯一一篇示例/欢迎文章 |
| 404 | `docs/404.md` | 自定义未找到页面 |

顶部导航由 `docs/.vitepress/config.mts` 中的 `themeConfig.nav` 控制，不是所有现有页面都会自动出现在导航中。

## 3. 技术栈和运行机制

### 3.1 核心技术

| 类别 | 技术或服务 | 当前用途 |
| --- | --- | --- |
| 静态站点生成 | VitePress `^1.6.3` | Markdown 路由、构建、搜索和默认主题 |
| 前端框架 | Vue `^3.5.13` | 页面交互与自定义组件 |
| 内容格式 | Markdown + YAML Frontmatter | 普通页面和文章内容 |
| 数学公式 | `markdown-it-mathjax3` | Markdown 数学公式 |
| 图片交互 | `medium-zoom` | 正文图片点击放大 |
| 评论 | Giscus | 使用 GitHub Discussions 保存评论 |
| 访问统计 | 不蒜子 | 全站 UV/PV |
| 动画 | Typed.js、canvas-ribbon | 欢迎页打字机和全局背景动画 |
| 部署 | GitHub Actions + GitHub Pages | 自动构建和发布 |

站点设置了 `appearance: false`，因此当前界面固定为浅色主题。代码和 CSS 中仍保留了一批深色模式样式，但正常页面没有主题切换入口。

### 3.2 文章数据流

```text
docs/posts/*.md
  └─ docs/posts.data.mts 扫描 Frontmatter、摘要并按日期倒序排列
       ├─ docs/home.md：文章列表和分页
       ├─ docs/archives.md：年份归档
       ├─ docs/tags.md：分类与标签筛选
       └─ usePosts.ts：把文章数据提供给 RightSidebar
```

每篇文章可提供 `title`、`date`、`category`、`tags` 和 `excerpt`。未填写分类时使用“未分类”，未填写标题时使用“未命名”。

### 3.3 比赛数据流

```text
GitHub Actions 每 6 小时运行，或执行 npm run build
  └─ scripts/fetch-contests.mjs
       ├─ Codeforces 官方 API
       ├─ AtCoder 比赛页面
       ├─ 牛客比赛日历接口
       └─ 洛谷比赛列表接口
            └─ 写入 docs/public/contests.json
                 ├─ ContestBoard.vue：训练平台近期比赛列表
                 └─ HomeContestRanking.vue：首页训练比赛推荐

人工维护 docs/public/offline-contests.json
  └─ HomeContestRanking.vue：首页正式比赛日程
```

抓取脚本同时尝试下载各 OJ 的图标到 `docs/public/icons/`。单个平台失败不会中断构建；如果主流程发生致命错误，脚本会写入一个空的 `contests.json`，然后继续构建网站。

浏览器打开训练页面时会先读取构建生成的 JSON，再额外尝试实时刷新 Codeforces 数据。其余三个平台不会在浏览器端实时抓取。页面中的 30 秒定时器只更新倒计时显示，不会每 30 秒重新请求全部比赛数据。

## 4. 目录说明

以下结构只列出维护时最重要的文件：

```text
xauat_acm/
├─ .github/workflows/deploy.yml       # GitHub Pages 自动部署
├─ docs/                              # 网站源文件
│  ├─ .vitepress/
│  │  ├─ config.mts                   # 标题、base、导航、SEO、搜索、社交链接
│  │  ├─ theme/index.ts               # 当前生效的主题入口和布局插槽
│  │  ├─ theme/styles/custom.css      # 全站自定义样式
│  │  ├─ theme/components/            # Vue 组件
│  │  ├─ theme/composables/usePosts.ts
│  │  ├─ cache/                       # 开发缓存，已忽略，不要编辑
│  │  └─ dist/                        # 构建产物，已忽略，不要编辑
│  ├─ about/                          # 协会和赛事介绍页面
│  ├─ posts/                          # 文章目录
│  ├─ public/                         # 原样复制到站点的静态资源和 JSON
│  ├─ index.md                        # 欢迎页
│  ├─ home.md                         # 内容首页
│  ├─ team.md                         # 成员数据
│  ├─ award.md                        # 获奖数据和展示逻辑
│  ├─ gallery.md                      # 照片数据
│  ├─ training.md                     # 训练平台
│  ├─ join.md                         # 招新页面
│  └─ posts.data.mts                  # 文章数据加载器
├─ scripts/fetch-contests.mjs         # 构建前抓取比赛和平台图标
├─ package.json                       # npm 脚本和依赖
├─ package-lock.json                  # 锁定依赖版本
├─ README.md                          # 本文档，GitHub 项目首页说明
├─ 网站维护文档.md                    # 较早期的维护说明，仅作历史参考
└─ 图片替换指南.md                    # 较早期的图片说明，仅作参考
```

根目录还保留了旧站或数据整理资料，包括 `chd_acm.html`、`chd_acm.github.io.zip`、`chd_acm_extracted/`、`ccpc_html.txt`、`xcpc_awards_table.html`、`蓝桥杯获奖/` 和 `天梯赛获奖/`。它们不参与当前 VitePress 构建，主要用于页面设计或获奖数据核对。清理前应确认是否仍需作为原始凭据或参考资料。

以下文件目前没有进入实际渲染链路：

- `docs/.vitepress/theme/Layout.vue`：旧版自定义布局；当前主题实际使用 `index.ts` 中扩展的 `DefaultTheme.Layout`。
- `docs/.vitepress/theme/components/TypedBanner.vue`：打字机逻辑已直接写在 `HeroBanner.vue` 中。
- `docs/.vitepress/theme/components/GeoDecor.vue`：没有被当前页面或主题入口引用。

## 5. 本地开发与验证

### 5.1 环境要求

- Node.js 20，建议与 CI 保持一致。
- npm，版本随 Node.js 安装。
- Git。

### 5.2 首次安装

```bash
git clone https://github.com/snake-wing/xauat-acm.github.io.git
cd xauat-acm.github.io
npm ci
```

已有 `package-lock.json` 时优先使用 `npm ci`，它会严格按锁文件安装依赖。

### 5.3 常用命令

| 命令 | 作用 | 注意事项 |
| --- | --- | --- |
| `npm run dev` | 启动开发服务器和热更新 | 默认使用已有的 `docs/public/contests.json` |
| `npm run fetch-contests` | 单独更新比赛数据和平台图标 | 会修改仓库中被跟踪的 JSON/图片，需要联网 |
| `npm run build` | 先抓取比赛，再生产构建 | 会修改比赛 JSON/图标，输出到 `docs/.vitepress/dist/` |
| `npm run preview` | 预览已有生产构建 | 应在成功构建后运行 |
| `npx vitepress build docs` | 只检查和构建站点，不执行比赛抓取 | 适合验证纯内容或样式修改 |

执行 `npm run build` 后，提交前务必检查：

```bash
git status
git diff -- docs/public/contests.json
```

避免把临时抓取结果、个人配置或无关文件一并提交。

## 6. 日常内容维护

### 6.1 发布文章

在 `docs/posts/` 中创建一个英文短横线命名的 Markdown 文件，例如 `summer-training-2026.md`：

```markdown
---
title: 2026 暑期集训安排
date: 2026-08-02
category: 训练通知
tags: [集训, 算法]
excerpt: 2026 年暑期集训时间、地点和内容安排。
aside: false
---

# 2026 暑期集训安排

正文内容……
```

保存后文章会自动进入首页、归档和标签页，不需要手工登记。建议每篇文章填写完整的 `title`、`date`、`category`、`tags` 和 `excerpt`。

### 6.2 更新成员

编辑 `docs/team.md` 中的 `generations` 数组。每个成员对象的结构为：

```js
{
  grade: '2026 级',
  name: '姓名',
  department: '学院或专业',
  status: '现役',
  graduation: '-',
  contact: {
    github: '可选链接',
    cf: '可选链接',
    blog: '可选链接'
  }
}
```

新增年级时，还要检查 `collapsed` 的默认折叠状态。目前页面中的张三、李四、王五、赵六和“前辈 A/B”均为示例数据，正式上线前应替换。

### 6.3 更新获奖荣誉

获奖数据直接写在 `docs/award.md` 的 `awards` 对象中：

- ICPC、CCPC 按奖项等级组织。
- 蓝桥杯按年份、国赛/省赛、奖项等级组织。
- 天梯赛按年份和奖项组织。

修改时沿用现有对象结构，保证括号、逗号和数组闭合正确。该文件数据量较大，建议一次只修改一个赛事或年份，并在修改后执行仅站点构建验证。

原始获奖名单位于根目录的获奖资料文件夹；应先核对姓名、年份、组别和奖项，再录入网站。

### 6.4 添加照片

1. 将压缩后的照片放入 `docs/public/images/gallery/`。
2. 编辑 `docs/gallery.md` 中的 `photos` 数组。

```js
{
  src: '/images/gallery/2026-icpc.jpg',
  title: '2026 ICPC 比赛现场',
  date: '2026-08',
  desc: '可选说明'
}
```

当前 `photos` 数组为空，页面显示的是占位卡片。照片建议统一方向和比例，控制文件体积，并使用清晰、稳定的英文文件名。

### 6.5 更新正式比赛日程

编辑 `docs/public/offline-contests.json`：

```json
{
  "name": "比赛名称",
  "date": "2026-09-01",
  "location": "线上或城市/学校",
  "url": "https://example.com",
  "status": "upcoming"
}
```

当前组件只是按 JSON 数组顺序展示，并不会根据 `date` 或 `status` 自动过滤、排序或删除过期比赛。因此需要人工把近期比赛放在前面，并及时移除已结束项目。

### 6.6 修改导航、社交链接和公告

| 内容 | 修改位置 |
| --- | --- |
| 顶部导航 | `docs/.vitepress/config.mts` 的 `themeConfig.nav` |
| GitHub、QQ、B 站图标链接 | `docs/.vitepress/config.mts` 的 `socialLinks` |
| 右侧栏 QQ/B 站链接与公告 | `RightSidebar.vue` |
| 招新页 QQ/B 站入口 | `docs/join.md` |
| 欢迎页标语和按钮 | `HeroBanner.vue` |
| 站点运行起始日期 | `SiteRuntime.vue` 中的 `BIRTH` |
| 页脚文字和年份 | `docs/.vitepress/config.mts` 的 `footer` |

同一联系方式目前可能在多个文件中重复出现，修改时应全仓库搜索旧链接，避免只改一处。

### 6.7 静态资源路径

网站部署在子路径 `/xauat-acm.github.io/` 下。在 Vue 组件中引用 `docs/public/` 里的资源或站内路由时，优先使用 VitePress 的 `withBase()`：

```vue
<script setup>
import { withBase } from 'vitepress'
</script>

<img :src="withBase('/images/example.png')" alt="说明">
<a :href="withBase('/team')">成员归档</a>
```

Markdown 正文中的站内资源通常会由 VitePress 处理，但自定义 Vue 模板中的硬编码 `/path` 可能绕过 `base`，在 GitHub Pages 子路径部署时产生 404。

## 7. 主题与组件

当前实际生效的主题入口是 `docs/.vitepress/theme/index.ts`。它扩展 VitePress 默认主题，并使用插槽加入以下功能：

| 组件 | 功能 | 使用位置 |
| --- | --- | --- |
| `HeroBanner.vue` | 根路径全屏欢迎页、Typed.js 标语、进入动画 | `docs/index.md` |
| `PostMeta.vue` | 文章日期、分类和标签 | 文章页面正文前 |
| `RightSidebar.vue` | 站点数据、公告、最新文章、分类、标签云 | 非文章页右侧栏，窄屏隐藏 |
| `HomeContestRanking.vue` | 推荐训练比赛和正式比赛日程 | `/home` 正文后 |
| `ContestBoard.vue` | 线上近期比赛列表和难度星级 | `/training` |
| `Pagination.vue` | 首页文章分页 | `/home` |
| `GiscusWrapper.vue` | 判断是否显示评论 | 根路径和文章详情页 |
| `Giscus.vue` | 加载 Giscus 评论脚本 | 评论区域 |
| `FloatingPanel.vue` | 回到顶部按钮 | 全局底部插槽 |
| `SiteRuntime.vue` | 建站时长 | 页面页脚附加信息 |
| `CanvasRibbon.vue` | 加载背景飘带脚本 | 全局底部插槽 |

全局样式集中在 `docs/.vitepress/theme/styles/custom.css`。`team.md` 还包含页面内联样式，部分组件也使用 `<style scoped>`。改色或改布局时需要同时搜索 CSS 变量和硬编码色值，不能只改一处。

## 8. 外部服务和网络依赖

| 服务 | 配置位置 | 网络不可用时的表现 |
| --- | --- | --- |
| Giscus | `Giscus.vue` | 评论区无法加载，正文仍可用 |
| 不蒜子 | `config.mts` 和主题页脚 | UV/PV 不显示，正文仍可用 |
| Typed.js | `HeroBanner.vue` | 欢迎页打字动画不工作 |
| canvas-ribbon | `CanvasRibbon.vue` | 背景动画不工作 |
| Codeforces API | 抓取脚本和 `ContestBoard.vue` | 使用构建时旧数据或显示空状态 |
| AtCoder、牛客、洛谷 | `fetch-contests.mjs` | 对应平台数据缺失，构建继续 |

Giscus 当前已经配置为仓库 `snake-wing/xauat-acm.github.io`，Discussion 分类为 `Announcements`，不是占位配置。迁移仓库时必须重新生成并替换仓库 ID 和分类 ID。

## 9. GitHub Pages 部署

部署工作流位于 `.github/workflows/deploy.yml`，触发方式有三种：

- 推送到 `main` 或 `master`。
- 在 GitHub Actions 页面手动运行。
- 定时任务每 6 小时运行一次，用于刷新比赛数据。

工作流依次执行：

1. 检出完整 Git 历史。
2. 安装 Node.js 20，并启用 npm 缓存。
3. 执行 `npm ci`。
4. 执行 `npm run build`，先抓取比赛再运行 VitePress 构建。
5. 上传 `docs/.vitepress/dist/`。
6. 使用 GitHub Pages 发布。

仓库的 GitHub Pages Source 应设置为 **GitHub Actions**。部署账号需要保持工作流中的 `pages: write` 和 `id-token: write` 权限。

推荐维护流程：

```bash
git pull origin main
git switch -c content/update-description
npm ci
npm run dev

# 修改并检查后
npx vitepress build docs
git status
git add README.md docs/需要提交的文件
git commit -m "docs: 更新协会官网内容"
git push origin content/update-description
```

建议通过 Pull Request 合并，特别是修改 `award.md`、主题组件、构建脚本或部署配置时。

## 10. 仓库或域名迁移清单

如果网站迁移到新 GitHub 用户、协会组织、新仓库或自定义域名，至少检查以下位置：

- `docs/.vitepress/config.mts`
  - `base`
  - favicon 的绝对路径
  - GitHub 社交链接
  - `editLink.pattern`
  - 页脚信息
- `scripts/fetch-contests.mjs`
  - `USER_AGENT` 中的仓库地址
- `docs/.vitepress/theme/components/Giscus.vue`
  - 仓库名、仓库 ID、Discussion 分类和分类 ID
- `docs/join.md`、`RightSidebar.vue`
  - GitHub Discussions、QQ 和 B 站链接
- `.github/workflows/deploy.yml`
  - 部署分支和 Pages 设置

常见 `base` 规则：

| 部署方式 | `base` 示例 |
| --- | --- |
| `用户名.github.io` 用户主页仓库 | `/` |
| 普通项目仓库 `repo-name` | `/repo-name/` |
| 自定义域名 | 通常为 `/`，并另外配置 CNAME |

## 11. 当前待完善事项

以下内容来自对当前源码的核对，不代表已经实施修改：

| 优先级 | 事项 | 当前状态或影响 |
| --- | --- | --- |
| 高 | 替换成员示例数据 | `team.md` 仍是张三、李四等示例姓名和链接 |
| 高 | 补充照片墙 | `gallery.md` 的 `photos` 数组为空 |
| 高 | 清理过期正式比赛 | 组件不自动过滤日期；截至本文核对日，JSON 中已有到期或当天项目 |
| 中 | 配置 B 站链接 | 导航、右侧栏和招新页仍使用 `#` 或“敬请期待” |
| 中 | 修正文案“每 30 秒自动刷新” | 实际每 30 秒只更新倒计时；全平台数据主要每 6 小时构建更新 |
| 中 | 全面检查子路径链接 | 少量组件或页面仍直接使用 `/favicon.png`、`/`、原始文章 URL，可能绕过 `base` |
| 中 | 清理或归档旧站文件 | 旧站压缩包和解压资源已被 Git 跟踪，仓库体积较大 |
| 低 | 删除或恢复未使用组件 | `Layout.vue`、`TypedBanner.vue`、`GeoDecor.vue` 当前未生效 |
| 低 | 整理深色样式 | 已固定浅色主题，但大量深色 CSS 仍保留 |
| 低 | 修正旧图片说明 | 《图片替换指南》仍称图片为 1×1 占位图，与当前资源不符 |
| 低 | 增加质量检查脚本 | `package.json` 目前没有 lint、单元测试或链接检查命令 |

此外，`.gitignore` 末尾存在异常的空字符编码痕迹。它暂时仍能忽略部分目录，但后续应统一保存为 UTF-8 纯文本并重新核对规则。

## 12. 故障排查

### 页面或图片在本地正常、部署后 404

优先检查 `config.mts` 的 `base`，再检查 Vue 模板是否硬编码了以 `/` 开头的地址。项目仓库部署应通过 `withBase()` 生成站内链接。

### 比赛数据为空

1. 查看 GitHub Actions 的“构建网站”日志。
2. 检查 `docs/public/contests.json` 的 `failedPlatforms` 和 `error`。
3. 分别访问各平台确认其接口或网页是否可用。
4. 必要时手工执行 `npm run fetch-contests`，但提交前检查生成的差异。

### Giscus 评论不显示

确认仓库已启用 Discussions、已安装 Giscus App，并检查 `Giscus.vue` 中的仓库 ID 和分类 ID 是否仍对应当前仓库。

### Actions 成功但访问到旧页面

确认 Pages Source 是 GitHub Actions，查看最新 deployment 的实际 URL，并尝试浏览器强制刷新。还应确认访问 URL 包含正确的仓库子路径。

### 内容修改后没有进入首页

确认文章位于 `docs/posts/`、扩展名是 `.md`、Frontmatter 的 `date` 可被 JavaScript 正确解析，并重新启动开发服务器或重新构建。

## 13. 维护检查表

每次内容更新：

- [ ] 页面文字、姓名、日期和链接已经复核。
- [ ] 没有提交真实个人隐私或不应公开的信息。
- [ ] 图片已压缩，文件名稳定且引用路径正确。
- [ ] 本地页面可以访问，手机宽度下没有明显溢出。
- [ ] `npx vitepress build docs` 成功。
- [ ] `git status` 中只有本次计划提交的文件。

每月或每学期：

- [ ] 更新招新公告、活动安排和成员名单。
- [ ] 更新获奖记录并保留原始名单依据。
- [ ] 清理过期正式比赛。
- [ ] 检查 QQ、GitHub、比赛平台等外部链接。
- [ ] 检查 GitHub Actions 最近一次定时构建是否成功。

每年：

- [ ] 更新页脚版权年份。
- [ ] 核对建站起始时间、协会简介和招新 FAQ。
- [ ] 运行依赖安全与升级检查，升级后完成全站回归。
- [ ] 评估旧站参考文件和原始获奖资料是否需要归档。

---

维护原则：普通内容优先修改 `docs/*.md`，网站配置修改 `config.mts`，全局样式修改 `custom.css`；不要手工编辑 `docs/.vitepress/dist/` 或 `cache/`，也不要把自动抓取的数据误当作人工长期数据源。

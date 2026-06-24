/**
 * 构建时比赛数据 + 平台图标抓取脚本
 * 在 npm run build 之前执行:
 *   1. 从各大 OJ 平台抓取近期比赛数据 → docs/public/contests.json
 *   2. 下载各平台真实 favicon → docs/public/icons/ (本地引用，避免跨域导航问题)
 *
 * 数据源:
 *   Codeforces — 官方 API (codeforces.com/api/contest.list)
 *   AtCoder    — 官网页面抓取 (atcoder.jp/contests)
 *   Luogu      — _contentOnly JSON API (luogu.com.cn/contest/list)
 *   NowCoder   — 日历 JSON API  (ac.nowcoder.com/acm/calendar/contest)
 */

import { writeFileSync, mkdirSync } from 'node:fs'

const NOW_SEC = Math.floor(Date.now() / 1000)
const USER_AGENT = 'Mozilla/5.0 (compatible; XauatACM/1.0; +https://github.com/snake-wing/xauat-acm.github.io)'

/* ================================================================
 * 难度分析 (与前端 ContestBoard.vue 逻辑保持同步)
 * ================================================================ */

function analyzeCF(name) {
  // 统一格式：CF API 可能返回 "Div.1" 或 "Div. 1"
  const n = name.toLowerCase().replace(/div\.\s*(\d)/g, 'div.$1')

  // ═══ 6★ ═══
  if ((/div\.1/).test(n) && !(/div\.[234]/).test(n))
    return { stars: 6, label: 'Div.1' }
  if ((/div\.1/).test(n) && (/div\.2/).test(n))
    return { stars: 6, label: 'Div.1+2' }
  if (n.includes('global'))
    return { stars: 6, label: 'Global' }
  if (n.includes('world finals'))
    return { stars: 6, label: 'World Finals' }

  // ═══ 4★: Edu (对标牛客练习赛) — 必须在 Div.2 之前 ═══
  if (n.includes('educational'))
    return { stars: 4, label: 'Edu' }

  // ═══ 5★: Div.2 ═══
  if ((/div\.2/).test(n))
    return { stars: 5, label: 'Div.2' }
  if (n.includes('championship') || n.includes('cup'))
    return { stars: 5, label: 'Cup' }
  if (n.includes('icpc'))
    return { stars: 5, label: 'ICPC' }
  if (n.includes('ioi') || n.includes('helvetic'))
    return { stars: 5, label: 'IOI' }

  // ═══ 3★: Div.3 (对标牛客周赛) ═══
  if ((/div\.3/).test(n)) return { stars: 3, label: 'Div.3' }
  if (n.includes('kotlin')) return { stars: 3, label: 'Kotlin' }

  // ═══ 2★ ═══
  if ((/div\.4/).test(n)) return { stars: 2, label: 'Div.4' }
  if (n.includes('april fool')) return { stars: 2, label: '趣题' }

  return { stars: 4, label: '' }
}

function analyzeAT(title) {
  const n = title.toLowerCase()

  // ═══ 6★: AGC / ARC (算法硬核, Div.1 级别) ═══
  if (n.includes('grand') || n.includes('agc'))
    return { stars: 6, label: 'AGC' }
  if (n.includes('regular') || n.includes('arc'))
    return { stars: 6, label: 'ARC' }

  // ═══ 5★: AHC (启发式, 较 ARC 简单) ═══
  if (n.includes('heuristic') || n.includes('ahc'))
    return { stars: 5, label: 'AHC' }

  // ═══ 3★: ABC (入门) ═══
  if (n.includes('beginner') || n.includes('abc'))
    return { stars: 3, label: 'ABC' }

  return { stars: 4, label: '' }
}

function analyzeNC(name) {
  // ═══ 6★: 挑战赛 / 多校集训 ═══
  if (name.includes('挑战赛'))
    return { stars: 6, label: '挑战赛' }
  if (name.includes('多校') || name.includes('暑期') || name.includes('寒假'))
    return { stars: 6, label: '集训' }

  // ═══ 5★: 月赛 ═══
  if (name.includes('月赛') && !name.includes('小白'))
    return { stars: 5, label: '月赛' }

  // ═══ 4★: 练习赛 / 排位赛 (对标 CF Edu) ═══
  if (name.includes('练习赛') || name.includes('练习'))
    return { stars: 4, label: '练习赛' }
  if (name.includes('排位'))
    return { stars: 4, label: '排位赛' }
  if (name.includes('校赛') || name.includes('邀请赛'))
    return { stars: 4, label: '邀请赛' }

  // ═══ 3★: 小白月赛 / 周赛 (对标 CF Div.3) ═══
  if (name.includes('小白'))
    return { stars: 3, label: '小白月赛' }
  if (name.includes('周赛'))
    return { stars: 3, label: '周赛' }

  return { stars: 3, label: '' }
}

function analyzeLG(name) {
  if (name.includes('省选') || name.includes('NOI') || name.includes('省队')) return { stars: 6, label: '省选' }
  if (name.includes('Div.1') || name.includes('div1')) return { stars: 5, label: 'Div.1' }
  if (name.includes('Div.2') || name.includes('div2')) return { stars: 4, label: 'Div.2' }
  if (name.includes('月赛')) return { stars: 4, label: '月赛' }
  if (name.includes('公开赛') || name.includes('团队')) return { stars: 4, label: '' }
  if (name.includes('Div.3') || name.includes('div3')) return { stars: 3, label: 'Div.3' }
  if (name.includes('入门') || name.includes('新手') || name.includes('试练')) return { stars: 2, label: '入门' }
  if (name.includes('Div.4') || name.includes('div4')) return { stars: 2, label: 'Div.4' }
  return { stars: 3, label: '' }
}

function starColor(s) {
  if (s >= 6) return '#ef4444'
  if (s >= 5) return '#f59e0b'
  if (s >= 4) return '#8b5cf6'
  if (s >= 3) return '#3b82f6'
  return '#22c55e'
}

/* ================================================================
 * API 抓取函数
 * ================================================================ */

async function fetchCF() {
  console.log('[CF] Fetching...')
  const res = await fetch('https://codeforces.com/api/contest.list?gym=false')
  const data = await res.json()
  if (data.status !== 'OK') throw new Error(data.comment)
  const contests = data.result
    .filter(c => c.phase === 'BEFORE')
    .slice(0, 8)
    .map(c => {
      const diff = analyzeCF(c.name)
      return {
        id: `cf-${c.id}`,
        name: c.name,
        platform: 'Codeforces',
        platformColor: '#1f8acb',
        startTimeSeconds: c.startTimeSeconds,
        durationSeconds: c.durationSeconds,
        url: `https://codeforces.com/contests/${c.id}`,
        stars: diff.stars,
        starLabel: diff.label,
        starColor: starColor(diff.stars),
      }
    })
  console.log(`[CF] ${contests.length} upcoming`)
  return contests
}

async function fetchAT() {
  console.log('[AT] Fetching...')
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 20000)

  try {
    const res = await fetch('https://atcoder.jp/contests/', {
      headers: { 'User-Agent': USER_AGENT },
      signal: controller.signal,
    })
    const html = await res.text()
    clearTimeout(timeout)

    // 定位 upcoming contests 表格
    const idx = html.indexOf('id="contest-table-upcoming"')
    if (idx === -1) { console.log('[AT] No upcoming section found'); return [] }
    const endIdx = html.indexOf('id="contest-table-recent"', idx)
    const section = html.slice(idx, endIdx > idx ? endIdx : idx + 30000)

    // 正则匹配: <tr>...<time>TIME</time>...<a href="/contests/ID">NAME</a>...<td>HH:MM</td>
    const rowRe = /<tr>[\s\S]*?<time[^>]*>([^<]+)<\/time>[\s\S]*?<a\s+href="\/contests\/([^"?\s]+)"[^>]*>([^<]+)<\/a>[\s\S]*?<td[^>]*>\s*(\d+):(\d+)\s*<\/td>/g
    const contests = []
    let m
    while ((m = rowRe.exec(section)) !== null) {
      // m[1]=time, m[2]=id, m[3]=name, m[4]=hours, m[5]=minutes
      const [, timeStr, id, name, h, min] = m
      const startSec = Math.floor(new Date(timeStr).getTime() / 1000)
      if (isNaN(startSec)) continue
      const durSec = parseInt(h) * 3600 + parseInt(min) * 60
      const diff = analyzeAT(name)
      contests.push({
        id: `at-${id}`,
        name: name.trim(),
        platform: 'AtCoder',
        platformColor: '#1a1a1a',
        startTimeSeconds: startSec,
        durationSeconds: durSec,
        url: `https://atcoder.jp/contests/${id}`,
        stars: diff.stars,
        starLabel: diff.label,
        starColor: starColor(diff.stars),
      })
    }
    console.log(`[AT] ${contests.length} upcoming`)
    return contests
  } catch (err) {
    clearTimeout(timeout)
    throw err
  }
}

async function fetchLG() {
  console.log('[LG] Fetching...')
  const LG_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  // 拉取 2 页以覆盖所有即将开始的比赛
  const allItems = []
  for (const page of [1, 2]) {
    try {
      const res = await fetch(`https://www.luogu.com.cn/contest/list?page=${page}`, {
        headers: {
          'User-Agent': LG_UA,
          'x-lentille-request': 'content-only',
          'Accept': 'application/json',
          'Referer': 'https://www.luogu.com.cn/',
        },
      })
      const data = await res.json()
      const items = data?.data?.contests?.result || data?.currentData?.contests?.result || []
      allItems.push(...items)
    } catch { break }
  }
  const contests = allItems
    .filter(c => (c.startTime || 0) > NOW_SEC && c.visibility !== 0)
    .slice(0, 6)
    .map(c => {
      const diff = analyzeLG(c.name || '')
      return {
        id: `lg-${c.id}`,
        name: c.name || '未知',
        platform: 'Luogu',
        platformColor: '#e67e22',
        startTimeSeconds: c.startTime || 0,
        durationSeconds: Math.max((c.endTime || c.startTime + 14400) - (c.startTime || 0), 3600),
        url: `https://www.luogu.com.cn/contest/${c.id}`,
        stars: diff.stars,
        starLabel: diff.label,
        starColor: starColor(diff.stars),
      }
    })
  console.log(`[LG] ${contests.length} upcoming`)
  return contests
}

async function fetchNC() {
  console.log('[NC] Fetching...')
  const now = new Date()
  const year = now.getFullYear()
  const months = [now.getMonth() + 1, now.getMonth() + 2, now.getMonth() + 3]
  const all = []

  for (const m of months) {
    const mon = m > 12 ? m - 12 : m
    const yr = m > 12 ? year + 1 : year
    try {
      const url = `https://ac.nowcoder.com/acm/calendar/contest?token=&month=${yr}-${mon}&_=${Date.now()}`
      const res = await fetch(url)
      const data = await res.json()
      for (const item of data?.data || []) {
        const startMs = Number(item.startTime) || 0
        const startSec = startMs > 1e12 ? Math.floor(startMs / 1000) : startMs
        if (startSec <= NOW_SEC) continue
        const durMs = Number(item.duration) || 7200000
        const durSec = durMs > 1e6 ? Math.floor(durMs / 1000) : durMs
        const cname = item.contestName || item.name || ''
        const diff = analyzeNC(cname)
        all.push({
          id: `nc-${item.contestId || item.id || startSec}`,
          name: cname || '未知',
          platform: 'NowCoder',
          platformColor: '#5cb85c',
          startTimeSeconds: startSec,
          durationSeconds: durSec || 7200,
          url: item.link || item.contestUrl || `https://ac.nowcoder.com/acm/contest/${item.contestId || ''}`,
          stars: diff.stars,
          starLabel: diff.label,
          starColor: starColor(diff.stars),
        })
      }
    } catch (e) { /* skip failed month */ }
  }

  console.log(`[NC] ${all.length} upcoming`)
  return all.slice(0, 6)
}

/* ================================================================
 * 平台图标下载 — 获取各 OJ 真实 favicon 存到本地
 * ================================================================ */

const PLATFORM_ICONS = [
  { name: 'codeforces', url: 'https://codeforces.com/favicon.ico' },
  { name: 'atcoder',    url: 'https://atcoder.jp/favicon.ico' },
  { name: 'nowcoder',   url: 'https://ac.nowcoder.com/favicon.ico' },
  { name: 'luogu',      url: 'https://www.luogu.com.cn/favicon.ico' },
  { name: 'hdu',        url: 'https://acm.hdu.edu.cn/favicon.ico' },
  { name: 'acwing',     url: 'https://www.acwing.com/favicon.ico' },
]

async function downloadFavicons() {
  console.log('[Icons] Downloading favicons...')
  mkdirSync('docs/public/icons', { recursive: true })

  for (const { name, url } of PLATFORM_ICONS) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 15000)
      const res = await fetch(url, { signal: controller.signal })
      clearTimeout(timeout)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buf = Buffer.from(await res.arrayBuffer())
      writeFileSync(`docs/public/icons/${name}.ico`, buf)
      console.log(`[Icons] ${name} ✅ ${buf.length} bytes`)
    } catch (err) {
      console.log(`[Icons] ${name} ⚠️ ${err.message} (will use fallback)`)
    }
  }
}

/* ================================================================
 * 主流程
 * ================================================================ */

async function main() {
  console.log('=== XAUAT ACM Contest Fetcher ===')
  console.log(`Time: ${new Date().toISOString()}`)

  // 并行：比赛数据 + 图标下载
  const results = await Promise.allSettled([
    fetchCF(), fetchAT(), fetchNC(), fetchLG(),
  ])
  downloadFavicons() // fire-and-forget, 不与比赛数据互相阻塞

  const all = []
  const failed = []
  const names = ['Codeforces', 'AtCoder', 'NowCoder', 'Luogu']
  for (let i = 0; i < results.length; i++) {
    const r = results[i]
    if (r.status === 'fulfilled') {
      all.push(...r.value)
    } else {
      failed.push(names[i])
      console.error(`[${names[i]}] FAILED: ${r.reason?.message || r.reason}`)
    }
  }

  all.sort((a, b) => a.startTimeSeconds - b.startTimeSeconds)

  const output = {
    updatedAt: Date.now(),
    updatedAtISO: new Date().toISOString(),
    total: all.length,
    failedPlatforms: failed,
    contests: all.slice(0, 15),
  }

  const outPath = 'docs/public/contests.json'
  writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf-8')

  // Summary
  console.log('')
  console.log(`=== Done: ${all.length} contests (${all.slice(0,15).length} shown) ===`)
  if (failed.length) console.log(`Failed platforms: ${failed.join(', ')}`)
  console.log(`Output: ${outPath}`)

  // Platform breakdown
  for (const p of ['Codeforces', 'AtCoder', 'NowCoder', 'Luogu']) {
    const count = all.filter(c => c.platform === p).length
    console.log(`  ${p}: ${count}`)
  }
}

main().catch(err => {
  console.error('FATAL:', err)
  // Don't exit with error — let the build continue even if fetcher fails
  // Write empty data so the site still works
  writeFileSync('docs/public/contests.json', JSON.stringify({
    updatedAt: Date.now(),
    updatedAtISO: new Date().toISOString(),
    total: 0,
    failedPlatforms: ['Codeforces', 'AtCoder', 'NowCoder', 'Luogu'],
    contests: [],
    error: err.message,
  }, null, 2), 'utf-8')
  console.log('Wrote empty fallback data, build will continue.')
})

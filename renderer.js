// const NIM = require('./sdk/NIM_Web_NIM_v8.9.12711-alpha.3')
const NIM = require('./sdk/NIM_Web_NIM')
// const NIM = require('./sdk/NIM_Web_NIM_v8.9.12706')
const Test = require('./test')
const { buildMockRoamingPackets } = require('./mock-roaming')

document.getElementById('node-ver').textContent = process.versions.node
document.getElementById('electron-ver').textContent = process.versions.electron

// ===== localStorage 回填 appkey/token/account =====
const LS_KEY = 'nim-hwl-idb-test'
const appkeyInput = /** @type {HTMLInputElement} */ (document.getElementById('l-appkey'))
const tokenInput = /** @type {HTMLInputElement} */ (document.getElementById('l-token'))
const accountInput = /** @type {HTMLInputElement} */ (document.getElementById('l-account'))
const wDbInput = /** @type {HTMLInputElement} */ (document.getElementById('w-db'))

function loadCreds () {
  try {
    const saved = JSON.parse(localStorage.getItem(LS_KEY) || '{}')
    if (saved.appkey) appkeyInput.value = saved.appkey
    if (saved.token) tokenInput.value = saved.token
    if (saved.account) accountInput.value = saved.account
  } catch (e) { console.warn('loadCreds failed', e) }
}
function saveCreds () {
  localStorage.setItem(LS_KEY, JSON.stringify({
    appkey: appkeyInput.value,
    token: tokenInput.value,
    account: accountInput.value,
  }))
}
function syncDbName () {
  wDbInput.value = `nim-${accountInput.value}`
}
loadCreds()
syncDbName()
accountInput.addEventListener('input', syncDbName)

// ===== 视图切换 =====
const views = {
  home: document.getElementById('view-home'),
  'db-test': document.getElementById('view-db-test'),
}
const navBtns = document.querySelectorAll('nav.topbar [data-goto]')
function showView (name) {
  Object.entries(views).forEach(([key, el]) => {
    if (key === name) el.removeAttribute('hidden')
    else el.setAttribute('hidden', '')
  })
  navBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.goto === name))
}
navBtns.forEach(btn => {
  btn.addEventListener('click', () => showView(btn.dataset.goto))
})
showView('home')

// ===== NIM 登录 / 登出 / 销毁 =====
document.getElementById('login').addEventListener('click', login)
document.getElementById('login-mock-roaming').addEventListener('click', loginMockRoaming)
document.getElementById('disconnect').addEventListener('click', disconnect)
document.getElementById('destroy').addEventListener('click', destroy)

// 是否在 onconnect 后注入 1w mock 漫游消息
let triggerMockRoamingOnConnect = false

function doLog (err, obj) {
  console.log('receive: ', err, obj)
}

function disconnect () {
  window.nim.disconnect({ done (err) { console.log('disconnect success', err) } })
}

function destroy () {
  window.nim.destroy({ done (err) { console.log('destroy success', err) } })
}

/** 触发 1w mock 漫游消息：按 sessionId 拆 100 批，每批 100 条，逐批注入 nim.protocol.onMessage */
function fireMockRoamingBatches () {
  const nim = window.nim
  if (!nim || !nim.protocol || typeof nim.protocol.onMessage !== 'function') {
    console.error('[mock-roaming] nim.protocol.onMessage 不可用，请先登录')
    return
  }
  const account = nim.account
  if (!account) {
    console.error('[mock-roaming] nim.account 为空，无法构造 sessionId')
    return
  }
  const packets = buildMockRoamingPackets({ account, batchCount: 100, batchSize: 100, start: 100 })
  console.log('[mock-roaming] 开始注入', packets.length, '批，account=', account)
  startMockMeasure() // 提交数据起点：注入循环开始
  console.time('[mock-roaming] inject all batches')
  for (let i = 0; i < packets.length; i++) {
    try {
      nim.protocol.onMessage(packets[i])
      console.log(`[mock-roaming] 批次 ${i + 1}/${packets.length} 已注入 (p2p-cs${100 + i}, 100 条)`)
    } catch (e) {
      console.error(`[mock-roaming] 批次 ${i + 1}/${packets.length} 注入异常`, e)
    }
  }
  console.timeEnd('[mock-roaming] inject all batches')
  console.log('[mock-roaming] 全部批次注入完成，等待 onsyncdone…')
}

// ===== mock 注入耗时 + 内存采样（提交 → syncdone） =====
let mockMeasure = null
const MOCK_MEASURE_TIMEOUT_MS = 120000 // 兜底：120s 内未收到 syncdone 则强制结算

function mb (bytes) { return (bytes / 1024 / 1024).toFixed(2) + ' MB' }

function startMockMeasure () {
  if (mockMeasure) return
  const t0 = performance.now()
  const samples = []
  const timer = setInterval(() => {
    const m = process.memoryUsage()
    samples.push({ t: performance.now() - t0, heapUsed: m.heapUsed, heapTotal: m.heapTotal, rss: m.rss })
  }, 50)
  mockMeasure = {
    t0,
    samples,
    timer,
    fallback: setTimeout(endMockMeasure, MOCK_MEASURE_TIMEOUT_MS, true),
  }
  console.log('[mock-measure] 计时开始，内存采样间隔 50ms（兜底超时 ' + (MOCK_MEASURE_TIMEOUT_MS / 1000) + 's）')
}

function endMockMeasure (fromFallback) {
  if (!mockMeasure) return
  const elapsed = performance.now() - mockMeasure.t0
  clearInterval(mockMeasure.timer)
  clearTimeout(mockMeasure.fallback)
  const samples = mockMeasure.samples
  mockMeasure = null

  if (!samples.length) {
    console.log('[mock-measure] 无内存采样')
    return
  }
  let peakHeap = -Infinity, troughHeap = Infinity
  let peakRss = -Infinity, troughRss = Infinity
  for (const s of samples) {
    if (s.heapUsed > peakHeap) peakHeap = s.heapUsed
    if (s.heapUsed < troughHeap) troughHeap = s.heapUsed
    if (s.rss > peakRss) peakRss = s.rss
    if (s.rss < troughRss) troughRss = s.rss
  }
  const t0 = samples[0].t, t1 = samples[samples.length - 1].t
  console.log('[mock-measure] ' + (fromFallback ? '⚠️ 未收到 syncdone，兜底结算：' : '收到 syncdone，结算：'))
  console.log('[mock-measure] 提交 → syncdone 耗时 ≈ ' + elapsed.toFixed(0) + ' ms')
  console.log('[mock-measure] heapUsed 峰值 ' + mb(peakHeap) + ' / 波谷 ' + mb(troughHeap) + ' (峰值出现于 ' + (samples.find(s => s.heapUsed === peakHeap).t).toFixed(0) + 'ms)')
  console.log('[mock-measure] rss      峰值 ' + mb(peakRss) + ' / 波谷 ' + mb(troughRss) + ' (峰值出现于 ' + (samples.find(s => s.rss === peakRss).t).toFixed(0) + 'ms)')
  console.log('[mock-measure] 采样 ' + samples.length + ' 次，窗口 ' + t0.toFixed(0) + 'ms ~ ' + t1.toFixed(0) + 'ms')
}

function loginMockRoaming () {
  triggerMockRoamingOnConnect = true
  login()
}

function login () {
  const appKey = appkeyInput.value
  const account = accountInput.value
  const token = tokenInput.value
  saveCreds()
  syncDbName()
  console.log('trigger login')
  window.nim = NIM.getInstance({
    logLevel: 'info',
    dbLog: false,
    appKey,
    account,
    token,
    queryOption: 1,
    enablePinyin: false,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 60000,
    reconnectionJitter: 0,
    searchDBPath: process.env.HOME,
	maxUnreadCount: 500,

    onconnect (obj) {
      console.log('连接建立成功', obj)
      window.test = new Test()
      if (triggerMockRoamingOnConnect) {
        triggerMockRoamingOnConnect = false
        const nim = window.nim
        // 监听内部 syncStart 事件，触发后 setTimeout(0) 注入 mock 漫游消息批次
        if (nim && nim.protocol && nim.protocol.reporterHook && typeof nim.protocol.reporterHook.once === 'function') {
          console.log('[mock-roaming] 等待 reporter/syncStart 事件…')
          nim.protocol.reporterHook.once('reporter/syncStart', () => {
            console.log('[mock-roaming] 收到 reporter/syncStart，setTimeout(0) 后注入')
            setTimeout(fireMockRoamingBatches, 0)
          })
        } else {
          console.error('[mock-roaming] nim.protocol.reporterHook.once 不可用，回退到 setTimeout(0)')
          setTimeout(fireMockRoamingBatches, 0)
        }
      }
    },
    onerror () { console.error('error') },
    onwillreconnect (obj) { console.log(obj) },
    ondisconnect (error) {
      const map = { PC: '电脑版', Web: '网页版', Android: '手机版', iOS: '手机版', WindowsPhone: '手机版' }
      const str = error.from
      const errorMsg = `你的帐号于${new Date()}被${map[str] || '其他端'}踢出下线，请确定帐号信息安全!`
      switch (error.code) {
        case 302:
          console.log('帐号或密码错误')
          window.test = new Test()
          break
        case 'kicked': console.log('被踢'); break
        case 'logout': console.log('登出'); break
        default: console.error(error); break
      }
    },

    onfriends: doLog,
    onsyncfriendaction: doLog,
    onblacklist: doLog,
    onsyncmarkinblacklist: doLog,
    onmyinfo: doLog,
    onupdatemyinfo: doLog,
    onusers: doLog,
    onupdateuser: doLog,
    onteams: doLog,
    onsynccreateteam: doLog,
    onteammembers: doLog,
    onCreateTeam: doLog,
    onDismissTeam: doLog,
    onUpdateTeam: doLog,
    onAddTeamMembers: doLog,
    onRemoveTeamMembers: doLog,
    onUpdateTeamManagers: doLog,
    onupdateteammember: doLog,
    onUpdateTeamMembersMute: doLog,
    onTeamMsgReceipt: doLog,
    onSuperTeams: doLog,
    onSyncCreateSuperTeam: doLog,
    onUpdateSuperTeam: doLog,
    onUpdateSuperTeamMember: doLog,
    onAddSuperTeamMembers: doLog,
    onRemoveSuperTeamMembers: doLog,
    onDismissSuperTeam: doLog,
    onUpdateSuperTeamMembersMute: doLog,

    onsessions (sessions) { console.log('!!!! onsessions', sessions) },
    onupdatesession: doLog,
    onroamingmsgs (obj) { console.log('!!!!! onroamingmsgs', obj, nim) },
    onofflinemsgs (obj) { console.log('!!!!! onroamingmsgs', obj, nim) },
    onmsg (obj) {},

    onsysmsg: doLog,
    onofflinesysmsgs: doLog,
    onupdatesysmsg: doLog,
    onsysmsgunread: doLog,
    onupdatesysmsgunread: doLog,
    onofflinecustomsysmsgs: doLog,
    oncustomsysmsg: doLog,
    onStickTopSessions (session) { console.log('收到置顶会话列表', session) },
    onsyncdone () {
      console.log('onsyncdone')
      if (mockMeasure) endMockMeasure(false)
    },

    onDBStatusChange (status) {
      console.log('db::!!!!!! change status', status)
      if (status === 0 && nim.getDBLastOpenError()) {
        console.log('db::!!!!! db connect failed', nim.getDBLastOpenError())
      }
    },
  })
}

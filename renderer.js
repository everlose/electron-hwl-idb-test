const NIM = require('./sdk/NIM_Web_NIM_v8.9.12711-alpha.3')
// const NIM = require('./sdk/NIM_Web_NIM')
const Test = require('./test')

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
document.getElementById('disconnect').addEventListener('click', disconnect)
document.getElementById('destroy').addEventListener('click', destroy)

function doLog (err, obj) {
  console.log('receive: ', err, obj)
}

function disconnect () {
  window.nim.disconnect({ done (err) { console.log('disconnect success', err) } })
}

function destroy () {
  window.nim.destroy({ done (err) { console.log('destroy success', err) } })
}

function login () {
  const appKey = appkeyInput.value
  const account = accountInput.value
  const token = tokenInput.value
  saveCreds()
  syncDbName()
  console.log('trigger login')
  window.nim = NIM.getInstance({
    debug: true,
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
    onsyncdone () { console.log('onsyncdone') },

    onDBStatusChange (status) {
      console.log('db::!!!!!! change status', status)
      if (status === 0 && nim.getDBLastOpenError()) {
        console.log('db::!!!!! db connect failed', nim.getDBLastOpenError())
      }
    },
  })
}

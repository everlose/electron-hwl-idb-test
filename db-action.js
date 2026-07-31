// DB 测试页操作绑定：5 个操作，按 ID 直连，不再用 class 全局委派
const TAG = 'db-action.js'

function ensureTest () {
  if (!window.test) console.warn(TAG, 'window.test 未初始化，请先登录 NIM')
  return !!window.test
}

function $ (id) { return document.getElementById(id) }

// 1. 批量写入
$('form-write').addEventListener('submit', (e) => {
  e.preventDefault()
  if (!ensureTest()) return
  const sessionId = $('w-sessionId').value
  const keyword = $('w-keyword').value
  const num = $('w-number').value
  if (!num) { console.log('请输入写入条数'); return }
  window.test.writeData(Number(num), keyword || '', sessionId || '')
})

// 2. 批量删除（走自管 IDB transaction）
$('btn-delete').addEventListener('click', () => {
  if (!ensureTest()) return
  const sessionId = $('w-delete-sessionId').value
  if (!sessionId) { console.log('请输入 sessionId'); return }
  window.test.deleteDataInIndexedDB(sessionId)
})

// 3. 逐条读取检查损坏
$('btn-readall').addEventListener('click', () => {
  if (!ensureTest()) return
  window.test.readAll()
})

// 4. 清空 DB
$('btn-clear').addEventListener('click', () => {
  if (!ensureTest()) return
  if (!confirm('确认清空 msg1 对象仓库？此操作不可恢复。')) return
  window.test.clearDb()
})

// 5. 未读数检查
$('form-unread').addEventListener('submit', async (e) => {
  e.preventDefault()
  if (!ensureTest()) return
  const sessionId = $('unread-sessionId').value
  const ack = Number($('unread-ack').value)
  const out = $('unread-out')
  if (!sessionId) { out.textContent = '请输入 sessionId'; return }
  if (!ack && ack !== 0) { out.textContent = '请输入 ack timetag'; return }
  out.textContent = '查询中…'
  const r = await window.test.checkUnread(sessionId, ack)
  if (r) out.innerHTML = `结果: <code>${JSON.stringify(r.result)}</code> | 耗时: <strong>${r.elapsed} ms</strong>`
  else out.textContent = '查询失败，见控制台'
})

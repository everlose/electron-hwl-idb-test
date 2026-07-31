const Mock = require('mockjs')

const TAG_NAME = 'test.js'

/**
 * 直接连已存在的 NIM IndexedDB（不主动创建空库）。
 * 若 DB 不存在（onupgradeneeded 触发），abort 并报错。
 */
function openIDB (name) {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(name)
    req.onupgradeneeded = (e) => {
      const tx = e.target.transaction
      if (tx) tx.abort()
      reject(new Error(`IDB "${name}" 不存在，请先登录 NIM 让其创建该库`))
    }
    req.onsuccess = (e) => resolve(e.target.result)
    req.onerror = (e) => reject(e.target.error)
  })
}

function getDbName () {
  const wDb = document.getElementById('w-db')
  if (wDb && wDb.value) return wDb.value
  return 'nim-' + document.getElementById('l-account').value
}

class Test {
  constructor () {
    this.obj = {
      cc: true,
      'flow|1': ['out', 'in'],
      'from|1': /cs\d{1}/,
      'fromClientType|1': ['Web', 'Android', 'IOS'],
      'fromDeviceId|1': [
        '2fb0d8c26d874a4790a92719a186bea0',
        '3ab0ddc2rtjk4a4790a92719o98jbAa1',
        '4ab0ddc2rtjk4a4790a92719o98jbAa1',
      ],
      'fromNick|1': /nick\d{1}/,
      idClient: /\w{32}/,
      idServer: /\d{12}/,
      isHistoryable: true,
      isLocal: false,
      isOfflinable: true,
      isPushable: true,
      isReplyMsg: true,
      isRoamingable: true,
      isSyncable: true,
      isUnreadable: true,
      needMsgReceipt: false,
      needPushNick: true,
      resend: false,
      scene: 'p2p',
      'sessionId|1': ['p2p-cs1', 'p2p-cs2', 'p2p-cs3'],
      status: 'success',
      'target|1': /cs\d{1}/,
      text: Mock.Random.cparagraph(2, 10),
      'time|1577836800000-1625097600000': 1,
      'to|1': /cs\d{1}/,
      type: 'text',
      'userUpdateTime|1600000000000-1700000000000': 1,
      'content': ''
    }
  }

  /**
   * 批量写入：纯 IDB transaction，每 1000 条一个事务批次
   * @param {Number} num
   * @param {String} text
   * @param {String} [sessionId] 若提供则全部消息固定为该 sessionId
   */
  async writeData (num = 100, text = '', sessionId = '') {
    const dbName = getDbName()
    let db
    try {
      db = await openIDB(dbName)
    } catch (e) {
      console.error(TAG_NAME, e.message)
      return
    }

    const BATCH = 1000
    const tempTime = new Date().getTime()
    console.log(TAG_NAME, `开始批量写入 ${num} 条，每批 ${BATCH} 条${sessionId ? `，固定 sessionId=${sessionId}` : ''}`)

    let written = 0
    while (written < num) {
      const batchCount = Math.min(BATCH, num - written)
      await new Promise((resolve, reject) => {
        const transaction = db.transaction(['msg1'], 'readwrite')
        const objectStore = transaction.objectStore('msg1')
        for (let i = 0; i < batchCount; i++) {
          const temp = Mock.mock(this.obj)
          const txt = text || Mock.Random.cparagraph(2, 10)
          objectStore.add({
            ...temp,
            sessionId: sessionId || temp.sessionId,
            text: txt,
          })
        }
        transaction.oncomplete = function () {
          written += batchCount
          console.log(TAG_NAME, `已写入 ${written}/${num}`)
          resolve()
        }
        transaction.onerror = function () {
          console.error(TAG_NAME, '批次写入失败', transaction.error)
          db.close()
          reject(transaction.error)
        }
        transaction.onabort = function () {
          console.warn(TAG_NAME, '批次写入中止', transaction.error)
          db.close()
          reject(transaction.error)
        }
      })
    }

    console.log(TAG_NAME, `写入完成，共 ${num} 条，耗时 ${new Date().getTime() - tempTime} ms`)
    db.close()
  }

  /**
   * 只写 IndexDB，不写 FTS
   * @param {Number} num
   * @param {String} text
   */
  async writeDataInIndexDB (num = 50000, text) {
    const dbName = getDbName()
    let db
    try {
      db = await openIDB(dbName)
    } catch (e) {
      console.error(TAG_NAME, e.message)
      return
    }

    const transaction = db.transaction(['msg1'], 'readwrite')
    const objectStore = transaction.objectStore('msg1')
    const tempTime = new Date().getTime()

    for (let i = 0; i < num; i++) {
      const temp = Mock.mock(this.obj)
      const txt = text || Mock.Random.cparagraph(2, 10)
      objectStore.add({ ...temp, text: txt })
    }

    transaction.oncomplete = function () {
      console.log(TAG_NAME, 'transaction success, writeDataInIndexDB last:', new Date().getTime() - tempTime, 'ms')
      db.close()
    }
    transaction.onerror = function () {
      console.log(TAG_NAME, 'transaction error:', transaction.error)
      db.close()
    }
  }

  /**
   * 根据主键 idClient 读取
   * @param {String} id
   */
  async readByPrimary (id) {
    const dbName = getDbName()
    let db
    try { db = await openIDB(dbName) } catch (e) { console.error(TAG_NAME, e.message); return }

    const transaction = db.transaction(['msg1'])
    const objectStore = transaction.objectStore('msg1')
    const request = objectStore.get(id)

    console.time(TAG_NAME + ' readByPrimary')
    request.onerror = function () {
      console.log(TAG_NAME, '事务失败')
      db.close()
    }
    request.onsuccess = function () {
      console.timeEnd(TAG_NAME + ' readByPrimary')
      if (request.result) console.log(TAG_NAME, 'GET:', request.result)
      else console.log(TAG_NAME, '未获得数据记录')
    }
    transaction.oncomplete = function () { db.close() }
  }

  /**
   * 逐条游标读取，检查是否损坏
   */
  async readAll () {
    const dbName = getDbName()
    let db
    try { db = await openIDB(dbName) } catch (e) { console.error(TAG_NAME, e.message); return }

    console.log('读取开始', dbName)
    console.time('readAll')
    const transaction = db.transaction(['msg1'], 'readonly')
    const objectStore = transaction.objectStore('msg1')
    const request = objectStore.openCursor()
    let count = 0

    request.onsuccess = function (event) {
      const cursor = event.target.result
      if (cursor) {
        console.debug(cursor.primaryKey)
        count++
        cursor.continue()
      }
    }
    transaction.oncomplete = function () {
      console.log('读取完成共有' + count + '条数据')
      console.timeEnd('readAll')
      db.close()
    }
    transaction.onerror = function (event) {
      console.error(`读取失败, 第 ${count} 条`, event)
      db.close()
    }
  }

  /**
   * 根据关键字读取（依赖 searchDB，暂未接）
   */
  async readByKeyword (text, limit) {
    console.warn(TAG_NAME, 'readByKeyword 未实现（依赖 searchDB）')
  }

  /**
   * 删除：走 NIM API deleteLocalMsgs
   */
  deleteData (sessionId, start = 0, end = 1600000000000) {
    console.log('删除开始')
    console.time('deleteLocalMsgs')
    window.nim.deleteLocalMsgs({
      sessionId,
      start,
      end,
      done (err, datas) {
        if (err) {
          console.error('删除失败', err)
          console.timeEnd('deleteLocalMsgs')
          return
        }
        console.log('删除成功', datas)
        console.timeEnd('deleteLocalMsgs')
      },
    })
  }

  /**
   * 直接用 IDB transaction 删除某 sessionId 区间内的消息
   */
  async deleteDataInIndexedDB (sessionId, start = 0, end = 1600000000000) {
    const dbName = getDbName()
    let db
    try { db = await openIDB(dbName) } catch (e) { console.error(TAG_NAME, e.message); return }

    console.log('删除开始')
    console.time('deleteDataInIndexedDB')
    const transaction = db.transaction(['msg1'], 'readwrite')
    const objectStore = transaction.objectStore('msg1')
    const index = objectStore.index('sessionTime')
    const range = IDBKeyRange.bound([sessionId, start], [sessionId, end], false, false)
    const request = index.openCursor(range)

    request.onsuccess = function (event) {
      const cursor = event.target.result
      if (cursor) {
        objectStore.delete(cursor.primaryKey)
        cursor.continue()
      }
    }
    transaction.oncomplete = function () {
      console.log('删除完成')
      console.timeEnd('deleteDataInIndexedDB')
      db.close()
    }
    transaction.onerror = function () {
      console.error('删除失败')
      db.close()
    }
  }

  /**
   * 清空 msg1 对象仓库（自管 IDB transaction）
   */
  async clearDb () {
    const dbName = getDbName()
    let db
    try { db = await openIDB(dbName) } catch (e) { console.error(TAG_NAME, e.message); return }

    console.log('开始清空 msg1')
    console.time('clearDb')
    const transaction = db.transaction(['msg1'], 'readwrite')
    const objectStore = transaction.objectStore('msg1')
    objectStore.clear()
    transaction.oncomplete = function () {
      console.timeEnd('clearDb')
      console.log(TAG_NAME, '清空完成')
      db.close()
    }
    transaction.onerror = function () {
      console.error(TAG_NAME, '清空失败', transaction.error)
      db.close()
    }
  }

  /**
   * 未读数检查：调用 window.nim.protocol.db.getMsgCountAfterAckIndexedDB
   * @param {String} sessionId  会话 id，带 scene 前缀 p2p-/team-/superTeam-
   * @param {Number} ack        ack timetag，计 (ack, ∞) 范围
   * @param {Function} [shouldCountNotifyUnread] 仅对 type==='notification' 调用，默认 () => true
   */
  async checkUnread (sessionId, ack, shouldCountNotifyUnread = () => true) {
    if (!window.nim || !window.nim.protocol || !window.nim.protocol.db) {
      console.error(TAG_NAME, 'NIM 未初始化，无法调用 getMsgCountAfterAckIndexedDB')
      return null
    }
    const params = { sessionId, ack, shouldCountNotifyUnread }
    console.log(TAG_NAME, 'getMsgCountAfterAckIndexedDB params:', { sessionId, ack })
    const t0 = performance.now()
    let result
    try {
      result = await window.nim.protocol.db.getMsgCountAfterAckIndexedDB(params)
    } catch (e) {
      console.error(TAG_NAME, '未读数查询失败', e)
      return null
    }
    const elapsed = (performance.now() - t0).toFixed(2)
    console.log(TAG_NAME, `未读数 sessionId=${sessionId} ack=${ack}:`, result, `耗时 ${elapsed} ms`)
    return { result, elapsed }
  }

  /**
   * 打印 IndexedDB 占用磁盘大小
   */
  async printUseSize () {
    const obj = await navigator.storage.estimate()
    const size = (obj.usageDetails.indexedDB / 1024 / 1024).toFixed(2)
    console.log(TAG_NAME, `${size} MB`)
  }
}

module.exports = Test

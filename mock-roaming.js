// 漫游消息（sid:4 cid:9）样本（wire-format，已序列化）
// 字段键为协议字段号："0"=type, "1"=from, "5"=sessionId, "7"=time, "11"=idClient, "12"=idServer 等
const SAMPLE_ROAMING_MSGS = [
  { '0': '0', '1': 'ctt5', '2': 'ctt1', '4': '65', '5': 'cb9db6a82f087c0e912e103930847655', '6': 'newNick3', '7': '1785412477989', '8': '3', '9': '', '10': '{"name":"","uploadState":1,"sceneName":"nim_default_im","size":317644,"md5":"6FD8FBBE181D5F62B4E047466EA3AABE","url":"https://nim-mixdn-gy.chatnos.com/MjYxNjY0MzM=/bmltYV8zMzM1NjIyMzc3NjVfMTc4NTQxMjQ3NzE3OF81MmMyYTlhMS05ZWJkLTQ4NDgtYTYwZi1jYjJiODdmYWYxODE=","ext":"mp4","w":640,"h":368,"dur":5083}', '11': '4f460a1a10e78ebd99bd2ba4799e19fa', '12': '18712831136496', '13': '0', '14': '1781686692088', '15': '', '17': '', '18': '#%@all@%#', '20': '0', '25': '1', '26': '0', '28': '1', '40': '', '46': '{"statistics":{"apiCallingTime":1785412477117,"attachUploadDuration":823,"sendTime":1785412477970}}', '62': '0', '63': '', '100': '1', '101': '1', '102': '1', '103': '1', '105': '1', '107': '1', '108': '1', '109': '1', '110': '1' },
  { '0': '0', '1': 'ctt5', '2': 'ctt1', '4': '65', '5': 'cb9db6a82f087c0e912e103930847655', '6': 'newNick3', '7': '1785406194315', '8': '1', '9': '', '10': '{"name":"","uploadState":1,"sceneName":"nim_default_im","size":482689,"md5":"1AE16137625DF97DEDF3139FC5A2F0D5","url":"https://nim-mixdn-gy.chatnos.com/MjYxNjY0MzM=/bmltYV8zMzM1NjIyMzc3NjVfMTc4NTQwNjE5MzE5Ml9hYzRmY2JmNS0zYjVhLTRiNzctOTQ2ZS00ZGI2ZDA4M2QwN2I=","ext":"jpg","w":0,"h":0}', '11': '84d3321c1a48b9756900f0823a52a411', '12': '18711987622031', '13': '0', '14': '1781686692088', '15': '', '17': '', '18': '#%@all@%#', '20': '0', '25': '1', '26': '0', '28': '1', '40': '', '46': '{"statistics":{"apiCallingTime":1785406193121,"attachUploadDuration":1121,"sendTime":1785406194262}}', '62': '0', '63': '', '100': '1', '101': '1', '102': '1', '103': '1', '105': '1', '107': '1', '108': '1', '109': '1', '110': '1' },
  { '0': '0', '1': 'ctt5', '2': 'ctt1', '4': '65', '5': 'cb9db6a82f087c0e912e103930847655', '6': 'newNick3', '7': '1785399711765', '8': '1', '9': '', '10': '{"name":"","uploadState":1,"sceneName":"nim_default_im","size":885029,"md5":"B9CAC298B82B55FE0C6BB0E5F758384B","url":"https://nim-mixdn-gy.chatnos.com/MjYxNjY0MzM=/bmltYV8zMzM1NjIyMzc3NjVfMTc4NTM5OTY3OTgyNV82OGNjNGFlNS1kYTgzLTQ2NjctODAwNC1kMzE5MzQ0ZDJmYTA=","ext":"jpg","w":0,"h":0}', '11': '5c14c4d7d071684602e233ad4333264a', '12': '18711096643757', '13': '0', '14': '1781686692088', '15': '', '17': '', '18': '#%@all@%#', '20': '0', '25': '1', '26': '0', '28': '1', '40': '', '46': '{"statistics":{"apiCallingTime":1785399710710,"attachUploadDuration":1007,"sendTime":1785399711739}}', '62': '0', '63': '', '100': '1', '101': '1', '102': '1', '103': '1', '105': '1', '107': '1', '108': '1', '109': '1', '110': '1' },
  { '0': '0', '1': 'ctt5', '2': 'ctt1', '4': '65', '5': 'cb9db6a82f087c0e912e103930847655', '6': 'newNick3', '7': '1785399681250', '8': '1', '9': '', '10': '{"name":"","uploadState":1,"sceneName":"nim_default_im","size":885029,"md5":"B9CAC298B82B55FE0C6BB0E5F758384B","url":"https://nim-mixdn-gy.chatnos.com/MjYxNjY0MzM=/bmltYV8zMzM1NjIyMzc3NjVfMTc4NTM5OTY3OTgyNV9kZmExYzdiYi03NmE2LTQ1ZDYtODMzZi01ZjJmYjE5NTc1N2I=","ext":"jpg","w":0,"h":0}', '11': '79168bd1b6f41e41ef77a32c0d44ad57', '12': '18711092548359', '13': '0', '14': '1781686692088', '15': '', '17': '', '18': '#%@all@%#', '20': '0', '25': '1', '26': '0', '28': '1', '40': '', '46': '{"statistics":{"apiCallingTime":1785399679768,"attachUploadDuration":1440,"sendTime":1785399681228}}', '62': '0', '63': '', '100': '1', '101': '1', '102': '1', '103': '1', '105': '1', '107': '1', '108': '1', '109': '1', '110': '1' },
  { '0': '0', '1': 'ctt5', '2': 'ctt1', '4': '65', '5': 'cb9db6a82f087c0e912e103930847655', '6': 'newNick3', '7': '1785399648534', '8': '0', '9': '一段不会重复的文本1785399648481', '11': '4fb23bf0a69e04fea2973e672b56412d', '12': '18711087632503', '13': '0', '14': '1781686692088', '15': '', '17': '', '18': '#%@all@%#', '20': '0', '25': '1', '26': '0', '28': '1', '40': '', '46': '{"statistics":{"apiCallingTime":1785399648495,"sendTime":1785399648502}}', '62': '0', '63': '', '100': '1', '101': '1', '102': '1', '103': '1', '105': '1', '107': '1', '108': '1', '109': '1', '110': '1' },
  { '0': '0', '1': 'ctt5', '2': 'ctt1', '4': '65', '5': 'cb9db6a82f087c0e912e103930847655', '6': 'newNick3', '7': '1785399641273', '8': '0', '9': '一段不会重复的文本1785399641224', '11': 'c68b9fb00663d8a6a09e71cf9cf2d597', '12': '18711086469332', '13': '0', '14': '1781686692088', '15': '', '17': '', '18': '#%@all@%#', '20': '0', '25': '1', '26': '0', '28': '1', '40': '', '46': '{"statistics":{"apiCallingTime":1785399641238,"sendTime":1785399641248}}', '62': '0', '63': '', '100': '1', '101': '1', '102': '1', '103': '1', '105': '1', '107': '1', '108': '1', '109': '1', '110': '1' },
  { '0': '0', '1': 'ctt5', '2': 'ctt1', '4': '1', '5': '6a5e978706416e7250f28899abd57e8c', '6': 'newNick3', '7': '1785135489422', '8': '1', '10': '{"name":"46147e03b05c84317c54e03a433add24 (1)","uploadState":1,"sceneName":"nim_default_im","url":"https://nim-mixdn-gy.chatnos.com/MjYxNjY0MzM=/bmltYV8zMzM1NjIyMzc3NjVfMTc4NTEzNTQ3MTUwNl8xMTcyYzVmOC0xYmU4LTQwMzgtYmRhMi04MDlhNjk0MDQ2NGM=","size":20119998,"orientation":"top, left","ext":"jpg","w":5472,"h":3648}', '11': '4dcf5cecbd6a3dc34c888dd8676c7523', '12': '18679404285996', '13': '0', '14': '1781686692088', '20': '0', '24': '0', '25': '1', '26': '0', '28': '1', '46': '{"statistics":{"attachUploadDuration":18064,"apiCallingTime":1785135471320,"sendTime":1785135489387}}', '100': '1', '101': '1', '102': '1', '103': '1', '105': '1', '107': '1', '108': '1', '109': '1', '110': '1' },
  { '0': '0', '1': 'ctt5', '2': 'ctt1', '4': '1', '5': '52bcbc97e35928c040f12ca76541911a', '6': 'newNick3', '7': '1785134598373', '8': '1', '10': '{"name":"46147e03b05c84317c54e03a433add24 (1)","uploadState":1,"sceneName":"nim_default_im","url":"https://nim-mixdn-gy.chatnos.com/MjYxNjY0MzM=/bmltYV8zMzM1NjIyMzc3NjVfMTc4NTEzNDU2NjQxM19kNGEzYjY3NS1mMDMyLTQ0MjItOGMyMS0yNTYxMmZhZTMzMTk=","size":20119998,"orientation":"top, left","ext":"jpg","w":5472,"h":3648}', '11': 'f3c80b9191c8c82958cd7a51df26ff58', '12': '18679278932000', '13': '0', '14': '1781686692088', '20': '0', '24': '0', '25': '1', '26': '0', '28': '1', '46': '{"statistics":{"attachUploadDuration":32097,"apiCallingTime":1785134566229,"sendTime":1785134598330}}', '100': '1', '101': '1', '102': '1', '103': '1', '105': '1', '107': '1', '108': '1', '109': '1', '110': '1' },
  { '0': '0', '1': 'ctt5', '2': 'ctt1', '4': '1', '5': 'bac88d742bf12d3b4b7f3536511a3891', '6': 'newNick3', '7': '1785120721225', '8': '1', '10': '{"name":"46147e03b05c84317c54e03a433add24 (1)","uploadState":1,"sceneName":"nim_default_im","url":"https://nim-mixdn-gy.chatnos.com/MjYxNjY0MzM=/bmltYV8zMzM1NjIyMzc3NjVfMTc4NTEyMDY5MTA0MF9mNzZiMGZlZS0yNWU3LTRhY2UtODFlNi1hZjU4NzY5ODE1Yjk=","size":20119998,"orientation":"top, left","ext":"jpg","w":5472,"h":3648}', '11': 'c96547b4d16a285f37a4c01ee2e6f2a2', '12': '18677328089265', '13': '0', '14': '1781686692088', '20': '0', '24': '0', '25': '1', '26': '0', '28': '1', '46': '{"statistics":{"attachUploadDuration":30351,"apiCallingTime":1785120690821,"sendTime":1785120721179}}', '100': '1', '101': '1', '102': '1', '103': '1', '105': '1', '107': '1', '108': '1', '109': '1', '110': '1' },
  { '0': '0', '1': 'ctt5', '2': 'ctt1', '4': '16', '5': '146f6e81ee934785793e456c108a1d18', '6': 'newNick3', '7': '1784880479692', '8': '1', '10': '{"name":"古书上的白莲子.jpg","uploadState":1,"sceneName":"nim_default_im","size":20119998,"url":"https://nim-nosdn.netease.im/MjYxNjY0MzM=/bmltYV8zMzM1NjIyMzc3NjVfMTc4NDg4MDQ2OTExOV9hNzA3MjA0ZS0xNGRiLTQ2MDQtYTYwMi1kOTczYTc4ZGEyYzQ=","orientation":"top, left","ext":"jpg","w":5472,"h":3648}', '11': '5696f7ff87639857e858600448565876', '12': '18650965233745', '13': '0', '14': '1781686692088', '20': '0', '24': '0', '25': '1', '26': '0', '28': '1', '46': '{"statistics":{"attachUploadDuration":10573,"apiCallingTime":1784880469089,"sendTime":1784880479664}}', '100': '1', '101': '1', '102': '1', '103': '1', '105': '1', '107': '1', '108': '1', '109': '1', '110': '1' },
  { '0': '0', '1': 'ctt5', '2': 'ctt1', '4': '16', '5': '146f6e81ee934785793e456c108a1d18', '6': 'newNick3', '7': '1784880408339', '8': '3', '10': '{"name":"1726022548869_web.mov","uploadState":1,"sceneName":"nim_default_im","size":6030592,"url":"https://nim-nosdn.netease.im/MjYxNjY0MzM=/bmltYV8zMzM1NjIyMzc3NjVfMTc4NDg4MDI3Nzg4N182NzVlZjkxYy05OTk0LTQ4MDQtOWZjNi0xNzNlMzg5NTg3NWY=","audioCodec":"aac (mp4a / 0x6134706d)","videoCodec":"hevc (Main) (hvc1 / 0x31637668)","container":"mov,mp4,m4a,3gp,3g2,mj2","ext":"mov","w":1080,"h":1920,"dur":6198}', '11': 'dd5e08f0ba59585f18d7998cbaa5c136', '12': '18650955977671', '13': '0', '14': '1781686692088', '20': '0', '24': '0', '25': '1', '26': '0', '28': '1', '46': '{"statistics":{"attachUploadDuration":130450,"apiCallingTime":1784880277858,"sendTime":1784880408311}}', '100': '1', '101': '1', '102': '1', '103': '1', '105': '1', '107': '1', '108': '1', '109': '1', '110': '1' },
  { '0': '0', '1': 'ctt5', '2': 'ctt1', '4': '1', '5': '905e503032d884c94984b315b0a2acc7', '6': 'newNick3', '7': '1784878780729', '8': '3', '10': '{"name":"compress_video_594359870","uploadState":1,"sceneName":"nim_default_im","url":"https://nim-mixdn-gy.chatnos.com/MjYxNjY0MzM=/bmltYV8zMzM1NjIyMzc3NjVfMTc4NDg3ODc3Mjk2OV85NWRkNmMzMi03MzYwLTQyMTEtYmNhMy1mY2NmNDJlYTVjODI=","size":6027591,"audioCodec":"aac (mp4a / 0x6134706d)","videoCodec":"h264 (ConstrainedBaseline) (avc1 / 0x31637661)","container":"mov,mp4,m4a,3gp,3g2,mj2","ext":"mp4","w":1080,"h":1920,"dur":16620}', '11': '3cf1973d70cb3e623f91d8f942e85080', '12': '18650738692513', '13': '0', '14': '1781686692088', '20': '0', '24': '0', '25': '1', '26': '0', '28': '1', '46': '{"statistics":{"attachUploadDuration":7811,"apiCallingTime":1784878772869,"sendTime":1784878780687}}', '100': '1', '101': '1', '102': '1', '103': '1', '105': '1', '107': '1', '108': '1', '109': '1', '110': '1' },
  { '0': '0', '1': 'ctt5', '2': 'ctt1', '4': '1', '5': '905e503032d884c94984b315b0a2acc7', '6': 'newNick3', '7': '1784878737316', '8': '1', '10': '{"name":"honor-screen","uploadState":1,"sceneName":"nim_default_im","url":"https://nim-mixdn-gy.chatnos.com/MjYxNjY0MzM=/bmltYV8zMzM1NjIyMzc3NjVfMTc4NDg3ODczNTA2OF8wMzcyZGMwNC05MDlmLTRjNGMtODQ1My1lOGYxMjE0NTc0NTE=","size":385619,"ext":"png","w":1080,"h":2340}', '11': 'cd4d670b64b2b76dce4bb2b757158542', '12': '18650732957741', '13': '0', '14': '1781686692088', '20': '0', '24': '0', '25': '1', '26': '0', '28': '1', '46': '{"statistics":{"attachUploadDuration":2267,"apiCallingTime":1784878735012,"sendTime":1784878737282}}', '100': '1', '101': '1', '102': '1', '103': '1', '105': '1', '107': '1', '108': '1', '109': '1', '110': '1' },
  { '0': '0', '1': 'ctt5', '2': 'ctt1', '4': '1', '5': '905e503032d884c94984b315b0a2acc7', '6': 'newNick3', '7': '1784878548126', '8': '3', '10': '{"name":"compress_video_594126642","uploadState":1,"sceneName":"nim_default_im","url":"https://nim-mixdn-gy.chatnos.com/MjYxNjY0MzM=/bmltYV8zMzM1NjIyMzc3NjVfMTc4NDg3ODUzOTc5N19hMDIxNjBjZC01ZjdlLTQ2ZWYtODMyOC01OWFlMmM1MjJhMjA=","size":6027591,"audioCodec":"aac (mp4a / 0x6134706d)","videoCodec":"h264 (ConstrainedBaseline) (avc1 / 0x31637661)","container":"mov,mp4,m4a,3gp,3g2,mj2","ext":"mp4","w":1080,"h":1920,"dur":16620}', '11': 'c4aa2029cdbe8725921abcbafab74cb6', '12': '18650706711446', '13': '0', '14': '1781686692088', '20': '0', '24': '0', '25': '1', '26': '0', '28': '1', '46': '{"statistics":{"attachUploadDuration":8393,"apiCallingTime":1784878539674,"sendTime":1784878548071}}', '100': '1', '101': '1', '102': '1', '103': '1', '105': '1', '107': '1', '108': '1', '109': '1', '110': '1' },
  { '0': '0', '1': 'ctt5', '2': 'ctt1', '4': '1', '5': '905e503032d884c94984b315b0a2acc7', '6': 'newNick3', '7': '1784876884935', '8': '1', '10': '{"name":"1784876873723","uploadState":1,"sceneName":"nim_default_im","url":"https://nim-mixdn-gy.chatnos.com/MjYxNjY0MzM=/bmltYV8zMzM1NjIyMzc3NjVfMTc4NDg3Njg4MzA5MV9lNjEwODA0MS01M2RmLTQxMTItODk3Ny1jMzdlYTVlZDE2NGU=","size":132306,"orientation":"(0)","ext":"jpg","w":1080,"h":1440}', '11': '25e0d665362af73edc140250f5679782', '12': '18650476319268', '13': '0', '14': '1781686692088', '20': '0', '24': '0', '25': '1', '26': '0', '28': '1', '46': '{"statistics":{"attachUploadDuration":1852,"apiCallingTime":1784876883034,"sendTime":1784876884890}}', '100': '1', '101': '1', '102': '1', '103': '1', '105': '1', '107': '1', '108': '1', '109': '1', '110': '1' },
  { '0': '0', '1': 'ctt5', '2': 'ctt1', '4': '1', '5': 'ffac655d97b20859a9d8e9ba56c58abe', '6': 'newNick3', '7': '1784876367726', '8': '1', '10': '{"name":"1784876363437_46147e03b05c84317c54e03a433add24 (1)","uploadState":1,"sceneName":"nim_default_im","url":"https://nim-mixdn-gy.chatnos.com/MjYxNjY0MzM=/bmltYV8zMzM1NjIyMzc3NjVfMTc4NDg3NjM2NDUxNl8zM2JlZGRkMS04ZTBkLTQ5NzEtYjJiNS01NTg2NWUxYjg2ZWM=","size":206238,"orientation":"top, left","ext":"jpg","w":1620,"h":1080}', '11': 'cfe5fe5a71a69843372948a8ff076829', '12': '18650405703967', '13': '0', '14': '1781686692088', '20': '0', '24': '0', '25': '1', '26': '0', '28': '1', '46': '{"statistics":{"attachUploadDuration":3217,"apiCallingTime":1784876364470,"sendTime":1784876367691}}', '100': '1', '101': '1', '102': '1', '103': '1', '105': '1', '107': '1', '108': '1', '109': '1', '110': '1' },
  { '0': '0', '1': 'ctt5', '2': 'ctt1', '4': '1', '5': 'b68116f03d6c44458f17fed35850fce2', '6': 'newNick3', '7': '1784876251743', '8': '1', '10': '{"name":"1784876250361_Screenshot_20260630_175811_com.netease.yunxin.app.im","uploadState":1,"sceneName":"nim_default_im","md5":"c0ab6277952220ed9a60523e111849ea","size":60256,"orientation":"(0)","url":"https://nim-mixdn-gy.chatnos.com/MjYxNjY0MzM=/bmltYV8zMzM1NjIyMzc3NjVfMTc4NDg3NjI1MDg5Nl9mNmJjMTlkOS0zZGY5LTQxOTMtYTk5Yy1hYmI4MTVhNTMzYmY=","ext":"jpg","w":1080,"h":2340}', '11': 'a2b1f04debae48db2df31ee645f4b0b5', '12': '18650390270409', '13': '0', '14': '1781686692088', '20': '0', '24': '0', '25': '1', '26': '0', '28': '1', '46': '{"statistics":{"attachUploadDuration":865,"apiCallingTime":1784876250846,"sendTime":1784876251714}}', '100': '1', '101': '1', '102': '1', '103': '1', '105': '1', '107': '1', '108': '1', '109': '1', '110': '1' },
  { '0': '0', '1': 'ctt5', '2': 'ctt1', '4': '1', '5': 'b68116f03d6c44458f17fed35850fce2', '6': 'newNick3', '7': '1784876037703', '8': '1', '10': '{"name":"1784876035877_Screenshot_20260702_144013_com.huawei.browser","uploadState":1,"sceneName":"nim_default_im","md5":"e278921fbb610c66bcfae14cf67b4655","size":120382,"orientation":"(0)","url":"https://nim-mixdn-gy.chatnos.com/MjYxNjY0MzM=/bmltYV8zMzM1NjIyMzc3NjVfMTc4NDg3NjAzNjQwMl9mMmQ0YmVmMi0zODExLTQwNzMtYWZiNC0yMzhlOWU3NjhmZGI=","ext":"jpg","w":1080,"h":2340}', '11': '881f15721da563fb3094b82592bbd96c', '12': '18650362172413', '13': '0', '14': '1781686692088', '20': '0', '24': '0', '25': '1', '26': '0', '28': '1', '46': '{"statistics":{"attachUploadDuration":1321,"apiCallingTime":1784876036347,"sendTime":1784876037675}}', '100': '1', '101': '1', '102': '1', '103': '1', '105': '1', '107': '1', '108': '1', '109': '1', '110': '1' },
]

const HEX = '0123456789abcdef'
function randomHex (n) {
  let s = ''
  for (let i = 0; i < n; i++) s += HEX[Math.floor(Math.random() * 16)]
  return s
}

/**
 * 构造一条「模拟 1w 漫游消息」的协议包：
 * { packetLength, sid:4, cid:9, ser:10000, code:200, r:[[...10000 条已序列化消息...]] }
 * 每条消息基于样本循环复制，并随机化 idClient("11")/idServer("12")/time("7") 以避免去重。
 * @param {Number} count
 * @returns {Object} wire-format packet，可直接传给 nim.protocol.onMessage
 */
function buildMockRoamingPacket (count = 10000) {
  const arr = new Array(count)
  const base = Date.now()
  for (let i = 0; i < count; i++) {
    const tpl = SAMPLE_ROAMING_MSGS[i % SAMPLE_ROAMING_MSGS.length]
    arr[i] = {
      ...tpl,
      '7': String(base - (count - i)),
      '11': randomHex(32),
      '12': String(18600000000000 + i),
    }
  }
  return { packetLength: 0, sid: 4, cid: 9, ser: 10000, code: 200, r: [arr] }
}

/**
 * 构造多批「模拟漫游消息」协议包（已 JSON.stringify，可直接喂 nim.protocol.onMessage）。
 *
 * - batchCount 批，每批 batchSize 条，每批对应一个 p2p 会话 sessionId = `p2p-cs${start+i}`。
 * - 批内所有消息覆写 from="cs{N}"、to=account，使 Message.getMsgTarget 返回 "cs{N}"，
 *   sessionId 解析为 p2p-cs{N}。
 * - 批内 "5" 固定一个随机 32-hex（会话哈希占位）。
 * - "7"(time)/"11"(idClient)/"12"(idServer) 每条唯一避免去重。
 *
 * @param {Object} opts
 * @param {String} opts.account    登录账号（写入 msg.to，使 to===account → peer=from）
 * @param {Number} [opts.batchCount=100]
 * @param {Number} [opts.batchSize=100]
 * @param {Number} [opts.start=100]  会话编号起点（i=0 对应 cs{start}）
 * @returns {String[]} batchCount 个 packet JSON 字符串
 */
function buildMockRoamingPackets ({ account, batchCount = 100, batchSize = 100, start = 100 }) {
  const packets = new Array(batchCount)
  const base = Date.now()
  for (let b = 0; b < batchCount; b++) {
    // const let peer = b === 0 ? 'cs2' : `cs${start + b}`
	const peer = `cs${start + b}`
    const sessionHash = randomHex(32)
    const arr = new Array(batchSize)
    for (let i = 0; i < batchSize; i++) {
      const tpl = SAMPLE_ROAMING_MSGS[i % SAMPLE_ROAMING_MSGS.length];

      arr[i] = {
        ...tpl,
        '1': peer,                                  // from = peer
        '2': account,                                // to = 登录账号 → getMsgTarget 返回 from
        '5': sessionHash,                           // 批内一致的会话哈希占位
        '7': String(base - (batchCount - b) * batchSize - (batchSize - i)),
        '11': randomHex(32),
        '12': String(18600000000000 + b * batchSize + i),
      }
    }
    const packet = { packetLength: 0, sid: 4, cid: 9, ser: 10000, code: 200, r: [arr] }
    packets[b] = JSON.stringify(packet)
  }
  return packets
}

module.exports = { buildMockRoamingPacket, buildMockRoamingPackets, SAMPLE_ROAMING_MSGS }

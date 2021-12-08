let logs = require('./data').logs

function parseLog (msg) {
  let state = 0
  let res = ''
  let result = []

  // 状态
  let handles = [
    (i) => {
      if (msg[i] == '[') return to(1)
      if (msg[i] == '"') return to(2)
      if (msg[i] == ' ') return to(3)
      res += msg[i]
      return 0
    },
    (i) => {
      if (msg[i] == ']') return to(0)
      res += msg[i]
      return 1
    },
    (i) => {
      if (msg[i] == '"') return to(0)
      res += msg[i]
      return 2
    },
    (i) => {
      if (msg[i] == ' ') return to(0)
      if (msg[i] == '[') return to(1)
      if (msg[i] == '"') return to(2)
      res += msg[i]
      return 3
    }
  ]

  // 改变状态时push数据
  function to (newState) {
    if (res) result.push(res); res = ''
    return newState
  }
  
  // 遍历字符串
  for (let i = 0; i < msg.length; i++) {
    if (state < 0) break
      state = handles[state](i)
    if (state < 0) return null
  }
  
  // 指针归位，同时push最后一组字符
  to(-1)
  return result
}

logs.map(item => {
  let [level, time, sName, userId, tid, rpcid, protocol, method, host, url, ua, statusCode, processTimes, responseSize, ip] = parseLog(item)
  // console.log({
  //   level, time, sName, userId, tid, rpcid, protocol, method, host, url, ua, statusCode, processTimes, responseSize, ip
  // })
})
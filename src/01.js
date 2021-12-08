let logs = require('./data').logs

function parseLog (msg) {
  //只支持ES5
  var accessKeys = ["level", "time", "sName", "userId", "tid", "rpcid", "protocol", "method", "host", "url", "ua", "statusCode", "processTimes", "responseSize", "ip"];
  var p0 = -1,
    p1 = -1
  var state = 0;
  var obj = {}
  var fieldIndex = 0
  function addfield(start, end) {
    while (msg[end] == ' ') end--//去后空格
    var key=accessKeys[fieldIndex]
    var value= msg.substring(start + 1, end + 1)
    if(fieldIndex>=11 && fieldIndex<=13)//数字
    {
      value=parseInt(value)
      if(isNaN(value))
        return false
    }else{
      if(value=='') return false
    }
    obj[key] = value    
    fieldIndex++
    return true
  }
  function to(newState) {
    var re=p1 - p0 <= 0 ||  addfield(p0, p1)? newState : -1
      p1++
      p0 = p1
      return re
  }
  var handles = [
    function (i) { // 0
      if (msg[i] == '[') return to(1)
      if (msg[i] == '"') return to(2)
      if (msg[i] == ' ') return to(3)
      p1 = i
      return 0
    },
    function (i) { //1. [ 
      if (msg[i] == ']') return to(0)
      p1 = i
      return 1
    },
    function (i) { //2. "
      if (msg[i] == '"') return to(0)
      p1++
      return 2
    },
    function (i) { //3. 空格
      if (p1 <= p0 && msg[i] == '"') {
        return to(2)
      }
      if (msg[i] == ' ' && p1 > p0) { //
        return to(0)
      }
      p1++
      return 3
    }
  ]
  for (var i = 0,len=msg.length; i < len; i++) {
    if (state < 0) break
      state = handles[state](i)
    if (state < 0) return null
  }
  to(-1)
  return obj
}


logs.map(item => {
  let obj = parseLog(item)
  // console.log(obj)
  // console.log({
  //   level, time, sName, userId, tid, rpcid, protocol, method, host, url, ua, statusCode, processTimes, responseSize, ip
  // })
})
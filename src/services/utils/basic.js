const isInWechat = () => {
  return /micromessenger/i.test(navigator.userAgent)
}

const randomIntNum = (minNum, maxNum) => {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
}

const validatePhone = number => {
  if (/^1[345678]\d{9}$/.test(number)) {
    return true
  } else {
    return false
  }
}
//转换日期格式
const dataFormat = (date, fmt) => {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}

export { isInWechat, randomIntNum, validatePhone, dataFormat }

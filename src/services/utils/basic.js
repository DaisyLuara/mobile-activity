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

export { isInWechat, randomIntNum, validatePhone }

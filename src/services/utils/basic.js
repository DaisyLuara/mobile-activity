const isInWechat = () => {
  return /micromessenger/i.test(navigator.userAgent)
}

const randomIntNum = (minNum, maxNum) => {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
}

export { isInWechat, randomIntNum }

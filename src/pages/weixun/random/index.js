const randomNum = (minNum, maxNum) => {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
}
const generate = paraName => {
  const chenghao = [
    '深沉大叔音',
    '傲娇女王音',
    '慵懒绵羊音',
    '软萌萝莉音',
    '霸道总裁音',
    '清新少年音'
  ]
  let teji = [
    '温情morning call',
    '土味情话',
    '行走的CD',
    'Freestyle',
    '老干部式说教',
    '一言不合就开车',
    '人型点唱机',
    '小情歌',
    '撒娇',
    '不油不腻小情话',
    '贴心问候',
    '令人耳朵怀孕的嗓音',
    '偶尔皮一下',
    '尬聊'
  ]
  if (paraName === 'chenghao') {
    return chenghao[randomNum(0, 5)]
  }
  if (paraName === 'teji') {
    let a = randomNum(0, teji.length - 1)
    let aString = teji[a]
    teji = teji.filter(r => r !== aString)
    let b = randomNum(0, teji.length - 1)
    let bString = teji[b]
    teji = teji.filter(r => r !== bString)
    let c = randomNum(0, teji.length - 1)
    let cString = teji[c]
    let aNumber = randomNum(0, 100)
    let bNumber = randomNum(0, 100 - aNumber)
    let cNumber = 100 - aNumber - bNumber
    return [aString, bString, cString, aNumber, bNumber, cNumber]
  }
}

export { generate, randomNum }

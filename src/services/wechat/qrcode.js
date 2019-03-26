import axios from 'axios'
const getQRcodeUrl = id => {
  let requestUrl = 'http://xingstation.cn:8010/wxqrcode/?id=' + id + '&api=json'
  return new Promise((resolve, reject) => {
    axios
      .get(requestUrl)
      .then(r => {
        resolve(r)
      })
      .catch(e => {
        reject(e)
      })
  })
}
export { getQRcodeUrl }

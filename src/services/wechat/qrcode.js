import axios from 'axios'
const getQRcodeUrl = id => {
  let requestUrl = process.env.EXE_API + ':8010/wxqrcode/?id=' + id + '&api=json'
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

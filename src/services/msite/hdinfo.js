import axios from 'axios'
const getHdInfo = (payload) => {
  const url = 'http://xingstation.cn/client/all/hdinfo/'
  const params = {
    params: {
      ...payload
    }
  }
  return new Promise((resolve, reject) => {
    axios.get(url, params).then(r => {
      resolve(r)
    }).catch(e => {
      reject(e)
    })
  })
}

export { getHdInfo }
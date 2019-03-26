import axios from 'axios'
// 0167.H5 Saas-发送弹幕
const sendBarrage = (payload) => {
  const url = 'http://xingstation.cn/client/h5/barrage/'
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

const getAcgn = (payload) => {
  const url = 'http://xingstation.cn/client/h5/useracgn/'
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

export { sendBarrage, getAcgn }
import axios from 'axios'
const baseUrl = process.env.EXE_API

// 0167.H5 Saas-发送弹幕
const sendBarrage = (payload) => {
  const url = `${baseUrl}/h5/barrage/`
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
  const url = `${baseUrl}/h5/useracgn/`
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
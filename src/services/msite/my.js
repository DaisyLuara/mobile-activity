// 0166.H5 Saas-当前互动节目
import axios from 'axios'
const baseUrl = process.env.EXE_API

const fetchRunPro = (payload) => {
  const url = `${baseUrl}/h5/runpro/`
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

// 0163.H5 Saas-我玩过的节目
const fetchGamesPlayed = (payload) => {
  const url = `${baseUrl}/h5/userpro/`
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

// 0164.H5 我的成就

const fetchMyAchivement = (payload) => {
  const url = `${baseUrl}/h5/userhonour/`
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

export { fetchRunPro, fetchGamesPlayed, fetchMyAchivement }
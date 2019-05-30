import axios from 'axios'
const baseUrl = process.env.EXE_API

const getUserTrends = (payload) => {
  const url = `${baseUrl}/h5/userphoto/`
  return new Promise((resolve, reject) => {
    const requestParams = {
      params: {
        ...payload
      }
    }
    axios.get(url, requestParams).then(r => {
      resolve(r)
    }).catch(e => {
      reject(e)
    })
  })
}

const deleteATrend = (payload) => {
  const url = `${baseUrl}/all/hddel/`
  return new Promise((resolve, reject) => {
    const requestParams = {
      params: {
        ...payload
      }
    }
    axios.get(url, requestParams).then(r => {
      resolve(r)
    }).catch(e => {
      reject(e)
    })
  })
}

export { getUserTrends, deleteATrend }
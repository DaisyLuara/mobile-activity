import axios from 'axios'
const getUserTrends = (payload) => {
  const url = 'http://exelook.com/client/usertrends/'
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
  const url = 'http://exelook.com/client/all/hddel/'
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
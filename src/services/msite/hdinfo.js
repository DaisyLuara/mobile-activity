import axios from 'axios'
const baseUrl = process.env.EXE_API

const getHdInfo = (payload) => {
  const url = `${baseUrl}/all/hdinfo/`
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
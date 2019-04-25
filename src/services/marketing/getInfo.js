const MARKETING_API = process.env.SAAS_API
const PLAY_RESULT_API = '/open/play/playResults/'
const IMAGE_API = process.env.EXE_API + '/goodsxsd/?api=json&id='
import axios from 'axios'

const getPlayResultById = id => {
  return new Promise((resolve, reject) => {
    axios
      .get(MARKETING_API + PLAY_RESULT_API + id)
      .then(res => {
        if (res.data.success) {
          resolve(res.data.data)
        } else {
          reject(res.data.message)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

const getInfoById = (id, code, state) => {
  let promise = new Promise((resolve, reject) => {
    axios
      .get(IMAGE_API + id + '&code=' + code + '&state=' + state)
      .then(response => {
        resolve(response.data.results)
      })
      .catch(err => {
        reject(err)
      })
  })
  return promise
}

const splitParms = parms => {
  let arr = parms.toString().split('&')
  let res = {}
  arr.map(ele => {
    let children = ele.split('=')
    res[children[0]] = children[1]
  })
  return res
}
export { getPlayResultById, getInfoById, splitParms }

import axios from 'axios'
import { apiToken, Cookies } from 'services'
const UPLOAD_LETTER = process.env.AD_API + '/api/confessions'
const LETTER_URL = process.env.AD_API + '/api/user/confession'
const LETTER_IMAGE_URL = process.env.AD_API + '/api/activity_media'
const REQ_HEADER = {
  headers: {
    'api-token': apiToken,
    'Set-Cookie': 'sign=' + Cookies.get('sign')
  }
}
const V3_HEADER = {
  headers: {
    'api-token': apiToken,
    Accept: 'application/vdn.xingstation.v3+json'
  }
}
// 吾悦邀请函项目
// 上传邀请函
const uploadLetter = params => {
  params.sign = Cookies.get('sign')
  return new Promise((resolve, reject) => {
    axios
      .post(UPLOAD_LETTER, params, V3_HEADER)
      .then(response => {
        if (response.data.success) {
          resolve(response.data.data)
        } else {
          reject(response)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 修改邀请函
const updateLetter = params => {
  params.sign = Cookies.get('sign')
  return new Promise((resolve, reject) => {
    axios
      .patch(LETTER_URL, params, V3_HEADER)
      .then(response => {
        if (response.data.success) {
          resolve(response.data.data)
        } else {
          reject(response)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
// 查询邀请函
const getLetter = params => {
  params.sign = Cookies.get('sign')
  return new Promise((resolve, reject) => {
    axios
      .get(LETTER_URL, { params, ...V3_HEADER })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 上传图片
const uploadLetterImage = params => {
  return new Promise((resolve, reject) => {
    axios
      .post(LETTER_IMAGE_URL, params, REQ_HEADER)
      .then(response => {
        if (response.data.success) {
          resolve(response.data.data)
        } else {
          reject(response)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
export { uploadLetter, updateLetter, getLetter, uploadLetterImage }

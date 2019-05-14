import axios from 'axios'
import { apiToken, Cookies } from 'services'
const QINIU_TOKEN_URL = process.env.DIAMOND_API + '/qiniu_token'
const QINIU_UPLOAD_URL = 'http://upload.qiniu.com'
const UPLOAD_CALLBACK_URL = process.env.DIAMOND_API + '/activity_media'
const UPLOAD_LETTER = process.env.AD_API + '/api/confessions'
const LETTER_URL = process.env.AD_API + '/api/user/confession'
const LETTER_IMAGE_URL = process.env.AD_API + '/api/activity_media'
const TOKEN_HEADER = {
  headers: {
    'api-token': apiToken
  }
}
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
//qiniu 上传图片
// 获取上传图片需要的七牛token
const getQiniuToken = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(QINIU_TOKEN_URL, TOKEN_HEADER)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// 上传图片至七牛
const qiniuUploadFile = params => {
  return new Promise((resolve, reject) => {
    axios
      .post(QINIU_UPLOAD_URL, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 图片归档
const recordQiniuImage = params => {
  return new Promise((resolve, reject) => {
    axios
      .post(UPLOAD_CALLBACK_URL, params, TOKEN_HEADER)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 吾悦邀请函项目
// 上传邀请函
const uploadLetter = params => {
  params.sign = Cookies.get('sign')
  return new Promise((resolve, reject) => {
    axios
      .post(UPLOAD_LETTER, params, V3_HEADER)
      .then(response => {
        resolve(response.data)
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
        resolve(response.data)
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
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export {
  getQiniuToken,
  qiniuUploadFile,
  recordQiniuImage,
  uploadLetter,
  updateLetter,
  getLetter
}

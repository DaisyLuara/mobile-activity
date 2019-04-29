import axios from 'axios'
import { apiToken } from 'services'
const QINIU_TOKEN_URL = process.env.ADX_API + '/qiniu_token'
const QINIU_UPLOAD_URL = 'http://upload.qiniu.com'
const UPLOAD_CALLBACK_URL = process.env.ADX_API + '/activity_media'
const MOCK_API = 'http://0.0.0.0:7300/mock/5cc58e9caaa16bb98099478d/diamond520'

// 建立请求拦截器
const fetchWithToken = axios.create({
  baseURL: config[process.env.NODE_ENV].DIAMOND_API
})

fetchWithToken.interceptors.request.use(config => {
  config.headers['api-token'] = apiToken
  config.headers['Accept'] = 'application/vdn.xingstation.v3+json'
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

fetchWithToken.interceptors.response.use(
  response => {
    const status = response.status
    if (status === 200) {
      return {
        code: 0,
        data: response.data
      }
    } else if(status === 204) {
      return {
        code: 404
      }
    } else {
      Promise.reject('error: ' + status)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

// 获取上传图片需要的七牛token
const qiniuToken = () => {
  const headers = {
    'api-token': apiToken
  }
  return new Promise((resolve, reject) => {
    axios
      .get(QINIU_TOKEN_URL, {
        headers
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 上传图片至七牛
const uploadImgToQiniu = (args) => {
  return new Promise((resolve, reject) => {
    axios
      .post(QINIU_UPLOAD_URL, args)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// 图片归档
const postActivityMedia = (args) => {
  const headers = {
    'api-token': apiToken
  }
  return new Promise((resolve, reject) => {
    axios
      .post(UPLOAD_CALLBACK_URL, args, {
        headers
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

 // 查询用户的告白信息
const getLoveInfo = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(MOCK_API + '/lovemsg')
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// 请求手机验证码
const getVerificationCodes = (args) => {
  return fetchWithToken({
    url: '/verificationCodes',
    method: 'post',
    data: args
  })
}

export { qiniuToken, uploadImgToQiniu, postActivityMedia, getLoveInfo, getVerificationCodes }
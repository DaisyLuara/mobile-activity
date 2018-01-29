'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: JSON.stringify('development'),
  M_URL: JSON.stringify('http://127.0.0.1:8084'),
  STORE_API: JSON.stringify('http://192.168.31.192:2080'),
  SAAS_API: JSON.stringify('http://0.0.0.0:40080/api'),
  WX_API: JSON.stringify('http://0.0.0.0:40080/api'),
  IMAGE_SERVER: JSON.stringify('http://h5-images.oss-cn-shanghai.aliyuncs.com')
})

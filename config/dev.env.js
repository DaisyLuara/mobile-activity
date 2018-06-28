'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: String('development'),
  M_URL: String('http://127.0.0.1:8087'),
  STORE_API: String('http://store.loveqiche.com'),
  SAAS_API: String('http://sapi.jingfree.top/api'),
  WX_API: String('http://sapi.jingfree.top/api'),
  IMAGE_SERVER: String('http://h5-images.oss-cn-shanghai.aliyuncs.com')
})

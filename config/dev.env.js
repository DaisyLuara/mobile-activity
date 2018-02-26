'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: JSON.stringify('development'),
  M_URL: JSON.stringify('http://127.0.0.1:8087'),
  STORE_API: JSON.stringify('http://store.jingfree.top/admin'),
  SAAS_API: JSON.stringify('http://sapi.jingfree.top'),
  WX_API: JSON.stringify('http://sapi.jingfree.top'),
  IMAGE_SERVER: JSON.stringify('http://h5-images.oss-cn-shanghai.aliyuncs.com')
})

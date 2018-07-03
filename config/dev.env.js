'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: JSON.stringify('development'),
  M_URL: JSON.stringify('http://127.0.0.1:8087'),
  AD_API: JSON.stringify('http://papi.jingfree.top'),
  STORE_API: JSON.stringify('http://store.loveqiche.com'),
  SAAS_API: JSON.stringify('http://sapi.jingfree.top/api'),
  WX_API: JSON.stringify('http://sapi.jingfree.top/api'),
  IMAGE_SERVER: JSON.stringify('http://h5-images.oss-cn-shanghai.aliyuncs.com'),
  CDN_URL: JSON.stringify('http://cdn.exe666.com')
})

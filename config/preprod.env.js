'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  DOMAIN: JSON.stringify('.loveqiche.com'),
  M_URL: JSON.stringify('http://h5.newgls.cn'),
  WX_API: JSON.stringify('http://sapi.newgls.cn/api'),
  AD_API: JSON.stringify('http://papi.newgls.cn'),
  STORE_API: JSON.stringify('http://store.loveqiche.com'),
  SAAS_API: JSON.stringify('http://sapi.newgls.cn/api'),
  IMAGE_SERVER: JSON.stringify('http://h5-images.oss-cn-shanghai.aliyuncs.com'),
  CDN_URL: JSON.stringify('http://cdn.exe666.com')
})

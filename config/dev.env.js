'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: "'development'",
  M_URL: "'http://127.0.0.1:8087'",
  AD_API: "'http://papi.newgls.cn'",
  STORE_API: "'http://store.vookan.com'",
  SAAS_API: "'http://sapi.jingfree.top/api'",
  WX_API: "'http://sapi.newgls.cn/api'",
  IMAGE_SERVER: "'http://h5-images.oss-cn-shanghai.aliyuncs.com'",
  CDN_URL: "'http://cdn.exe666.com'"
})

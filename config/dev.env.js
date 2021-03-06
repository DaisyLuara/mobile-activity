'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: "'development'",
  M_URL: "'http://127.0.0.1:8087'",
  AD_API: "'http://papi.jingfree.top'",
  STORE_API: "'http://store.vookan.com'",
  SAAS_API: "'http://sapi.jingfree.top/api'",
  WX_API: "'http://sapi.xingstation.net/api'",
  IMAGE_SERVER: "'http://h5-images.oss-cn-shanghai.aliyuncs.com'",
  CDN_URL: "'http://cdn.xingstation.cn'",
  EXE_API: "'http://xingstation.cn/client'",
  PARSE_SERVER: "'http://120.27.138.242:1337'",
  DIAMOND_API: "'http://papi.xingstation.net/api'",
  DIAMOND_TOP_API: "'http://api.xingstation.net/api'"
})

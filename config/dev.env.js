'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: "'development'",
  M_URL: "'http://127.0.0.1:8087'",
  AD_API: "'http://papi.xingstation.net'", //xingstation.net
  STORE_API: "'http://store.vookan.com'",
  SAAS_API: "'http://sapi.xingstation.net/api'", //xingstation.net
  WX_API: "'http://sapi.xingstation.net/api'", //xingstation.net
  IMAGE_SERVER: "'http://h5-images.oss-cn-shanghai.aliyuncs.com'",
  CDN_URL: "'http://cdn.xingstation.cn'",
  EXE_API: "'http://xingstation.cn/client'",
  PARSE_SERVER: "'http://120.27.138.242:1337'"
})

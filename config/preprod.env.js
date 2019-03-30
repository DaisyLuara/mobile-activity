'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  DOMAIN: "'.vookan.com'",
  M_URL: "'http://h5.newgls.cn'",
  WX_API: "'http://sapi.newgls.cn/api'",
  AD_API: "'http://papi.newgls.cn'",
  STORE_API: "'http://store.vookan.com'",
  SAAS_API: "'http://sapi.newgls.cn/api'",
  IMAGE_SERVER: "'http://h5-images.oss-cn-shanghai.aliyuncs.com'",
  CDN_URL: "'http://cdn.xingstation.com'",
  EXE_API: "'http://xingstation.cn/client'",
  PARSE_SERVER: "'http://120.27.138.242:1337'"
})

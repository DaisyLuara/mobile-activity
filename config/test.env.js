'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  DOMAIN: "'.loveqiche.com'",
  M_URL: "'http://h5.newgls.cn'",
  WX_API: "'http://sapi.newgls.cn/api'",
  AD_API: "'http://papi.newgls.cn'",
  STORE_API: "'http://store.loveqiche.com'",
  SAAS_API: "'http://sapi.newgls.cn/api'",
  IMAGE_SERVER: "'http://h5-images.oss-cn-shanghai.aliyuncs.com'",
  CDN_URL: "'http://cdn.exe666.com'"
})

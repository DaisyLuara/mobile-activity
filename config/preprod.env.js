'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  DOMAIN: "'.vookan.com'",
  M_URL: "'http://h5.xingstation.net'",
  WX_API: "'http://sapi.xingstation.net/api'",
  AD_API: "'http://papi.xingstation.net'",
  STORE_API: "'http://store.vookan.com'",
  SAAS_API: "'http://sapi.xingstation.net/api'",
  IMAGE_SERVER: "'http://h5-images.oss-cn-shanghai.aliyuncs.com'",
  CDN_URL: "'http://cdn.exe666.com'"
})

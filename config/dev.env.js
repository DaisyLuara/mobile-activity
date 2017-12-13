'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: JSON.stringify('development'),
  STORE_SERVER: JSON.stringify('http://192.168.31.192:2080'),
  SAAS_SERVER: JSON.stringify('http://0.0.0.0:40080')
})

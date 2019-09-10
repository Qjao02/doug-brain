'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROOT_API: '"http://localhost:8000/doug/api/"',
  AUTH_API: '"http://localhost:8000/doug/api-auth/"'
})

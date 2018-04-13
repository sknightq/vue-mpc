/* eslint-disable */
require('eventsource-polyfill')
// 用于执行npm run mydev时修改文件时进行热重载
const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function(event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})

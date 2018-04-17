/* eslint-disable */
require('eventsource-polyfill')
// 可监听多页面修改
const hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function(event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})

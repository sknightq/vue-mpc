const merge = require('webpack-merge')
// const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')
const baseConfig = require('./base')
// 公司框架需要注册验证的一些请求
// const frameRequest = require('./aep')
// const rewrites = [{ from: /\/index/, to: '/index.html' }]
const rewrites = []
// console.log('before:%O', rewrites)
for (let key in baseConfig.webpack.pages) {
  const page = baseConfig.webpack.pages[key]
  rewrites.push({
    from: new RegExp(page.from),
    to: page.to
  })
}
console.log('after:%O', rewrites)
const devConfig = merge(baseConfig.webpack, {
  devServer: {
    // before: frameRequest,
    port: 30025,
    // 代理地址
    proxy: {
      '/go': {
        target: 'http://localhost:30097/',
        pathRewrite: {
          '^/go': '/'
        }
      }
    },
    historyApiFallback: {
      // 别名, history mode
      rewrites
    }
  },
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      // insert CDN js
      // new HtmlWebpackTagsPlugin({
      //   append: false,
      //   publicPath: false,
      //   tags: ['http://somecdn.js']
      // })
    ]
  }
})

module.exports = devConfig

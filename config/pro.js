const webpack = require('webpack')
const merge = require('webpack-merge')
// const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const baseConfig = require('./base')
// const siteConfig = require('./index')

// 获得哪些页面需要插入额外的脚本，这里主要是要插入aepmod.js
const tagsFilesOpts = []
for (let key in baseConfig.pages) {
  if (baseConfig.pages[key].hasAepMod) {
    tagsFilesOpts.push(baseConfig.pages[key].filename)
  }
}
const proConfig = merge(baseConfig, {
  configureWebpack: {
    plugins: [
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|en-gb/),
      // new webpack.ProvidePlugin({
      //   $: 'jquery',
      //   jQuery: 'jquery',
      //   moment: 'moment'
      // }),
      // 插入额外的aepmod.js
      // new HtmlWebpackTagsPlugin({
      //   append: false,
      //   publicPath: false,
      //   tags: [
      //     `${siteConfig.corsDomain}:${siteConfig.corsMainPort}${
      //       siteConfig.frameJS
      //     }`
      //   ],
      // files: tagsFilesOpts
      // }),
      // copy some json files to dist for nginx config in docker
      new CopyWebpackPlugin([{ from: 'src/static/scripts', to: 'aep' }])
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          // FIXME: pop method error mini-css
          // moment: {
          //   test: /[\\/]node_modules[\\/]moment[\\/]/,
          //   chunks: 'initial',
          //   name: 'moment',
          //   enforce: true
          // }
        }
      }
    }
  }
})

module.exports = proConfig

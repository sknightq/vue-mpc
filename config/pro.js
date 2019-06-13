const webpack = require('webpack')
const merge = require('webpack-merge')
// const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const baseConfig = require('./base')
// const siteConfig = require('./deploy')

const proConfig = merge(baseConfig.webpack, {
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
      //   ]
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

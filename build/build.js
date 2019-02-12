'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const webpack = require('webpack')
// 从npm run build [参数]读取参数, 默认使用default配置
const site = require('./sites.config')[process.argv[2] || 'default']

// 编译文件
const buildProduction = () => {
  const config = require('../config')
  const webpackConfig = require('./webpack.prod.conf')
  const spinner = ora('building for production...')
  spinner.start()

  rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err
    webpack(webpackConfig, (err, stats) => {
      spinner.stop()
      if (err) throw err
      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false,
          children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
          chunks: false,
          chunkModules: false
        }) + '\n\n'
      )

      if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'))
        process.exit(1)
      }

      console.log(chalk.cyan('  Build complete.\n'))
      console.log(chalk.yellow('  Tip: built files are meant to be served over an HTTP server.\n' + "  Opening index.html over file:// won't work.\n"))
    })
  })
}

// 临时生成deploy文件用于线上部署
const deployPath = path.resolve(__dirname, '../config/deploy.js')
const deploySpinner = ora('creating the deploy config file...')
deploySpinner.start()
rm(deployPath, err => {
  if (err) throw err
  const data = `  'use strict'\n  module.exports = ${JSON.stringify(site, null, 4)} `
  fs.writeFile(deployPath, data, {}, error => {
    if (error) throw error
    deploySpinner.stop()
    console.log(chalk.yellow('Current site configurations:'))
    console.log(JSON.stringify(site, null, 2))
    console.log(chalk.cyan('Deploy file is created.\n'))
    buildProduction()
  })
})

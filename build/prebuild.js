const fs = require('fs')
const path = require('path')
const readline = require('readline')
const ora = require('ora')
const rm = require('rimraf')
const spinner = ora('Getting config for production...\n')
const chalk = require('chalk')
const sitesConfig = require('../config/sites.config')
const siteName = process.argv[2] || 'dev'

const changeNginxConfig = () => {
  const nginxSpinner = ora('changing the nginx config file...\n')
  const writeStream = fs.createWriteStream(
    path.join(__dirname, '../nginx.conf'),
    {
      encoding: 'utf8'
    }
  )
  nginxSpinner.start()
  const rl = readline.createInterface({
    input: fs.createReadStream(
      path.join(__dirname, '../config/nginx.base.conf')
    )
  })
  rl.on('line', line => {
    // 修改自定义的Origin
    const origin = new RegExp('.*Origin.*')
    // 修改后端代理
    const proxy = new RegExp('.*proxy_pass.*')
    if (origin.exec(line)) {
      writeStream.write(
        `        add_header Access-Control-Allow-Origin '${
          siteConfig.corsDomain
        }:${siteConfig.corsMainPort}';\n`
      )
    } else if (proxy.exec(line)) {
      writeStream.write(`            proxy_pass ${siteConfig.serverUrl};\n`)
    } else {
      writeStream.write(line + '\n')
    }
  }).on('close', () => {
    nginxSpinner.stop()
    console.log(chalk.cyan('Nginx config file is created.\n'))
  })
}

spinner.start()
const siteConfig = sitesConfig[siteName]
spinner.stop()

// 临时生成deploy文件
const deployPath = path.resolve(__dirname, '../config/deploy.js')
const deploySpinner = ora('creating the deploy config file...\n')
deploySpinner.start()
rm(deployPath, err => {
  if (err) {
    throw err
  }
  const data = `  'use strict'\n  module.exports = ${JSON.stringify(
    siteConfig,
    null,
    4
  )} `
  fs.writeFile(deployPath, data, {}, error => {
    if (error) {
      throw error
    }
    deploySpinner.stop()
    console.log(chalk.yellow('Current site configurations:'))
    console.log(JSON.stringify(siteConfig, null, 2))
    console.log(chalk.cyan('Deploy file is created.\n'))
    changeNginxConfig()
  })
})

module.exports = siteConfig

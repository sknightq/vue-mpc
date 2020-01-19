const { execSync } = require('child_process')

const glob = require('glob')
// console font color
const chalk = require('chalk')
// loading
const ora = require('ora')

// 获取所有的moduleList
const components = glob.sync('./src/components/*.vue')
// const buildFile = path.join(__dirname, 'build.js')
// const webpack = require('vuec')
const spinner = ora('Packaging the components...\n').start()
setTimeout(() => {
  spinner.stop()
}, 2000)

for (const component of components) {
  // const file = path.join(__dirname, module);
  const name = component.substring(component.lastIndexOf('/') + 1).slice(0, -4)

  const cmd = `vue build -t lib -n ${name} ${component} -d lib/components/${name}`
  execSync(cmd)

  console.log(chalk.blue(`Component ${name} is packaged.`))
}
console.log(`[${new Date()}]` + chalk.green('Compeleted !'))

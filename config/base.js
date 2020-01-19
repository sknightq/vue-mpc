const glob = require('glob')
const pagesConfig = require('./tpl.config')
const siteConfig = require('../src/assets/scripts/aepConfig')
const pages = {}
const customDiretories = ['custom']
pages['index'] = {
  entry: 'src/views/app.js',
  template: 'public/index.html',
  filename: 'index.html',
  title: '自定义模块',
  chunks: ['chunk-vendors', 'chunk-common', 'index'],
  from: '/index',
  to: '/index.html'
}

/**
 * @param {array} items string array.
 * @param {boolean} [first=false] first word whether is upper case.
 * @returns {string} the camel case string.
 */
const toCamelCase = (items, first = false) => {
  const result = []
  for (let i = 0; i < items.length; i++) {
    if (i === 0 && !first) {
      result.push(items[i])
    } else {
      result.push(`${items[i].slice(0, 1).toUpperCase()}${items[i].slice(1)}`)
    }
  }
  return result.join('')
}
const getDiretories = (customDiretory, paths, name, deep) => {
  if (paths[deep + 1] === customDiretory) {
    return name.reverse()
  } else {
    name.push(paths[deep])
    return getDiretories(customDiretory, paths, name, deep - 1)
  }
}
// 遍历循环生成入口文件
customDiretories.forEach(function(customDiretory) {
  glob.sync(`src/views/${customDiretory}/**/*.js`).forEach(path => {
    // 目录数组中去除 [src, views, xxx, xxx, xxx.js]
    const pathArray = path.split('/')
    // 获取根文件名（不包含后缀），并将根文件从目录数组中去除 [src, views, xxx, xxx]
    const target = pathArray.pop().split('.')[0]
    // 获取驼峰式的文件路径
    const diretories = getDiretories(customDiretory, pathArray, [], pathArray.length - 1)
    const name = toCamelCase(diretories)
    pathArray.push(target + '.html')
    // 这边name用中杠线连接貌似不行
    pages[name] = {
      entry: path,
      // 我认为对于比较大的第三方插件并且不常用(例：moment.js)
      // 可以在新模板中插入script来独自引入
      // 这种方式可以减少编译后vendor.js文件的大小
      // template: pagesConfig[name] ? pagesConfig[name].template : 'public/index.html',
      template: pagesConfig[name] && pagesConfig[name].template ? pagesConfig[name].template : pathArray.join('/'),
      filename: `views/${diretories.join('/')}.html`,
      title: pagesConfig[name] && pagesConfig[name].title ? pagesConfig[name].title : target + ' Page',
      chunks: ['chunk-vendors', 'chunk-common', name],
      // 别名设置
      from: `/${diretories.join('/')}`,
      to: `/views/${diretories.join('/')}.html`,
      // 默认会插入框架的aepmod.js
      hasAepMod: pagesConfig[name] && typeof pagesConfig[name].hasAepMod === 'boolean' ? pagesConfig[name].hasAepMod : true,
      isHttps: siteConfig.corsDomain.indexOf('https:') !== -1
    }
    // 别名设置
    // rewrites.push({
    //   from: `/${name}`,
    //   to: `/views/${name}.html`
    // })
  })
})
// console.log(pages)
module.exports = {
  pages,
  css: {
    loaderOptions: {
      sass: {
        // 设置公共样式变量
        data: `@import "@/assets/styles/scss/variables-custom.scss";`
      }
    },
    // 设置打包的样式是否内联（false 为内联）
    extract: true
  },
  publicPath: '/',
  chainWebpack: config => {
    config.module.rules.delete('eslint')
  }
}

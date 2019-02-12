# vue-mpc

> multiple pages (multiply entries) based on vue-cli  
> 基于vue-cli的多入口（多页面）前端项目框架，每个入口页面可以调用自身的vue-router来达到自身页面的前端路由跳转  
> vue 版本为2.5.2，修改了config和build里的多个文件  
> 样式使用了scss, 未引入多余的ui  

## tips
#### pass params between two pages (页面之间传参)
> Because this is a multiple pages, there must have the condition that pass params between two pages  
> 由于这个是多页面的项目，肯定存在多页面之间传数据的情况  
> 公司项目结构是这些多页面的vue都是用iframe包着  
> Current Solution (当前解决方式):  

``` 
  import Vue from 'vue'  
  import axios from 'axios'  
  import VueAxios from 'vue-axios'  
  import listApp from '@/views/rescue/list/listApp'  

  import '@/assets/styles/scss/normalize.scss'  

  Vue.use(VueAxios, axios)  

  const vueInstance = new Vue({  
    el: '#list-app',  
    // router,  
    components: { listApp },  
    template: '<list-app/>'  
  })  

  window.refreshRescueList = function() {  
    // 获得listApp组件上下文,用于修改组件数据，并自动更新view 因为这个是list入口文件，其子组件只有一个listApp  
    // get the context of listApp component, in order to update the data of this component and then can render the view  
    listApp.methods.refreshList.apply(vueInstance.$children[0], arguments)  
  }  
``` 
> expose a global method(mounted on window object) in current page  
> other pages can get the method through the iframe(window object)  

> 暴露一个全局的方法，挂在window对象上
> 其他页面就可以通过iframe去获取这个页面的相关组件的方法
> 欢迎提出其他解决方案

#### one code for multiple sites (一套代码部署多个站点)
> Once, you were bored with the PM who pushed you to deploy code to many sites using different configurations, which makes you modify the code frequently.
> There is a good way, but maybe not the best.
> This way is used in following conditions:
> There are all static files in production environment

> 曾经是不是厌烦项目经理催你部署代码到不同站点，但由于不同的配置导致你频繁修改代码
> 这里有个解决方法, 但可能不是最好的
> 适用条件：线上环境都是静态文件（前后端分离），因为静态文件无法读取proccess变量
````
// In configurations file
'use strict'
module.exports = {
  default: {
    corsDomain: 'http://example.a.com',
    corsMainPort: 30000,
    externalJS: '/static/utilty.min.js'
  },
  config1: {
    corsDomain: 'http://example.b.com',
    corsMainPort: 30001,
    externalJS: '/static/utilt1.min.js'
  },
  config2: {
    corsDomain: 'http://example.c.com',
    corsMainPort: 30002,
    externalJS: '/static/utilty2.min.js'
  }
}
// In deploy file, required in ./config/index.js
'use strict'
module.exports = {
  corsDomain: 'http://example.b.com',
  corsMainPort: 30000,
  externalJS: '/static/utilty1.min.js'
}

````
> Using `npm run build [configuration name]`. e.g. `npm run build config1`, 'deploy.js' will be replaced by new configurations that used in 'config/index.js', and then build task will take these configuation.

> 用`npm run build [configuration name]`命令来部署，例如：e.g. `npm run build config1`, 'deploy.js' 会被新的配置项取代，这些配置会在'config/index.js' 被使用，其他业务相关的代码也可以import 'config/index.js'文件用于读取该站点的相关配置,也就说敲完部署命令后，deploy.js会先被生成，然后再构建线上代码，在构建线上代码时，这些配置项会被引入到代码里  

## update
> 2018.07.09
  1. 增加可以线上部署时直接输入跨域域名对跨域配置进行自动配置。例：npm run build http://cors.domain.com 8080。当然你自己需要有个config文件去控制全局的域名配置。
  2. 增加了静态文件（CDN）的引入，编译时直接插入到页面底部的script中
> 2018.04.13   
  1.增加了scss全局文件引入，可用于在组件里直接使用公共样式变量   
  2.现在可以监听多目录（不单单只有views目录，可以自己在config/index.js配置）  

## todo
> index.html页面似乎热启动有问题  
> 增加scss变量引入(完成) 
> 验证vuex状态多页面之间是否共用  


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# serve with hot reload at localhost:8080/views/modulea/home.html
# 并且可以监听多页面的修改
npm run mydev

# buld site using different configurations
npm run build [configuration name]

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

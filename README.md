# vue-mpc

> multiple pages (multiply entries) based on vue-cli  
> 基于vue-cli的多入口（多页面）前端项目框架，每个入口页面可以调用自身的vue-router来达到自身页面的前端路由跳转  
> vue 版本为2.5.2，修改了config和build里的多个文件  
> 样式使用了scss, 未引入多余的ui  

## tips
> Because this is a multiple pages, there must be have the condition that pass params between two pages
> 由于这个是多页面的项目，肯定存在多页面之间传数据的情况
> 公司项目结构是这些d多页面的vue都是用iframe包着
> Current Solution (当前解决方式):
`
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
    // get the context of listApp components, in order to update the data of this component and then can render the view
    listApp.methods.refreshList.apply(vueInstance.$children[0], arguments)
  }
`
> expose a global (mount on window) method in current page (暴露一个全局的方法，挂在再window对象上)
> other pages can get the method through the iframe (其他页面就可以通过iframe去获取这个页面的相关组件的方法)
> 欢迎提出其他解决方案
## update
> 2018.4.13 1.增加了scss全局文件引入，可用于在组件里直接使用公共样式变量 2.现在可以监听多目录（不单单只有views目录，可以自己在config/index.js配置）

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

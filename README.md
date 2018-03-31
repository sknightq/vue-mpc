# vue-mpc

> multiply pages (multiply entries) based on vue-cli
> 基于vue-cli的多入口（多页面）前端项目框架，每个入口页面可以调用自身的vue-router来达到自身页面的前端路由跳转
> vue 版本为2.5.2，修改了config和build里的多个文件
> 样式使用了scss, 未引入多余的ui

## todo
> index.html页面似乎热启动有问题
> 增加scss变量引入
> 验证vuex状态多页面之间是否共用


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# serve with hot reload at localhost:8080/views/modulea/home.html
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

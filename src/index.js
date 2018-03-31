// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// import axios from 'axios'
// import VueAxios from 'vue-axios'

import App from './indexApp'
// ./router/index.js
import router from './router'
// ./store/index.js
// import store from './store'
// import ElementUI from 'element-ui'
// import '@/assets/styles/scss/element-custom.scss'

// Vue.config.productionTip = false

// 使用axios
// Vue.use(VueAxios, axios)

// 使用elment ui
// Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

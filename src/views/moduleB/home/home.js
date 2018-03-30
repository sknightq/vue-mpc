
import Vue from 'vue'
import App from './homeApp'

import router from '@/router/moduleB'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

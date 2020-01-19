import Vue from 'vue'
import App from '@/views/custom/dashboard/summary.vue'
import router from '@/router/dashboard/summary'

import '@/assets/styles/scss/normalize.scss'
import '@/assets/styles/scss/base-style.scss'

new Vue({
  el: '#app', // this id is in public/index.html
  router,
  render: h => h(App)
})

import Vue from 'vue'
import App from '@/views/dongying/dashboard/summary.vue'
import router from '@/router/dashboard/summary'

new Vue({
  el: '#app', // this id is in public/index.html
  router,
  render: h => h(App)
})

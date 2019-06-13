import Vue from 'vue'
import App from '@/views/custom/dashboard/air/index.vue'
import router from '@/router/dashboard/air'
import store from '@/store/dashboard/air'

new Vue({
  el: '#app', // this id is in public/index.html
  router,
  store,
  render: h => h(App)
})

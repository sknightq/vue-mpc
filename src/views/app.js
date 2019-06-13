import Vue from 'vue'
import App from '@/views/app.vue'
import router from '@/router'

new Vue({
  el: '#app', // this id is in public/index.html
  router,
  render: h => h(App)
})

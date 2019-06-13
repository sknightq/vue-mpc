import Vue from 'vue'
import App from '@/views/app.vue'

new Vue({
  el: '#app', // this id is in public/index.html
  render: h => h(App)
})

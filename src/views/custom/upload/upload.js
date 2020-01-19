import Vue from 'vue'
import App from '@/views/custom/upload/upload.vue'
import '@/assets/styles/scss/normalize.scss'
import '@/assets/styles/scss/base-style.scss'
new Vue({
  el: '#app', // this id is in public/index.html
  render: h => h(App)
})

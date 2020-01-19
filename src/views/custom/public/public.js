import Vue from 'vue'
import App from '@/views/custom/public/public.vue'
import '@/assets/styles/scss/normalize.scss'
import '@/assets/styles/scss/base-style.scss'
import Icon from '@/components/aepIcon'
Vue.component('icon', Icon)
new Vue({
  el: '#app', // this id is in public/index.html
  render: h => h(App)
})

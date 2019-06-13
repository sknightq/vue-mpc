import Vue from 'vue'
import App from '@/views/custom/public/public.vue'
import Icon from '@/components/aepIcon'
Vue.component('icon', Icon)
new Vue({
  el: '#app', // this id is in public/index.html
  render: h => h(App)
})

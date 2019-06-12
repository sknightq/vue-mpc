import Vue from 'vue'
import App from '@/views/dongying/public/public.vue'
import Icon from '@/components/aepIcon'
Vue.component('icon', Icon)
new Vue({
  el: '#app', // this id is in public/index.html
  render: h => h(App)
})

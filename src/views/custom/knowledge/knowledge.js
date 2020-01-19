import Vue from 'vue'
import App from '@/views/custom/knowledge/knowledge.vue'

import '@/assets/styles/scss/normalize.scss'
import '@/assets/styles/scss/base-style.scss'

var vm = new Vue({
  el: '#app', // this id is in public/index.html
  render: h => h(App)
})
window.renderList = function() {
  App.methods.renderList.call(vm.$children[0], arguments)
}

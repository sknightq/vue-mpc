
import Vue from 'vue'
import otherApp from './otherApp'

new Vue({
  render: h => h(otherApp)
}).$mount('#app')

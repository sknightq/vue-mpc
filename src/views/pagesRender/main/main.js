import Vue from 'vue'
import mainApp from './mainApp'

const vueInstance = new Vue({
  render: h => h(mainApp)
}).$mount('#app')

window.updateView = function() {
  mainApp.methods.count.apply(vueInstance.$children[0], arguments)
}

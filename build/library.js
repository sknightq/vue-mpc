// import './index.scss'
import '@/assets/styles/scss/normalize.scss'
import '@/assets/styles/scss/base-style.scss'

import AepHeader from '@/components/aepHeader.vue'
import AepBottomTool from '@/components/aepBottomTool.vue'
import AepFooter from '@/components/aepFooter.vue'
import AepTextarea from '@/components/aepTextarea.vue'
import AepDivision from '@/components/aepDivision.vue'
import AepList from '@/components/aepList.vue'
import AepUpload from '@/components/aepUpload.vue'
import AepLocation from '@/components/aepLocation.vue'
import AepJump from '@/components/aepJump.vue'
import AepEcharts from '@/components/aepEcharts.vue'
import AepDragSelect from '@/components/aepDragSelect.vue'

import messageAssistant from '@/components/assistants/aepMessage'

const components = [AepHeader, AepBottomTool, AepFooter, AepTextarea, AepDivision, AepList, AepUpload, AepLocation, AepJump, AepEcharts, AepDragSelect]

const install = Vue => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
  // add $aepMsg method in global Vue
  messageAssistant(Vue)
}

const aepVue = {
  install
}

export default aepVue

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(aepVue)
}

export { AepHeader, AepFooter, AepTextarea, AepDivision, AepList, AepUpload, AepBottomTool, AepLocation, AepJump, AepEcharts, AepDragSelect }

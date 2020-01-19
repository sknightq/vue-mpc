import '@/assets/icons/angle-first'
import '@/assets/icons/angle-last'
import '@/assets/icons/angle-left'
import '@/assets/icons/angle-right'
import '@/assets/icons/angle-up'
import '@/assets/icons/angle-down'
import '@/assets/icons/angle-double-up'
import '@/assets/icons/angle-double-down'
import '@/assets/icons/search'
import '@/assets/icons/slash'
import '@/assets/icons/plus'
import '@/assets/icons/minus'
import '@/assets/icons/close'
import '@/assets/icons/expand'
import '@/assets/icons/contract'
import '@/assets/icons/target'
import '@/assets/icons/tick'
import '@/assets/icons/microscope'

import '@/assets/icons/files/avi'
import '@/assets/icons/files/doc'
import '@/assets/icons/files/empty'
import '@/assets/icons/files/jpg'
import '@/assets/icons/files/mp3'
import '@/assets/icons/files/mp4'
import '@/assets/icons/files/pdf'
import '@/assets/icons/files/png'
import '@/assets/icons/files/ppt'
import '@/assets/icons/files/rtf'
import '@/assets/icons/files/txt'
import '@/assets/icons/files/xls'
import '@/assets/icons/files/zip'

import AepIcon from '@/components/aepIcon.vue'

function install(Vue) {
  Vue.component('icon', AepIcon)
}

const aepIcons = {
  install
}

export default aepIcons

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(aepIcons)
}

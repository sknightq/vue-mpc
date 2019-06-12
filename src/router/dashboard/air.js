import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/dongying/dashboard/air',
  routes: [
    {
      path: '/',
      name: 'air',
      component: () => import('@/views/dongying/dashboard/air/index.vue')
    },
    {
      path: '/left',
      name: 'airLeft',
      component: () => import('@/views/dongying/dashboard/air/left.vue')
    },
    {
      path: '/right',
      name: 'airLeft',
      component: () => import('@/views/dongying/dashboard/air/right.vue')
    }
  ]
})

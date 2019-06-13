import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/custom/dashboard/air',
  routes: [
    {
      path: '/',
      name: 'air',
      redirect: '/left',
      component: () => import('@/views/custom/dashboard/air/index.vue')
    },
    {
      path: '/left',
      name: 'airLeft',
      component: () => import('@/views/custom/dashboard/air/left.vue')
    },
    {
      path: '/right',
      name: 'airLeft',
      component: () => import('@/views/custom/dashboard/air/right.vue')
    }
  ]
})

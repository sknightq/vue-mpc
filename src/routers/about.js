import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/contact',
      component: Contact
    }
  ]
})
export default router
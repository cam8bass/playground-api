import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/TheHome.vue'

import { initCurrentUserStore } from '@/stores'
import confirmRoutes from './confirm.routes'
import dashboardRoutes from './dashboard.routes'
import signupRoutes from './signup.routes'
import apisRoutes from './apis.routes'
import documentationRoutes from './documentation.routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
  },

  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    ...apisRoutes,
    ...documentationRoutes,
    ...signupRoutes,
    ...confirmRoutes,
    ...dashboardRoutes,
    {
      path: '/:notFound(.*)*',
      name: 'NotFound',
      component: () => import('@/views/TheNotFound.vue'),
      meta: {
        title: ''
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  await initCurrentUserStore()

  next()
})

export default router

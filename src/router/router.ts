import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized
} from 'vue-router'
import HomeView from '@/views/TheHome.vue'

import { initCurrentUserProfile, initUserNotifications } from '@/stores'
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

/**
 * A function that is executed before each route change.
 * @param {RouteLocationNormalized} to - the target route
 * @param {RouteLocationNormalized} from - the current route
 * @param {NavigationGuardNext} next - a function to invoke to continue the navigation
 */
router.beforeEach(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    // Initialize the current user profile and notifications store state
    await initCurrentUserProfile()
    await initUserNotifications()
    next()
  }
)

export default router

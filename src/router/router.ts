import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
    {
      path: '/apis',
      name: 'apis',
      component: () => import('@/views/ApiView.vue')
    },
    {
      path: '/documentation',
      name: 'documentation',
      component: () => import('@/views/DocumentationView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignupView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/TheLogin.vue')
    },
    
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/TheDashboardView.vue'),
      children: [
      
        {
          path: '/myProfile',
          name: 'myProfile',
          component: () => import('@/views/TheProfileView.vue')
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('@/views/TheUsersView.vue')
        },
        {
          path: '/apiKeys',
          name: 'apiKeys',
          component: () => import('@/views/TheApiKeysView.vue')
        },
        {
          path: '/logout',
          name: 'logout',
          component: () => import('@/components/TheLogout.vue')
        }
      ]
    },

    {
      path: '/:notFound(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { protect } from '@/shared/utils'
import { initUserStore } from '@/stores'
import type { routeMetaInterface } from '@/shared/interfaces'

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
      component: () => import('@/views/ApiView.vue'),
      meta: {
        title: 'Playground Api - Apis',
        description: ''
      }
    },
    {
      path: '/documentation',
      name: 'documentation',
      component: () => import('@/views/DocumentationView.vue'),
      meta: {
        title: 'Playground Api - Documentation',
        description: ''
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignupView.vue'),
      meta: {
        title: 'Playground Api - Inscription'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/TheLogin.vue'),
      meta: {}
    },
    {
      path: '/activationAccount/:token',
      name: 'activationAccount',
      component: () => import('@/views/ConfirmView.vue'),
      meta: {
        title: 'Playground Api - Activation de compte '
      }
    },
    {
      path: '/resetEmail/:token',
      name: 'resetEmail',
      component: () => import('@/views/ConfirmView.vue'),
      meta: {
        title: "Playground Api - Réinitialisation de l'e-mail"
      }
    },
    {
      path: '/resetPassword/:token',
      name: 'resetPassword',
      component: () => import('@/views/ConfirmView.vue'),
      meta: {
        title: 'Playground Api - Réinitialisation du mot de passe'
      }
    },
    {
      path: '/confirmRenewal/:token',
      name: 'confirmRenewal',
      component: () => import('@/views/ConfirmView.vue'),
      meta: {
        title: "Playground Api - Renouvellement clé d'api"
      }
    },

    {
      beforeEnter: (to, from, next) => {
        protect(to, from, next)
      },

      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/TheDashboardView.vue'),

      meta: {
        title: 'Playground Api - Dashboard',
        requiresAuth: true,
        role: ['user', 'admin']
      } as routeMetaInterface,
      redirect: '/myProfile',

      children: [
        {
          path: '/myProfile',
          name: 'myProfile',
          component: () => import('@/components/user/TheProfile.vue'),
          meta: {
            title: 'Playground Api - Mon profil',
            requiresAuth: true,
            role: ['user', 'admin']
          } as routeMetaInterface
        },

        {
          path: '/myApiKeys',
          name: 'myApiKeys',
          component: () => import('@/components/user/MyApiKeys.vue'),
          meta: {
            title: "Playground Api - Mes clés d'apis",
            requiresAuth: true,
            role: ['user']
          } as routeMetaInterface
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('@/views/TheUsersView.vue'),
          meta: {
            title: 'Playground Api - Liste utilisateurs ',
            requiresAuth: true,
            role: ['admin']
          } as routeMetaInterface
        },

        {
          path: '/apiKeys',
          name: 'apiKeys',
          component: () => import('@/views/TheApiKeysView.vue'),
          meta: {
            title: 'Playground Api - Liste apis',
            requiresAuth: true,
            role: ['admin']
          } as routeMetaInterface
        }
      ]
    },

    {
      path: '/:notFound(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue'),
      meta: {
        title: ''
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  await initUserStore()

  next()
})

export default router

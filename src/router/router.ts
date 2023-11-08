import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/TheHome.vue'
import { protect } from '@/shared/utils'
import { initUsersStore, initCurrentUserStore, useUsersStore } from '@/stores'
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
      component: () => import('@/views/TheApi.vue'),
      meta: {
        title: 'Playground Api - Apis',
        description: ''
      }
    },
    {
      path: '/documentation',
      name: 'documentation',
      component: () => import('@/views/TheDocumentation.vue'),
      meta: {
        title: 'Playground Api - Documentation',
        description: ''
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/TheSignup.vue'),
      meta: {
        title: 'Playground Api - Inscription'
      }
    },

    {
      path: '/activationAccount/:token',
      name: 'activationAccount',
      component: () => import('@/views/TheConfirm.vue'),
      meta: {
        title: 'Playground Api - Activation de compte '
      }
    },
    {
      path: '/resetEmail/:token',
      name: 'resetEmail',
      component: () => import('@/views/TheConfirm.vue'),
      meta: {
        title: "Playground Api - Réinitialisation de l'e-mail"
      }
    },
    {
      path: '/resetPassword/:token',
      name: 'resetPassword',
      component: () => import('@/views/TheConfirm.vue'),
      meta: {
        title: 'Playground Api - Réinitialisation du mot de passe'
      }
    },
    {
      path: '/confirmRenewal/:token',
      name: 'confirmRenewal',
      component: () => import('@/views/TheConfirm.vue'),
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
      component: () => import('@/views/TheDashboard.vue'),

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
          component: () => import('@/views/user/MyProfile.vue'),
          meta: {
            title: 'Playground Api - Mon profil',
            requiresAuth: true,
            role: ['user', 'admin']
          } as routeMetaInterface
        },

        {
          path: '/myApiKeys',
          name: 'myApiKeys',
          component: () => import('@/views/user/MyApiKeys.vue'),
          meta: {
            title: "Playground Api - Mes clés d'apis",
            requiresAuth: true,
            role: ['user']
          } as routeMetaInterface
        },
        {
          beforeEnter: [initUsersStore],
          path: '/users',
          name: 'users',
          component: () => import('@/views/admin/AllUsers.vue'),
          meta: {
            title: 'Playground Api - Liste utilisateurs',
            requiresAuth: true,
            role: ['admin']
          } as routeMetaInterface
        },

        {
          beforeEnter: async (to, from, next) => {
            const { id } = to.params
            const usersStore = useUsersStore()
            await usersStore.fetchGetUser(id as string)
            next()
          },

          path: '/users/:id',
          name: 'user',
          component: () => import('@/views/admin/UserProfile.vue'),
          meta: {
            title: 'Playground Api - Profil utilisateur',
            requiresAuth: true,
            role: ['admin']
          } as routeMetaInterface
        },

        {
          path: '/apiKeys',
          name: 'apiKeys',
          component: () => import('@/views/admin/AllApiKeys.vue'),
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

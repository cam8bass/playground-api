import type { routeMetaInterface } from '@/shared/interfaces'
import { protect } from '@/shared/utils'
import {
  initAllUsers,
  initCurrentUserApiKeys,
  initSelectedUser,
  initSelectedUserApiKeys
} from '@/stores'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export default [
  {
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
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
    redirect: '/myDashboard',

    children: [
      {
        path: '/myDashboard',
        name: 'myDashboard',
        component: () => import('@/views/user/MyDashboard.vue'),
        meta: {
          title: 'Playground Api - Dashboard',
          requiresAuth: true,
          role: ['user', 'admin']
        } as routeMetaInterface
      },

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
        beforeEnter: [initCurrentUserApiKeys],
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
        beforeEnter: [initAllUsers],
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
        beforeEnter: (
          to: RouteLocationNormalized,
          from: RouteLocationNormalized,
          next: NavigationGuardNext
        ) => {
          const { id } = to.params
          initSelectedUser(String(id))
          initSelectedUserApiKeys(String(id))

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
      }
    ]
  }
]

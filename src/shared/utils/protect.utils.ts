import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import type { routeMetaInterface } from '../interfaces'
import { notificationMessage } from '../messages'
import { initStore } from '@/shared/utils'

export const protect = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const meta = to.meta as routeMetaInterface

  if (meta.requiresAuth && meta.role) {
    const { appStore, userStore } = initStore('appStore', 'userStore')
    if (!appStore || !userStore) return

    let isLoggedIn = false

    if (userStore.getCurrentUser) {
      if (!userStore.getCurrentUser.active) {
        appStore.updateNotificationApp({
          type: 'fail',
          message: notificationMessage.NOTIFICATION_ACCOUNT_INACTIVE
        })
        appStore.updateNavigation({ popup: true })
      } else if (
        userStore.getCurrentUser.accountLockedExpire &&
        userStore.getCurrentUser.accountLocked
      ) {
        appStore.updateNotificationApp({
          type: 'fail',
          message: notificationMessage.NOTIFICATION_ACCOUNT_LOCKED
        })
        appStore.updateNavigation({ popup: true })
      } else if (!meta.role.includes(userStore.getCurrentUser.role)) {
        appStore.updateNotificationApp({
          type: 'fail',
          message: notificationMessage.NOTIFICATION_ACCESS_DENIED
        })
        appStore.updateNavigation({ popup: true })
      } else {
        isLoggedIn = true
      }
    }

    if (isLoggedIn) {
      next()
    } else {
      appStore.updateNavigation({ login: true })
      next('/home')
    }
  } else {
    next()
  }
}

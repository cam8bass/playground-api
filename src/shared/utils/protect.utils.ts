import { useAppStore, useUserStore } from '@/stores'

import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import type { routeMetaInterface } from '../interfaces'
import { notificationMessage } from '../messages'

export const protect = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const meta = to.meta as routeMetaInterface

  if (meta.requiresAuth && meta.role) {
    const userStore = useUserStore()
    const appStore = useAppStore()
    let isLoggedIn = false

    if (userStore.getCurrentUser) {
      if (!userStore.getCurrentUser.active) {
        appStore.updateNotification('fail', notificationMessage.NOTIFICATION_ACCOUNT_INACTIVE)
        appStore.updatePopup(true)
      } else if (userStore.getCurrentUser.accountLockedExpire) {
        appStore.updateNotification('fail', notificationMessage.NOTIFICATION_ACCOUNT_LOCKED)
        appStore.updatePopup(true)
      } else if (!meta.role.includes(userStore.getCurrentUser.role)) {
        appStore.updateNotification('fail', notificationMessage.NOTIFICATION_ACCESS_DENIED)
        appStore.updatePopup(true)
      } else {
        isLoggedIn = true
      }
    }

    if (isLoggedIn) {
      next()
    } else {
      appStore.updateLogin(true)
      next('/home')
    }
  } else {
    next()
  }
}

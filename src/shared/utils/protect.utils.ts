import { useAppStore, useCurrentUserStore } from '@/stores'

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
    const currentUserStore = useCurrentUserStore()
    const appStore = useAppStore()
    let isLoggedIn = false

    if (currentUserStore.getCurrentUser) {
      if (!currentUserStore.getCurrentUser.active) {
        appStore.updateNotification('fail', notificationMessage.NOTIFICATION_ACCOUNT_INACTIVE)
        appStore.updatePopup(true)
      } else if (currentUserStore.getCurrentUser.accountLockedExpire) {
        appStore.updateNotification('fail', notificationMessage.NOTIFICATION_ACCOUNT_LOCKED)
        appStore.updatePopup(true)
      } else if (!meta.role.includes(currentUserStore.getCurrentUser.role)) {
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

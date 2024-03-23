import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import type { routeMetaInterface } from '../interfaces'
import { errorMesage } from '../messages'
import { AppError, catchAsync, initStore } from '@/shared/utils'

export const protect = catchAsync(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const meta = to.meta as routeMetaInterface

    if (meta.requiresAuth && meta.role) {
      const { userStore } = initStore('userStore')

      if (userStore.getCurrentUser) {
        if (!userStore.getCurrentUser.active) {
          next('/home')
          throw new AppError({
            message: errorMesage.ERROR_ACCOUNT_INACTIVE,
            categories: 'security'
          })
        } else if (
          userStore.getCurrentUser.accountLockedExpire &&
          userStore.getCurrentUser.accountLocked
        ) {
          next('/home')

          throw new AppError({
            message: errorMesage.ERROR_ACCOUNT_LOCKED,
            categories: 'security'
          })
        } else if (!meta.role.includes(userStore.getCurrentUser.role)) {
          next('/home')

          throw new AppError({
            message: errorMesage.ERROR_ACCESS_DENIED,
            categories: 'security'
          })
        }
      } else {
        next('/home')

        throw new AppError({
          message: errorMesage.ERROR_LOGIN_REQUIRED,
          categories: 'security'
        })
      }
    }
    next()
  }
)

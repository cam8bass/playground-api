import {
  type userInterface,
  type NotificationInterface,
  type FilterAppInterface,
  DEFAULT_FILTER_NOTIFICATION
} from '@/shared/interfaces'

import { defineStore } from 'pinia'
import { userStoreActions } from './CurrentUserStore.action'
import { userStoreGetters } from './CurrentUserStore.getters'

interface UserStateInterface {
  currentUser: userInterface | null
  notification: NotificationInterface | null
  refresh: {
    currentUser: boolean
    notification: boolean
  }
  filter: FilterAppInterface
}

export const useCurrentUserStore = defineStore('currentUserStore', {
  state: (): UserStateInterface => ({
    currentUser: null,

    notification: null,
    refresh: {
      currentUser: true,
      notification: true
    },
    filter: {
      notification: { ...DEFAULT_FILTER_NOTIFICATION }
    }
  }),
  getters: userStoreGetters(),
  actions: userStoreActions()
})

/**
 * Initialize the current user's profile.
 *
 * This function will fetch the current user's profile from the server and store it in the store. It will also update the refresh property to false, indicating that the profile has been loaded.
 *
 * @returns {void}
 */
// export async function initCurrentUserProfile(): Promise<void> {
//   const userStore = useUserStore()
//   if (userStore.getRefresh.currentUser) {
//     await userStore.fetchGetUser()
//     userStore.updateRefresh({ user: false })
//   }
// }

/**
 * Initialize the user's notifications.
 *
 * This function will fetch the user's notifications from the server and store them in the store. It will also update the refresh property to false, indicating that the notifications have been loaded.
 *
 * @returns {void}
 */
// export async function initUserNotifications(): Promise<void> {
//   const userStore = useUserStore()
//   if (userStore.getRefresh.notification && userStore.isLoggedIn) {
//     await userStore.fetchUserNotifications()
//     userStore.updateRefresh({ notification: false })
//   }
// }

export type CurrentUserStore = ReturnType<typeof useCurrentUserStore>

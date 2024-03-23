import {
  type userInterface,
  type NotificationInterface,
  type FilterAppInterface,
  DEFAULT_FILTER_NOTIFICATION,
  type FilterNotificationInterface,
  type NotificationDetailInterface,
  type confirmResetEmailInterface,
  type confirmResetPasswordInterface,
  type forgotPasswordSubmitInterface,
  type loginInterface,
  type nameSubmitInterface,
  type passwordSubmitInterface,
  type signupInterface,
  type jsonResponseInterface
} from '@/shared/interfaces'

import { AppError, initStore, sendRequest } from '@/shared/utils'
import { defineStore } from 'pinia'

interface UserStateInterface {
  currentUser: userInterface | null
  notification: NotificationInterface | null
  refresh: {
    currentUser: boolean
    notification: boolean
  }
  filter: FilterAppInterface
}

export const useUserStore = defineStore('userStore', {
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
  getters: {
    getCurrentUser(): userInterface | null {
      return this.currentUser
    },

    getRefresh(): { currentUser: boolean; notification: boolean } {
      return this.refresh
    },

    getFilterNotification(): FilterNotificationInterface {
      return this.filter.notification
    },
    getUserNotifications(): NotificationDetailInterface[] | [] {
      if (this.notification) {
        if (this.filter.notification.all) {
          return this.notification.notifications.sort((a, b) =>
            a.createdAt < b.createdAt ? 1 : -1
          )
        } else if (this.filter.notification.unread) {
          return this.notification.notifications
            .filter((notification) => !notification.read)
            .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        } else if (this.filter.notification.read) {
          return this.notification.notifications
            .filter((notification) => notification.read)
            .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        }
      }
      return []
    },

    getNotificationId(): string | null {
      if (this.notification) {
        return this.notification._id
      }
      return null
    },

    getTotalNotificationsCount(): number {
      if (this.notification) {
        return this.notification.notifications.length
      }
      return 0
    },

    getUnreadNotificationsCount(): number {
      if (this.notification) {
        return this.notification.notifications.filter((el) => !el.read).length
      }
      return 0
    },

    getReadNotificationsCount(): number {
      if (this.notification) {
        return this.notification.notifications.filter((el) => el.read).length
      }
      return 0
    },
    isAdmin(): boolean {
      if (this.currentUser) {
        return this.currentUser.role === 'admin'
      }
      return false
    },
    isUser(): boolean {
      if (this.currentUser) {
        return this.currentUser.role === 'user'
      }
      return false
    },
    isLoggedIn(): boolean {
      return this.currentUser ? true : false
    }
  },
  actions: {
    async fetchGetUser(): Promise<void> {
      const devUrl = '/playground-connect/v1/users/me'
      const response = await sendRequest(devUrl, 'GET')

      if (response.status === 'success' && response.data) {
        this.currentUser = response.data as userInterface
      }
    },

    async fetchLogout(): Promise<void> {
      const devUrl = '/playground-connect/v1/users/logout'
      await sendRequest(devUrl, 'GET')
    },

    async fetchSignup(values: signupInterface): Promise<void> {
      if (values) {
        const devUrl = '/playground-connect/v1/users/signup'
        await sendRequest(devUrl, 'POST', values)
      }
      return
    },

    async fetchLogin(values: loginInterface): Promise<void> {
      if (values) {
        const devUrl = '/playground-connect/v1/users/login'
        const response: jsonResponseInterface = await sendRequest(devUrl, 'POST', values)
        if (response.data && response.status === 'success') {
          this.currentUser = response.data
        }
      }
      return
    },

    async fetchActivationAccountForm(values: loginInterface, token: string): Promise<void> {
      if (values && token) {
        const devUrl = `/playground-connect/v1/users/activationAccount/${token}`
        const response: jsonResponseInterface = await sendRequest(devUrl, 'PATCH', values)

        if (response.data && response.status === 'success') {
          this.currentUser = response.data
        }
      }
      return
    },

    async fetchUpdateUser(values: nameSubmitInterface): Promise<void> {
      if (values) {
        const devUrl = '/playground-connect/v1/users/updateProfile'
        const response: jsonResponseInterface = await sendRequest(devUrl, 'PATCH', values)

        if (response.data && response.status === 'success') {
          this.currentUser = response.data
        }
      }
      return
    },
    async fetchUpdatePassword(values: passwordSubmitInterface): Promise<void> {
      if (values) {
        const devUrl = '/playground-connect/v1/users/updatePassword'
        await sendRequest(devUrl, 'PATCH', values)
      }
      return
    },

    async fetchChangeEmailRequest(): Promise<void> {
      const devUrl = '/playground-connect/v1/users/changeEmail'
      await sendRequest(devUrl, 'POST')
    },

    async fetchResetEmail(values: confirmResetEmailInterface, token: string): Promise<void> {
      if (values && token) {
        const devUrl = `/playground-connect/v1/users/resetEmail/${token}`
        const response: jsonResponseInterface = await sendRequest(devUrl, 'PATCH', values)

        if (response.data && response.status === 'success') {
          this.currentUser = response.data
        }
      }
      return
    },

    async fetchForgotPassword(values: forgotPasswordSubmitInterface): Promise<void> {
      if (values) {
        const devUrl = '/playground-connect/v1/users/forgotPassword'
        await sendRequest(devUrl, 'POST', values)
      }
      return
    },

    async fetchResetPassword(values: confirmResetPasswordInterface, token: string): Promise<void> {
      if (values && token) {
        const devUrl = `/playground-connect/v1/users/resetPassword/${token}`
        await sendRequest(devUrl, 'PATCH', values)
      }
      return
    },

    async fetchDeactivationAccount(): Promise<void> {
      const devUrl = '/playground-connect/v1/users/disableAccount'
      await sendRequest(devUrl, 'DELETE')
    },

    // NOTIFICATION

    async fetchUserNotifications(): Promise<void> {
      const devUrl = '/playground-connect/v1/notification/myNotifications'

      const response: jsonResponseInterface = await sendRequest(devUrl, 'GET')

      if (response.data && response.status === 'success') {
        this.notification = response.data
      }
    },

    async fetchUpdateViewUserNotification(idNotification: string): Promise<void> {
      const devUrl = `/playground-connect/v1/notification/updateViewNotification/${idNotification}`

      const response: jsonResponseInterface = await sendRequest(devUrl, 'PATCH')

      if (response.data && response.status === 'success') {
        this.notification = response.data
      }
    },

    async fetchUpdateUserNotification(idNotification: string): Promise<void> {
      const devUrl = `/playground-connect/v1/notification/updateNotification/${idNotification}`

      const response: jsonResponseInterface = await sendRequest(devUrl, 'PATCH')

      if (response.data && response.status === 'success') {
        this.notification = response.data
      }
    },
    async fetchDeleteSelectedUserNotification(idNotification: string): Promise<void> {
      const devUrl = `/playground-connect/v1/notification/deleteSelectedNotification/${idNotification}`

      const response: jsonResponseInterface = await sendRequest(devUrl, 'PATCH')

      if (response.data && response.status === 'success') {
        this.notification = response.data
      }
    },
    async fetchUpdateAllNotificationsUser(): Promise<void> {
      const devUrl = `/playground-connect/v1/notification/updateAllNotification`
      const response: jsonResponseInterface = await sendRequest(devUrl, 'PATCH')

      if (response.data && response.status === 'success') {
        this.notification = response.data
      }
    },
    async fetchDeleteAllNotificationsUser(idNotification: string): Promise<void> {
      const devUrl = `/playground-connect/v1/notification/deleteAllNotifications/${idNotification}`
      const response: jsonResponseInterface = await sendRequest(devUrl, 'DELETE')

      if (response.status === 'success') {
        this.notification = null
      }
    },

    // Other

    resetUserStore(): void {
      this.currentUser = null
      this.notification = null
      this.refresh = {
        currentUser: true,
        notification: true
      }
      this.filter = {
        notification: { ...DEFAULT_FILTER_NOTIFICATION }
      }
    },

    updateRefresh(refresh: {
      currentUser?: boolean
      apiKey?: boolean
      notification?: boolean
    }): void {
      this.refresh.currentUser = refresh.currentUser ?? this.refresh.currentUser
      this.refresh.notification = refresh.notification ?? this.refresh.notification
    },
    updateFilter(filter: Partial<FilterAppInterface>): void {
      if (filter.notification) {
        this.filter.notification = filter.notification ?? this.filter.notification
      }
    }
  }
})

/**
 * Initialize the current user's profile.
 *
 * This function will fetch the current user's profile from the server and store it in the store. It will also update the refresh property to false, indicating that the profile has been loaded.
 *
 * @returns {void}
 */
export async function initCurrentUserProfile(): Promise<void> {
  const { userStore } = initStore('userStore')

  if (userStore.getRefresh.currentUser) {
    await userStore.fetchGetUser()
    userStore.updateRefresh({ currentUser: false })
  }
}

/**
 * Initialize the user's notifications.
 *
 * This function will fetch the user's notifications from the server and store them in the store. It will also update the refresh property to false, indicating that the notifications have been loaded.
 *
 * @returns {void}
 */
export async function initUserNotifications(): Promise<void> {
  const { userStore } = initStore('userStore')

  if (userStore.isLoggedIn && userStore.getRefresh.notification) {
    await userStore.fetchUserNotifications()

    userStore.updateRefresh({ notification: false })
  }
}

/**
 * Initialize unviewed notifications.
 *
 * This function will check if the user is logged in, and if there are any unviewed notifications. If there are unviewed notifications, the function will update the notification app state with the unviewed notifications, and update the refresh property to false, indicating that the notifications have been loaded.
 *
 * @returns {void}
 */
export async function initUnviewedNotifications(): Promise<void> {
  const { userStore, appStore } = initStore('userStore', 'appStore')

  if (
    userStore.isLoggedIn &&
    userStore.getUserNotifications.length &&
    appStore.getRefresh.notification
  ) {
    const unviewedNotification = userStore.getUserNotifications.filter(
      (notification) => !notification.view
    )

    if (unviewedNotification.length) {
      appStore.updateNotificationApp(unviewedNotification)
      appStore.updateRefresh({ notification: false })
    }
  }
}

export type UserStore = ReturnType<typeof useUserStore>

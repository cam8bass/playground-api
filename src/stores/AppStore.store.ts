import type { notificationInterface } from '@/shared/interfaces'
import type { modalType, requestStatusType } from '@/shared/types/types'
import { defineStore } from 'pinia'

import type { modalInterface } from '@/shared/interfaces/modal.interface'

interface AppStateInterface {
  loading: boolean
  notification: notificationInterface | null | null
  navigation: {
    login: boolean
    menu: boolean
    popup: boolean
  }
  modal: modalInterface | null
}

export const useAppStore = defineStore('appStore', {
  state: (): AppStateInterface => ({
    loading: false,
    notification: null,
    navigation: {
      login: false,
      menu: false,
      popup: false
    },
    modal: null
  }),
  getters: {
    getMenu(): boolean {
      return this.navigation.menu
    },

    getLogin(): boolean {
      return this.navigation.login
    },

    getpopup(): boolean {
      return this.navigation.popup
    },

    getNotificationMessage(): notificationInterface | null {
      if (this.notification) {
        return this.notification
      }
      return null
    },

    getLoading(): boolean {
      return this.loading
    },

    getModal(): modalInterface | null {
      if (this.modal) {
        return this.modal
      }
      return null
    }
  },
  actions: {
    updateLoading(status: boolean): void {
      this.loading = status
    },

    updateLogin(status: boolean): void {
      this.navigation.login = status
    },

    updateMenu(status: boolean): void {
      this.navigation.menu = status
    },

    updatePopup(status: boolean): void {
      this.navigation.popup = status
    },

    updateNotification(type: requestStatusType | null, message: string | null): void {
      this.notification = {
        type,
        message
      }
    },

    resetNotification() {
      this.notification = null
    },

    updateModal(type: modalType | null, title: string, message: string, _id?: string) {
      this.modal = {
        message,
        type,
        title,
        _id
      }
    },
    resetModal() {
      this.modal = null
    }
  }
})

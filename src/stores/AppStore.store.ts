import type { FiltersInterface, notificationInterface } from '@/shared/interfaces'
import type { modalType, requestStatusType } from '@/shared/types/types'
import { defineStore } from 'pinia'

import type { modalInterface } from '@/shared/interfaces/modal.interface'

interface AppStateInterface {
  loading: boolean
  notification: notificationInterface | null | null
  modal: modalInterface | null

  navigation: {
    login: boolean
    menu: boolean
    popup: boolean
    menuFilter: boolean
  }
  showFilters: FiltersInterface
}

export const useAppStore = defineStore('appStore', {
  state: (): AppStateInterface => ({
    loading: false,
    notification: null,
    navigation: {
      login: false,
      menu: false,
      popup: false,
      menuFilter: true
    },
    showFilters: {
      fields: false,
      limit: false,
      parameters: false,
      sort: false
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
    getMenuFilter(): boolean {
      return this.navigation.menuFilter
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
    },
    getShowFilters(): FiltersInterface {
      return this.showFilters
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
    updateMenuFilter(status: boolean): void {
      this.navigation.menuFilter = status
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

    updateModal(modal: {
      type: modalType | null
      title: string
      message: string
      id?: { idUser?: string; idApi?: string }
    }) {
      this.modal = {
        message: modal.message,
        type: modal.type,
        title: modal.title,
        id: modal.id
      }
    },
    resetModal() {
      this.modal = null
    },
    updateShowFilters(filters: Partial<FiltersInterface>): void {
      this.showFilters = {
        fields: filters.fields ?? this.showFilters.fields,
        limit: filters.limit ?? this.showFilters.limit,
        parameters: filters.parameters ?? this.showFilters.parameters,
        sort: filters.sort ?? this.showFilters.sort
      }
    }
  }
})

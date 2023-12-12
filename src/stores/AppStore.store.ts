import type {
  ShowInterface,
  modalInterface,
  notificationInterface,
  updateModalInterface
} from '@/shared/interfaces'
import type { requestStatusType } from '@/shared/types/types'
import { defineStore } from 'pinia'

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
  show: ShowInterface
}

export const useAppStore = defineStore('appStore', {
  state: (): AppStateInterface => ({
    loading: false,
    notification: null,
    navigation: {
      login: false,
      menu: false,
      popup: false,
      menuFilter: false
    },
    show: {
      fields: false,
      limit: false,
      parameters: false,
      sort: false,
      overview: false
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
    getShow(): ShowInterface {
      return this.show
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

    updateModal(modal: updateModalInterface): void {
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
    updateShow(filters: Partial<ShowInterface>): void {
      this.show = {
        fields: filters.fields ?? this.show.fields,
        limit: filters.limit ?? this.show.limit,
        parameters: filters.parameters ?? this.show.parameters,
        sort: filters.sort ?? this.show.sort,
        overview: filters.overview ?? this.show.overview
      }
    }
  }
})

import {
  DEFAULT_NAVIGAION,
  DEFAULT_SHOW,
  type NavigationInterface,
  type modalInterface,
  type updateModalInterface,
  type NotificationAppInterface,
  type ShowInterface
} from '@/shared/interfaces'

import { defineStore } from 'pinia'

interface AppStateInterface {
  loading: boolean
  notification: NotificationAppInterface | null
  modal: modalInterface | null
  navigation: NavigationInterface

  show: ShowInterface
}

export const useAppStore = defineStore('appStore', {
  state: (): AppStateInterface => ({
    loading: false,
    notification: null,
    navigation: { ...DEFAULT_NAVIGAION },

    show: { ...DEFAULT_SHOW },
    modal: null
  }),
  getters: {
    getNavigation(): NavigationInterface {
      return this.navigation
    },

    getNotificationAppMessage(): NotificationAppInterface | null {
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

    updateNavigation(menu: Partial<NavigationInterface>): void {
      this.navigation = {
        login: menu.login ?? this.navigation.login,
        menu: menu.menu ?? this.navigation.menu,
        popup: menu.popup ?? this.navigation.popup,
        menuFilter: menu.menuFilter ?? this.navigation.menuFilter,
        notification: menu.notification ?? this.navigation.notification
      }
    },

    updateNotificationApp(notification: NotificationAppInterface): void {
      this.notification = notification
    },

    resetNotificationApp() {
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

    updateShow(show: Partial<ShowInterface>): void {
      this.show = {
        fields: show.fields ?? this.show.fields,
        limit: show.limit ?? this.show.limit,
        parameters: show.parameters ?? this.show.parameters,
        sort: show.sort ?? this.show.sort,
        overview: show.overview ?? this.show.overview,
        notificationMore: show.notificationMore ?? this.show.notificationMore
      }
    }
  }
})

export type AppStore = ReturnType<typeof useAppStore>

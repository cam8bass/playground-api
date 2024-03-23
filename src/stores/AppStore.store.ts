import {
  DEFAULT_NAVIGAION,
  DEFAULT_SHOW,
  type NavigationInterface,
  type modalInterface,
  type updateModalInterface,
  type ShowInterface,
  type NotificationDetailInterface
} from '@/shared/interfaces'
import { capitalizeFirstLetter } from '@/shared/utils'

import { defineStore } from 'pinia'

interface AppStateInterface {
  loading: boolean
  notification: NotificationDetailInterface[]
  modal: modalInterface | null
  navigation: NavigationInterface
  show: ShowInterface
  refresh: {
    notification: boolean
  }
}

export const useAppStore = defineStore('appStore', {
  state: (): AppStateInterface => ({
    loading: false,
    notification: [],
    navigation: { ...DEFAULT_NAVIGAION },
    show: { ...DEFAULT_SHOW },
    modal: null,
    refresh: {
      notification: true
    }
  }),
  getters: {
    getRefresh(): { notification: boolean } {
      return this.refresh
    },

    getNavigation(): NavigationInterface {
      return this.navigation
    },

    getNotificationAppMessage(): NotificationDetailInterface[] {
      // TODO: Mettre en place le cas du tableau null dans les composants
      return this.notification
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

    updateNotificationApp(notification: NotificationDetailInterface[]): void {
      const updatedNotifications = notification.map((el) => ({
        ...el,
        message: capitalizeFirstLetter(el.message)
      }))

      this.notification = Array.from(new Set([...this.notification, ...updatedNotifications]))
    },



  

    deleteSelectedNotificationApp(id: string): void {
      this.notification = this.notification.filter((el) => el._id !== id)
    },

    resetNotificationApp() {
      this.notification = []
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
    },

    updateRefresh(refresh: { notification?: boolean }): void {
      this.refresh.notification = refresh.notification ?? this.refresh.notification
    }
  }
})

export type AppStore = ReturnType<typeof useAppStore>

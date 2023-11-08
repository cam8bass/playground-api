import type {
  AdminUpdateUserInterface,
  AdminUsersInterface,
  adminSubmitActiveApiKey,
  apiKeyInterface,
  jsonResponseInterface
} from '@/shared/interfaces'
import { sendRequest } from '@/shared/utils'
import { defineStore } from 'pinia'
import type { Ref } from 'vue'

interface UsersStateInterface {
  users: [AdminUsersInterface] | null
  user: AdminUsersInterface | null
  results: number
  refresh: boolean
}

export const useUsersStore = defineStore('UsersStore', {
  state: (): UsersStateInterface => ({
    users: null,
    user: null,
    results: 0,
    refresh: true
  }),
  getters: {
    getAllUsers(): [AdminUsersInterface] | null {
      if (this.users) {
        return this.users
      }
      return null
    },

    getUser(): AdminUsersInterface | null {
      if (this.user) {
        return this.user
      }
      return null
    },
    getUserApiKeys(): [apiKeyInterface] | null {
      if (this.user && this.user.apiKeys) {
        return this.user.apiKeys
      }
      return null
    },

    getNumberOfUsers(): number {
      return this.results
    },

    getUserApiKeyCount(): number {
      if (this.user && this.user.apiKeys) {
        return this.user.apiKeys.length
      }
      return 0
    },
    getUserActiveApiKeyCount(): number {
      if (this.user && this.user.apiKeys) {
        return this.user.apiKeys.filter((apiKey) => apiKey.active).length
      }
      return 0
    },
    getUserPendingApiKeyCount(): number {
      if (this.user && this.user.apiKeys) {
        return this.user.apiKeys.filter((apiKey) => !apiKey.active).length
      }
      return 0
    }
  },
  actions: {
    async fetchGetAllUsers(): Promise<void> {
      const devUrl = '/playground-connect/v1/admin/users'
      const { data } = await sendRequest(devUrl, 'GET')

      if (data.value && data.value.status === 'success') {
        this.users = data.value.data as [AdminUsersInterface]

        if (data.value.results) {
          this.results = data.value.results
        }
      }
    },

    async fetchGetUser(idUser: string) {
      const devUrl = `/playground-connect/v1/admin/users/${idUser}`
      const { data } = await sendRequest(devUrl, 'GET')

      if (data.value && data.value.status === 'success') {
        this.user = data.value.data
      }
    },

    async fetchDeleteUser(iduser: string): Promise<void> {
      const devUrl = `/playground-connect/v1/admin/users/${iduser}`
      const { data } = await sendRequest(devUrl, 'DELETE')
      await this.reloadAllUsers(data)
    },

    async fetchActiveApiKey(
      value: adminSubmitActiveApiKey,
      idUser: string,
      idApi: string
    ): Promise<void> {
      const devUrl = `/playground-connect/v1/admin/users/${idUser}/apiKeys/activeApiKey/${idApi}`
      const { data } = await sendRequest(devUrl, 'PATCH', value)

      await this.reloadUser(data, idUser)
    },

    async fetchAdminDeleteSelectedApiKey(idUser: string, idApi: string): Promise<void> {
      const devUrl = `/playground-connect/v1/admin/users/${idUser}/apiKeys/deleteApiKey/${idApi}`
      const { data } = await sendRequest(devUrl, 'DELETE')

      await this.reloadUser(data, idUser)
    },

    async fetchAdminCreateApiKey(values: string, idUser: string): Promise<void> {
      const devUrl = '/playground-connect/v1/admin/apiKeys'
      const { data } = await sendRequest(devUrl, 'POST', { apiName: values, user: idUser })
      await this.reloadUser(data, idUser)
    },

    async fetchAdminUpdateUser(values: AdminUpdateUserInterface, idUser: string) {
      const devUrl = `/playground-connect/v1/admin/users/${idUser}`

      const { data } = await sendRequest(devUrl, 'PATCH', values)
      console.log(data.value)
    },
    async fetchCreateUser() {},

    async reloadUser(data: Ref<jsonResponseInterface | null>, idUser: string): Promise<void> {
      if (data.value && data.value.status === 'success') {
        await this.fetchGetUser(idUser)
      }
    },

    async reloadAllUsers(data: Ref<jsonResponseInterface | null>): Promise<void> {
      if (data.value && data.value.status === 'success') {
        this.refresh = true
        await initUsersStore()
      }
    }
  }
})

export async function initUsersStore(): Promise<void> {
  const usersStore = useUsersStore()

  if (usersStore.refresh) {
    await usersStore.fetchGetAllUsers()
  }
  usersStore.refresh = false
}

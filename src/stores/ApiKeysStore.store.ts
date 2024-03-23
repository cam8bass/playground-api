import {
  type ApiKeyInterface,
  type adminSubmitActiveApiKey,
  type jsonResponseInterface,
  type loginInterface,
  type requestCreateNewApiKeyInterface
} from '@/shared/interfaces'

import { initStore, sendRequest } from '@/shared/utils'
import { defineStore } from 'pinia'

export interface ApiKeysStateInterface {
  apiKeys: {
    currentUser: ApiKeyInterface | null
    selectedUser: ApiKeyInterface | null
  }
  refresh: {
    currentUser: boolean
    selectedUser: boolean
  }
}

export const useApiKeysStore = defineStore('apiKeysStore', {
  state: (): ApiKeysStateInterface => ({
    apiKeys: {
      currentUser: null,
      selectedUser: null
    },
    refresh: {
      currentUser: true,
      selectedUser: true
    }
  }),
  getters: {
    // USER
    getCurrentUserApiKeys(): ApiKeyInterface | null {
      if (this.apiKeys.currentUser) {
        return this.apiKeys.currentUser
      }
      return null
    },

    getCurrentUserApiKeysCount(): number {
      if (this.apiKeys.currentUser) {
        return this.apiKeys.currentUser.apiKeys.length
      }
      return 0
    },

    // ADMIN

    getSelectedUserApiKeys(): ApiKeyInterface | null {
      if (this.apiKeys.selectedUser) {
        return this.apiKeys.selectedUser
      }
      return null
    },

    getSelectedUserApiKeysCount(): number {
      if (this.apiKeys.selectedUser) return this.apiKeys.selectedUser.apiKeys.length
      return 0
    },

    getSelectedUserActiveApiKeysCount(): number {
      if (this.apiKeys.selectedUser)
        return this.apiKeys.selectedUser.apiKeys.filter((apiKey) => apiKey.active).length
      return 0
    },

    getSelectedUserPendingApiKeysCount(): number {
      if (this.apiKeys.selectedUser)
        return this.apiKeys.selectedUser.apiKeys.filter((apiKey) => !apiKey.active).length
      return 0
    },

    // ALL

    getRefresh(): { currentUser: boolean; selectedUser: boolean } {
      return this.refresh
    }
  },
  actions: {
    // ADMIN

    async fetchAdminGetApiKeys(idApi: string): Promise<void> {
      if (idApi) {
        const devUrl = `/playground-connect/v1/admin/apiKeys/${idApi}`
        const response: jsonResponseInterface = await sendRequest(devUrl, 'GET')
        if (response.data && response.status === 'success') {
          this.apiKeys.selectedUser = response.data
        }
      }
      return
    },

    async fetchAdminGetSelectedUserApiKeys(idUser: string): Promise<void> {
      if (idUser) {
        const devUrl = `/playground-connect/v1/admin/getUserApiKeys/${idUser}`
        const response: jsonResponseInterface = await sendRequest(devUrl, 'GET')
        if (response.data && response.status === 'success') {
          this.apiKeys.selectedUser = response.data
        }
      }
      return
    },

    async fetchAdminCreateApiKey(values: string, idUser: string): Promise<void> {
      if (idUser && values) {
        const devUrl = '/playground-connect/v1/admin/apiKeys'
        const response: jsonResponseInterface = await sendRequest(devUrl, 'POST', {
          apiName: values,
          idUser: idUser
        })
        if (response.data && response.status === 'success') {
          this.apiKeys.selectedUser = response.data
        }
      }
      return
    },

    async fetchAdminDeleteSelectedApiKey(idUser: string, idApi: string): Promise<void> {
      if (idUser && idApi) {
        const devUrl = `/playground-connect/v1/admin/users/${idUser}/apiKeys/deleteApiKey/${idApi}`
        const response: jsonResponseInterface = await sendRequest(devUrl, 'DELETE')

        if (response.data && response.status === 'success') {
          this.apiKeys.selectedUser = response.data
        }
      }
      return
    },
    async fetchAdminActiveApiKey(
      value: adminSubmitActiveApiKey,
      idUser: string,
      idApi: string
    ): Promise<void> {
      if (value && idUser && idApi) {
        const devUrl = `/playground-connect/v1/admin/users/${idUser}/apiKeys/activeApiKey/${idApi}`
        const response: jsonResponseInterface = await sendRequest(devUrl, 'PATCH', value)
        if (response.data && response.status === 'success') {
          this.apiKeys.selectedUser = response.data
        }
        if (this.apiKeys.selectedUser && this.apiKeys.selectedUser.apiKeys.length < 1) {
          this.resetSelectedUserApiKeys()
        }
      }
      return
    },

    async fetchAdminDeleteAllApiKeysFromUser(idApi: string): Promise<void> {
      if (idApi) {
        const devUrl = `/playground-connect/v1/admin/apiKeys/${idApi}`

        const response: jsonResponseInterface = await sendRequest(devUrl, 'DELETE')
        if (response.data && response.status === 'success') {
          this.resetSelectedUserApiKeys()
        }
      }
      return
    },

    // USER
    async fetchUserGetMyApiKeys(): Promise<void> {
      const devUrl = '/playground-connect/v1/apiKeys/'
      const response: jsonResponseInterface = await sendRequest(devUrl, 'GET')
      if (response.data && response.status === 'success') {
        this.apiKeys.currentUser = response.data
      }
    },
    async fetchUserRequestCreateNewApiKey(value: requestCreateNewApiKeyInterface): Promise<void> {
      if (value) {
        const devUrl = '/playground-connect/v1/apiKeys'
        const response: jsonResponseInterface = await sendRequest(devUrl, 'POST', value)
        if (response.data && response.status === 'success') {
          this.apiKeys.currentUser = response.data
        }
      }
      return
    },

    async fetchUserDeleteSelectedApiKey(idApi: string): Promise<void> {
      if (idApi) {
        const devUrl = `/playground-connect/v1/apiKeys/deleteApiKey/${idApi}`
        const response: jsonResponseInterface = await sendRequest(devUrl, 'DELETE')
        if (response.data && response.status === 'success') {
          this.apiKeys.currentUser = response.data
        }
      }
      return
    },

    async fetchUserRequestRenewalApiKey(idApi: string): Promise<void> {
      if (idApi) {
        const devUrl = `/playground-connect/v1/apiKeys/renewal/${idApi}`
        await sendRequest(devUrl, 'PATCH')
      }
      return
    },

    async fetchUserConfirmRenewalApiKey(values: loginInterface, token: string): Promise<void> {
      if (values && token) {
        const devUrl = `/playground-connect/v1/apiKeys/confirmRenewal/${token}`
        const response: jsonResponseInterface = await sendRequest(devUrl, 'PATCH', values)
        if (response.data && response.status === 'success') {
          this.apiKeys.currentUser = response.data
        }
      }
      return
    },

    // OTHER
    resetCurrentUserApiKeys(): void {
      this.apiKeys.currentUser = null
    },

    resetSelectedUserApiKeys(): void {
      this.apiKeys.selectedUser = null
    },

    resetApiKeysStore(): void {
      this.apiKeys = {
        currentUser: null,
        selectedUser: null
      }
      this.refresh = {
        currentUser: true,
        selectedUser: true
      }
    },

    updateRefresh(status: { currentUser?: boolean; selectedUser?: boolean }): void {
      this.refresh.currentUser = status.currentUser ? status.currentUser : this.refresh.currentUser

      this.refresh.selectedUser = status.selectedUser
        ? status.selectedUser
        : this.refresh.selectedUser
    }
  }
})

export async function initSelectedUserApiKeys(idUser: string): Promise<void> {
  const { apiKeysStore } = initStore('apiKeysStore')

  //FIXME: si un utilisateur ne possède pas de clé d'api alors la requete de recherche de clé d'api ce lancera a chaque fois que lon clique sur le profil ce qui est pas bon
  if (!apiKeysStore.getSelectedUserApiKeys) {
    apiKeysStore.updateRefresh({ selectedUser: true })
  }

  if (
    apiKeysStore.getSelectedUserApiKeys &&
    apiKeysStore.getSelectedUserApiKeys.user._id !== idUser
  ) {
    apiKeysStore.resetSelectedUserApiKeys()
    apiKeysStore.updateRefresh({ selectedUser: true })
  }

  if (apiKeysStore.getRefresh.selectedUser) {
    await apiKeysStore.fetchAdminGetSelectedUserApiKeys(idUser)
    apiKeysStore.updateRefresh({ selectedUser: false })
  }
}

/**
 * Initialize the current user's API keys.
 *
 * This function will fetch the current user's API keys from the server and store them in the store. It will also update the refresh property to false, indicating that the API keys have been loaded.
 *
 * @returns {void}
 */
export async function initCurrentUserApiKeys(): Promise<void> {
  const { apiKeysStore } = initStore('apiKeysStore')

  if (apiKeysStore.getRefresh.currentUser) {
    await apiKeysStore.fetchUserGetMyApiKeys()
    apiKeysStore.updateRefresh({ currentUser: false })
  }
}

export type ApiKeysStore = ReturnType<typeof useApiKeysStore>

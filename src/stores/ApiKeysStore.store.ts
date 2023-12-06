import type { ApiKeyInterface, KeyInterface, adminSubmitActiveApiKey } from '@/shared/interfaces'

import { sendRequest } from '@/shared/utils'
import { defineStore } from 'pinia'

interface ApiKeysStateInterface {
  apiKeys: ApiKeyInterface[] | null
  apiKey: ApiKeyInterface | null
  results: number
  refresh: { users: boolean; apiKeys: boolean }
}

export const useApiKeysStore = defineStore('apiKeysStore', {
  state: (): ApiKeysStateInterface => ({
    apiKeys: null,
    apiKey: null,
    results: 0,
    refresh: {
      users: true,
      apiKeys: true
    }
  }),
  getters: {
    getRefresh(): { users: boolean; apiKeys: boolean } {
      return this.refresh
    },

    getKeys(): KeyInterface[] | null {
      if (this.apiKey) {
        return this.apiKey.apiKeys
      }
      return null
    },

    getUserApiKeys(): ApiKeyInterface | null {
      if (this.apiKey) return this.apiKey
      return null
    },

    getUserApiKeysCount(): number {
      if (this.apiKey) return this.apiKey.apiKeys.length
      return 0
    },

    getUserActiveApiKeysCount(): number {
      if (this.apiKey) return this.apiKey.apiKeys.filter((apiKey) => apiKey.active).length
      return 0
    },

    getUserPendingApiKeysCount(): number {
      if (this.apiKey) return this.apiKey.apiKeys.filter((apiKey) => !apiKey.active).length
      return 0
    }
  },
  actions: {
    // ADMIN
    async fetchAdminGetAllApiKeys(): Promise<void> {},

    async fetchAdminGetApiKeys(idApi: string): Promise<void> {
      const devUrl = `/playground-connect/v1/admin/apiKeys/${idApi}`
      const { data } = await sendRequest(devUrl, 'GET')
      if (data.value && data.value.status === 'success' && data.value.data) {
        this.apiKey = data.value.data
      }
    },

    async fetchAdminGetSelectedUserApiKeys(idUser: string): Promise<void> {
      const devUrl = `/playground-connect/v1/admin/getUserApiKeys/${idUser}`
      const { data } = await sendRequest(devUrl, 'GET')
      if (data.value && data.value.status === 'success' && data.value.data) {
        this.apiKey = data.value.data
      }
    },

    async fetchAdminCreateApiKey(values: string, idUser: string): Promise<void> {
      const devUrl = '/playground-connect/v1/admin/apiKeys'
      const { data } = await sendRequest(devUrl, 'POST', { apiName: values, user: idUser })
      if (data.value && data.value.status === 'success' && data.value.data) {
        this.apiKey = data.value.data
      }
    },
    async fetchAdminDeleteSelectedApiKey(idUser: string, idApi: string): Promise<void> {
      const devUrl = `/playground-connect/v1/admin/users/${idUser}/apiKeys/deleteApiKey/${idApi}`
      const { data } = await sendRequest(devUrl, 'DELETE')

      if (data.value && data.value.status === 'success' && data.value.data) {
        this.apiKey = data.value.data
      }
    },
    async fetchAdminActiveApiKey(
      value: adminSubmitActiveApiKey,
      idUser: string,
      idApi: string
    ): Promise<void> {
      const devUrl = `/playground-connect/v1/admin/users/${idUser}/apiKeys/activeApiKey/${idApi}`
      const { data } = await sendRequest(devUrl, 'PATCH', value)
      if (data.value && data.value.status === 'success' && data.value.data) {
        this.apiKey = data.value.data
      }
      if (this.apiKey && this.apiKey.apiKeys.length < 1) {
        this.resetApiKey()
      }
    },
    async fetchAdminDeleteAllApiKeysFromUser(): Promise<void> {},

    // Other
    updateRefresh(refresh: { users?: boolean; apiKeys?: boolean }): void {
      this.refresh.users = refresh.users ?? this.refresh.users
      this.refresh.apiKeys = refresh.apiKeys ?? this.refresh.apiKeys
    },

    resetApiKey(): void {
      this.apiKey = null
    },

    resetApiKeysStore(): void {
      this.apiKeys = null
      this.apiKey = null
      this.results = 0
      this.refresh = { users: true, apiKeys: true }
    },

    async reloadAllApiKeys(): Promise<void> {},
    async reloadApiKey(): Promise<void> {},

    async fetchDeleteSelectedApiKeyFromUser(): Promise<void> {}
  }
})

export function initApiKeysStore(): void {}

import { defineStore } from 'pinia'

export const useApiKeysStore = defineStore('apiKeysStore', {
  state: () => ({}),
  getters: {},
  actions: {
    async fetchGetAllApiKeys() {},
    async fetchGetApiKey() {},
    async fetchDeleteAllApiKeysFromUser() {},
    async fetchDeleteSelectedApiKeyFromUser() {},
    async fetchActiveApiKey() {},
    async fetchCreateApiKey() {}

    
  }
})

export function initApiKeysStore(): void {}

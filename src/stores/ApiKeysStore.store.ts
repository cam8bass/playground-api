import {
  type ApiKeyInterface,
  type adminSubmitActiveApiKey,
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
        const { data } = await sendRequest(devUrl, 'GET')
        if (data.value && data.value.status === 'success' && data.value.data) {
          this.apiKeys.selectedUser = data.value.data
        }
      }
      return
    },

    async fetchAdminGetSelectedUserApiKeys(idUser: string): Promise<void> {
      if (idUser) {
        const devUrl = `/playground-connect/v1/admin/getUserApiKeys/${idUser}`
        const { data } = await sendRequest(devUrl, 'GET')
        if (data.value && data.value.status === 'success' && data.value.data) {
          this.apiKeys.selectedUser = data.value.data
        }
      }
      return
    },

    async fetchAdminCreateApiKey(values: string, idUser: string): Promise<void> {
      if (idUser && values) {
        const devUrl = '/playground-connect/v1/admin/apiKeys'
        const { data } = await sendRequest(devUrl, 'POST', { apiName: values, user: idUser })
        if (data.value && data.value.status === 'success' && data.value.data) {
          this.apiKeys.selectedUser = data.value.data
        }
      }
      return
    },

    async fetchAdminDeleteSelectedApiKey(idUser: string, idApi: string): Promise<void> {
      if (idUser && idApi) {
        const devUrl = `/playground-connect/v1/admin/users/${idUser}/apiKeys/deleteApiKey/${idApi}`
        const { data } = await sendRequest(devUrl, 'DELETE')

        if (data.value && data.value.status === 'success' && data.value.data) {
          this.apiKeys.selectedUser = data.value.data
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
        const { data } = await sendRequest(devUrl, 'PATCH', value)
        if (data.value && data.value.status === 'success' && data.value.data) {
          this.apiKeys.selectedUser = data.value.data
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

        const { data } = await sendRequest(devUrl, 'DELETE')
        if (data.value && data.value.status === 'success') {
          this.resetSelectedUserApiKeys()
        }
      }
      return
    },

    // USER
    async fetchUserGetMyApiKeys(): Promise<void> {
      const devUrl = '/playground-connect/v1/apiKeys/'
      const { data } = await sendRequest(devUrl, 'GET')
      if (data.value && data.value.status === 'success' && data.value.data) {
        this.apiKeys.currentUser = data.value.data
      }
    },
    async fetchUserRequestCreateNewApiKey(value: requestCreateNewApiKeyInterface): Promise<void> {
      if (value) {
        const devUrl = '/playground-connect/v1/apiKeys'
        const { data } = await sendRequest(devUrl, 'POST', value)
        if (data.value && data.value.status === 'success' && data.value.data) {
          this.apiKeys.currentUser = data.value.data
        }
      }
      return
    },

    async fetchUserDeleteSelectedApiKey(idApi: string): Promise<void> {
      if (idApi) {
        const devUrl = `/playground-connect/v1/apiKeys/deleteApiKey/${idApi}`
        const { data } = await sendRequest(devUrl, 'DELETE')
        if (data.value && data.value.status === 'success' && data.value.data) {
          this.apiKeys.currentUser = data.value.data
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
        const { data } = await sendRequest(devUrl, 'PATCH', values)
        if (data.value && data.value.status === 'success' && data.value.data) {
          this.apiKeys.currentUser = data.value.data
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

  if (!apiKeysStore) return

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
  if (!apiKeysStore) return

  if (apiKeysStore.getRefresh.currentUser) {
    await apiKeysStore.fetchUserGetMyApiKeys()
    apiKeysStore.updateRefresh({ currentUser: false })
  }
}

export type ApiKeysStore = ReturnType<typeof useApiKeysStore>

// import {
//   type ApiKeyInterface,
//   type KeyInterface,
//   type adminSubmitActiveApiKey
// } from '@/shared/interfaces'

// import { sendRequest } from '@/shared/utils'
// import { defineStore } from 'pinia'
// import { computed } from 'vue'
// import { useCurrentUserStore } from '.'

// export interface ApiKeysStateInterface {
//   apiKey: ApiKeyInterface | null
//   refresh: {
//     apiKey: boolean
//   }
// }

// export const useApiKeysStore = defineStore('apiKeysStore', {

//   state: (): ApiKeysStateInterface => ({
//     apiKey: null,
//     refresh: {
//       apiKey: true
//     }
//   }),
//   getters: {
//     getKeys(): KeyInterface[] | null {
//       if (this.apiKey) {
//         return this.apiKey.apiKeys
//       }
//       return null
//     },

//     getUserApiKeys(): ApiKeyInterface | null {
//       if (this.apiKey) return this.apiKey
//       return null
//     },

//     getUserApiKeysCount(): number {
//       if (this.apiKey) return this.apiKey.apiKeys.length
//       return 0
//     },

//     getUserActiveApiKeysCount(): number {
//       if (this.apiKey) return this.apiKey.apiKeys.filter((apiKey) => apiKey.active).length
//       return 0
//     },

//     getUserPendingApiKeysCount(): number {
//       if (this.apiKey) return this.apiKey.apiKeys.filter((apiKey) => !apiKey.active).length
//       return 0
//     },

//     getRefresh(): { apiKey: boolean } {
//       return this.refresh
//     }
//   },
//   actions: {
//     // ADMIN

//     async fetchAdminGetApiKeys(idApi: string): Promise<void> {
//       if (idApi) {
//         const devUrl = `/playground-connect/v1/admin/apiKeys/${idApi}`
//         const { data } = await sendRequest(devUrl, 'GET')
//         if (data.value && data.value.status === 'success' && data.value.data) {
//           this.apiKey = data.value.data
//         }
//       }
//       return
//     },

//     async fetchAdminGetSelectedUserApiKeys(idUser: string): Promise<void> {
//       if (idUser) {
//         const devUrl = `/playground-connect/v1/admin/getUserApiKeys/${idUser}`
//         const { data } = await sendRequest(devUrl, 'GET')
//         if (data.value && data.value.status === 'success' && data.value.data) {
//           this.apiKey = data.value.data
//         }
//       }
//       return
//     },

//     async fetchAdminCreateApiKey(values: string, idUser: string): Promise<void> {
//       if (idUser && values) {
//         const devUrl = '/playground-connect/v1/admin/apiKeys'
//         const { data } = await sendRequest(devUrl, 'POST', { apiName: values, user: idUser })
//         if (data.value && data.value.status === 'success' && data.value.data) {
//           this.apiKey = data.value.data
//         }
//       }
//       return
//     },

//     async fetchAdminDeleteSelectedApiKey(idUser: string, idApi: string): Promise<void> {
//       if (idUser && idApi) {
//         const devUrl = `/playground-connect/v1/admin/users/${idUser}/apiKeys/deleteApiKey/${idApi}`
//         const { data } = await sendRequest(devUrl, 'DELETE')

//         if (data.value && data.value.status === 'success' && data.value.data) {
//           this.apiKey = data.value.data
//         }
//       }
//       return
//     },
//     async fetchAdminActiveApiKey(
//       value: adminSubmitActiveApiKey,
//       idUser: string,
//       idApi: string
//     ): Promise<void> {
//       if (value && idUser && idApi) {
//         const devUrl = `/playground-connect/v1/admin/users/${idUser}/apiKeys/activeApiKey/${idApi}`
//         const { data } = await sendRequest(devUrl, 'PATCH', value)
//         if (data.value && data.value.status === 'success' && data.value.data) {
//           this.apiKey = data.value.data
//         }
//         if (this.apiKey && this.apiKey.apiKeys.length < 1) {
//           this.resetApiKey()
//         }
//       }
//       return
//     },
//     async fetchAdminDeleteAllApiKeysFromUser(idApi: string): Promise<void> {
//       if (idApi) {
//         const devUrl = `/playground-connect/v1/admin/apiKeys/${idApi}`

//         const { data } = await sendRequest(devUrl, 'DELETE')
//         if (data.value && data.value.status === 'success') {
//           this.resetApiKey()
//         }
//       }
//       return
//     },

//     // Other

//     resetApiKey(): void {
//       this.apiKey = null
//     },

//     updateRefresh(status: { apiKey?: boolean }): void {
//       this.refresh.apiKey = status.apiKey ?? this.refresh.apiKey
//     }
//   }
// })

// export async function initSelectedUserApiKeys(idUser: string): Promise<void> {
//   const currentUserStore = useCurrentUserStore()

//   const apiKeysStore = computed(() => {
//     if (currentUserStore.isAdmin) {
//       return useApiKeysStore()
//     }
//     return null
//   }).value
//   //FIXME: si un utilisateur ne possède pas de clé d'api alors la requete de recherche de clé d'api ce lancera a chaque fois que lon clique sur le profil ce qui est pas bon
//   if (apiKeysStore && !apiKeysStore.getUserApiKeys) {
//     apiKeysStore.updateRefresh({ apiKey: true })
//   }

//   if (
//     apiKeysStore &&
//     apiKeysStore.getUserApiKeys &&
//     apiKeysStore.getUserApiKeys.user._id !== idUser
//   ) {
//     apiKeysStore.resetApiKey()
//     apiKeysStore.updateRefresh({ apiKey: true })
//   }

//   if (apiKeysStore && apiKeysStore.getRefresh.apiKey) {
//     await apiKeysStore.fetchAdminGetSelectedUserApiKeys(idUser)
//     apiKeysStore.updateRefresh({ apiKey: false })
//   }
// }

// export type ApiKeysStore = ReturnType<typeof useApiKeysStore>

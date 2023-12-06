import {
  type loginInterface,
  type signupInterface,
  type confirmResetPasswordInterface,
  type confirmResetEmailInterface,
  type passwordSubmitInterface,
  type nameSubmitInterface,
  type forgotPasswordSubmitInterface,
  type userInterface,
  type jsonResponseInterface,
  type ApiKeyInterface,
  type requestCreateNewApiKeyInterface,
  type KeyInterface
} from '@/shared/interfaces'
import { defineStore } from 'pinia'

import { sendRequest } from '@/shared/utils/sendRequest.utils'
import type { Ref } from 'vue'

interface CurrentUserStateInterface {
  user: userInterface | null
  apiKey: ApiKeyInterface | null
  refresh: {
    user: boolean
    apiKey: boolean
  }
}

export const useCurrentUserStore = defineStore('currentUserStore', {
  state: (): CurrentUserStateInterface => ({
    user: null,
    apiKey: null,
    refresh: {
      user: true,
      apiKey: true
    }
  }),

  getters: {
    getCurrentUser(): userInterface | null {
      if (this.user) {
        return this.user
      }
      return null
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
    getRefresh(): { user: boolean; apiKey: boolean } {
      return this.refresh
    },
    getNumberOfApiKey(): number {
      if (this.apiKey) {
        return this.apiKey.apiKeys.length
      }
      return 0
    }
  },
  actions: {
    // User profile

    async fetchGetUser(): Promise<void> {
      if (this.getRefresh.user) {
        const devUrl = '/playground-connect/v1/users/me'
        const { data } = await sendRequest(devUrl, 'GET')

        if (data.value && data.value.data && data.value.status === 'success') {
          this.user = data.value.data as userInterface
        }
      }

      this.updateRefresh({ user: false })
    },

    async fetchLogout(): Promise<void> {
      const devUrl = '/playground-connect/v1/users/logout'
      await sendRequest(devUrl, 'GET')
    },

    async fetchSignup(values: signupInterface): Promise<void> {
      const devUrl = '/playground-connect/v1/users/signup'
      await sendRequest(devUrl, 'POST', values)
    },

    async fetchLogin(values: loginInterface): Promise<void> {
      const devUrl = '/playground-connect/v1/users/login'
      const { data } = await sendRequest(devUrl, 'POST', values)

      if (data.value && data.value.status === 'success' && data.value.data) {
        this.user = data.value.data
      }
    },

    async fetchActivationAccountForm(values: loginInterface, token: string): Promise<void> {
      const devUrl = `/playground-connect/v1/users/activationAccount/${token}`
      const { data } = await sendRequest(devUrl, 'PATCH', values)
      if (data.value && data.value.status === 'success' && data.value.data) {
        this.user = data.value.data
      }
    },

    async fetchUpdateUser(values: nameSubmitInterface): Promise<void> {
      const devUrl = '/playground-connect/v1/users/updateProfile'
      const { data } = await sendRequest(devUrl, 'PATCH', values)
      if (data.value && data.value.status === 'success' && data.value.data) {
        this.user = data.value.data
      }
    },
    async fetchUpdatePassword(values: passwordSubmitInterface): Promise<void> {
      const devUrl = '/playground-connect/v1/users/updatePassword'
      await sendRequest(devUrl, 'PATCH', values)
    },

    async fetchChangeEmailRequest(): Promise<void> {
      const devUrl = '/playground-connect/v1/users/changeEmail'

      await sendRequest(devUrl, 'POST')
    },

    async fetchResetEmail(values: confirmResetEmailInterface, token: string): Promise<void> {
      const devUrl = `/playground-connect/v1/users/resetEmail/${token}`
      const { data } = await sendRequest(devUrl, 'PATCH', values)
      if (data.value && data.value.status === 'success' && data.value.data) {
        this.user = data.value.data
      }
    },

    async fetchForgotPassword(values: forgotPasswordSubmitInterface): Promise<void> {
      const devUrl = '/playground-connect/v1/users/forgotPassword'
      await sendRequest(devUrl, 'POST', values)
    },

    async fetchResetPassword(values: confirmResetPasswordInterface, token: string): Promise<void> {
      const devUrl = `/playground-connect/v1/users/resetPassword/${token}`
      await sendRequest(devUrl, 'PATCH', values)
    },

    async fetchDeactivationAccount(): Promise<void> {
      const devUrl = '/playground-connect/v1/users/disableAccount'
      await sendRequest(devUrl, 'DELETE')
    },

    async reloadUser(data: Ref<jsonResponseInterface | null>): Promise<void> {
      if (data.value && data.value.status === 'success') {
        this.refresh.user = true
        await initCurrentUserStore()
      }
    },

    // User apiKeys

    async fetchUserGetMyApiKeys(): Promise<void> {
      if (this.getRefresh.apiKey) {
        const devUrl = '/playground-connect/v1/apiKeys/'
        const { data } = await sendRequest(devUrl, 'GET')
        if (data.value && data.value.status === 'success' && data.value.data) {
          this.apiKey = data.value.data
        }
      }

      this.updateRefresh({ apiKey: false })
    },
    async fetchUserRequestCreateNewApiKey(value: requestCreateNewApiKeyInterface): Promise<void> {
      const devUrl = '/playground-connect/v1/apiKeys'
      const { data } = await sendRequest(devUrl, 'POST', value)
      if (data.value && data.value.status === 'success' && data.value.data) {
        this.apiKey = data.value.data
      }
    },

    async fetchUserDeleteSelectedApiKey(idApi: string): Promise<void> {
      const devUrl = `/playground-connect/v1/apiKeys/deleteApiKey/${idApi}`
      const { data } = await sendRequest(devUrl, 'DELETE')
      if (data.value && data.value.status === 'success' && data.value.data) {
        this.apiKey = data.value.data
      }
    },

    async fetchUserRequestRenewalApiKey(idApi: string): Promise<void> {
      const devUrl = `/playground-connect/v1/apiKeys/renewal/${idApi}`
      await sendRequest(devUrl, 'PATCH')
    },

    async fetchUserConfirmRenewalApiKey(values: loginInterface, token: string): Promise<void> {
      const devUrl = `/playground-connect/v1/apiKeys/confirmRenewal/${token}`
      const { data } = await sendRequest(devUrl, 'PATCH', values)
      if (data.value && data.value.status === 'success' && data.value.data) {
        this.apiKey = data.value.data
      }
    },

    // Other

    resetCurrentUserStore(): void {
      this.user = null
      this.apiKey = null
      this.refresh = {
        user: true,
        apiKey: true
      }
    },

    updateRefresh(refresh: { user?: boolean; apiKey?: boolean }): void {
      this.refresh.user = refresh.user ?? this.refresh.user
      this.refresh.apiKey = refresh.apiKey ?? this.refresh.apiKey
    }
  }
})

export async function initCurrentUserStore(): Promise<void> {
  const currentUserStore = useCurrentUserStore()

  await currentUserStore.fetchGetUser()
}

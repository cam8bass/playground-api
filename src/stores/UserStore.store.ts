import {
  type loginInterface,
  type signupInterface,
  type confirmResetPasswordInterface,
  type confirmResetEmailInterface,
  type passwordSubmitInterface,
  type nameSubmitInterface,
  type forgotPasswordSubmitInterface,
  type requestCreateNewApiKeyInterface,
  type apiKeyInterface,
  type userInterface,
  type jsonResponseInterface
} from '@/shared/interfaces'
import { defineStore } from 'pinia'

import { sendRequest } from '@/shared/utils/sendRequest.utils'
import type { Ref } from 'vue'

interface UserStateInterface {
  user: userInterface | null
  refresh: boolean
}

export const useUserStore = defineStore('userStore', {
  state: (): UserStateInterface => ({
    user: null,
    refresh: true
  }),
  getters: {
    getCurrentUser(): userInterface | null {
      if (this.user) {
        return this.user
      }
      return null
    },

    getNumberOfApiKey(): number {
      if (this.user && 'apiKeys' in this.user && this.user.apiKeys) {
        return this.user.apiKeys.length
      }
      return 0
    },

    getUserApiKey(): [apiKeyInterface] | null {
      if (this.user && 'apiKeys' in this.user && this.user.apiKeys) {
        return this.user.apiKeys
      }
      return null
    }
  },
  actions: {
    async fetchGetUser(): Promise<void> {
      const devUrl = '/playground-connect/v1/users/me'
      const { data } = await sendRequest(devUrl, 'GET')

      if (data.value && data.value.data && data.value.status === 'success') {
        this.user = data.value.data as userInterface
      }
    },

    async fetchLogout(): Promise<void> {
      const userStore = useUserStore()

      const devUrl = '/playground-connect/v1/users/logout'
      await sendRequest(devUrl, 'GET')

      userStore.resetUser()
    },

    async fetchSignup(values: signupInterface): Promise<void> {
      const devUrl = '/playground-connect/v1/users/signup'
      await sendRequest(devUrl, 'POST', values)
    },

    async fetchLogin(values: loginInterface): Promise<void> {
      const devUrl = '/playground-connect/v1/users/login'
      const { data } = await sendRequest(devUrl, 'POST', values)

      if (data.value && data.value.status === 'success') {
        this.refresh = true
      }
    },

    async fetchActivationAccountForm(values: loginInterface, token: string): Promise<void> {
      const devUrl = `/playground-connect/v1/users/activationAccount/${token}`
      await sendRequest(devUrl, 'PATCH', values)
    },

    async fetchUpdateUser(values: nameSubmitInterface): Promise<void> {
      const devUrl = '/playground-connect/v1/users/updateProfile'
      const { data } = await sendRequest(devUrl, 'PATCH', values)
      await this.reloadUser(data)
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
      await sendRequest(devUrl, 'PATCH', values)
    },

    async fetchForgotPassword(values: forgotPasswordSubmitInterface): Promise<void> {
      const devUrl = '/playground-connect/v1/users/forgotPassword'
      await sendRequest(devUrl, 'POST', values)
    },

    async fetchResetPassword(values: confirmResetPasswordInterface, token: string): Promise<void> {
      const devUrl = `/playground-connect/v1/users//resetPassword/${token}`
      await sendRequest(devUrl, 'PATCH', values)
    },

    async fetchDeactivationAccount(): Promise<void> {
      const devUrl = '/playground-connect/v1/users/disableAccount'
      await sendRequest(devUrl, 'DELETE')
    },

    resetUser() {
      this.user = null
    },

    async reloadUser(data: Ref<jsonResponseInterface | null>): Promise<void> {
      if (data.value && data.value.status === 'success') {
        this.refresh = true
        await initUserStore()
      }
    },

    // API KEY

    async fetchRequestCreateNewApiKey(value: requestCreateNewApiKeyInterface): Promise<void> {
      const devUrl = '/playground-connect/v1/apiKeys'
      const { data } = await sendRequest(devUrl, 'POST', value)
      await this.reloadUser(data)
    },

    async fetchRenewalApiKey(idApi: string): Promise<void> {
      const devUrl = `/playground-connect/v1/apiKeys/renewal/${idApi}`
      await sendRequest(devUrl, 'PATCH')
    },

    async fetchConfirmRenewalApiKey(values: loginInterface, token: string): Promise<void> {
      const devUrl = `/playground-connect/v1/apiKeys/confirmRenewal/${token}`
      const { data } = await sendRequest(devUrl, 'PATCH', values)
      await this.reloadUser(data)
    },

    async fetchDeleteSelectedApiKey(idApi: string) {
      const devUrl = `/playground-connect/v1/apiKeys/deleteApiKey/${idApi}`
      const { data } = await sendRequest(devUrl, 'DELETE')
      await this.reloadUser(data)
    }
  }
})

export async function initUserStore(): Promise<void> {
  const userStore = useUserStore()

  if (userStore.refresh) {
    await userStore.fetchGetUser()
  }
  userStore.refresh = false
}

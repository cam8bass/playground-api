import {
  type userCompleteInfoInterface,
  type loginInterface,
  type userBasicInfoInterface,
  type signupInterface
} from '@/shared/interfaces'
import { defineStore } from 'pinia'

import { sendRequest } from '@/shared/utils/sendRequest.utils'

interface UserStateInterface {
  user: userBasicInfoInterface | userCompleteInfoInterface | null
  refresh: boolean
}

export const useUserStore = defineStore('userStore', {
  state: (): UserStateInterface => ({
    user: null,
    refresh: false
  }),
  getters: {
    getCurrentUser(): userBasicInfoInterface | userCompleteInfoInterface | null {
      if (this.user) {
        return this.user
      }
      return null
    }
  },
  actions: {
    async fetchisLoggedIn() {
      const devUrl = '/playground-connect/v1/users/isLoggedIn'
      const { data } = await sendRequest(devUrl, 'GET')

      if (data.value && data.value.data && data.value.status === 'success') {
        const userData = data.value.data as userBasicInfoInterface
        this.user = userData
      }
    },

    async fetchLogout() {
      const userStore = useUserStore()

      const devUrl = '/playground-connect/v1/users/logout'
      await sendRequest(devUrl, 'GET')

      userStore.resetUser()
    },

    async fetchSignup(values: signupInterface) {
      const devUrl = '/playground-connect/v1/users/signup'
      await sendRequest(devUrl, 'POST', values)
    },

    async fetchLogin(values: loginInterface) {
      const devUrl = '/playground-connect/v1/users/login'
      const { data } = await sendRequest(devUrl, 'POST', values)

      if (data.value && data.value.status === 'success') {
        this.refresh = true
      }
    },

    async fetchActivationAccountForm(values: loginInterface, token: string) {
      const devUrl = `/playground-connect/v1/users/activationAccount/${token}`
      await sendRequest(devUrl, 'PATCH', values)
    },

    async fetchGetUser() {
      const devUrl = '/playground-connect/v1/users/me'
      const { data } = await sendRequest(devUrl, 'GET')

      if (data.value && data.value.data && data.value.status === 'success') {
        const user = data.value.data as userCompleteInfoInterface
        this.user = user
      }
    },

    async fetchUpdateUser(values: { firstname?: string; lastname?: string }) {
      const devUrl = '/playground-connect/v1/users/updateProfile'
      const { data } = await sendRequest(devUrl, 'PATCH', values)

      if (data.value && data.value.status === 'success' && data.value.data && this.user) {
        this.user.firstname = data.value.data.firstname
          ? data.value.data.firstname
          : this.user.firstname
        this.user.lastname = data.value.data.lastname
          ? data.value.data.lastname
          : this.user.lastname
      }
    },
    async fetchUpdatePassword(values: {
      password: string
      newPassword: string
      newPasswordConfirm: string
    }) {
      const devUrl = '/playground-connect/v1/users/updatePassword'
      const { data } = await sendRequest(devUrl, 'PATCH', values)
      console.log(data.value)
    },
    async fetchChangeEmailRequest() {
      const devUrl = '/playground-connect/v1/users/changeEmail'

      await sendRequest(devUrl, 'POST')
    },
    async fetchResetEmail(values: loginInterface, token: string) {
      const devUrl = `/playground-connect/v1/users/resetEmail/${token}`
      await sendRequest(devUrl, 'PATCH', values)
    },

    async fetchForgotPassword() {},
    async fetchResetPassword() {},

    async fetchDisableAccount() {},

    resetUser() {
      this.user = null
    }
  }
})

export async function initPageProfile() {
  const userStore = useUserStore()
  await userStore.fetchGetUser()
}

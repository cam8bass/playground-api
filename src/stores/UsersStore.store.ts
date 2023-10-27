import { defineStore } from 'pinia'

export const useUsersStore = defineStore('usersStore', {
  state: () => ({}),
  getters: {},
  actions: {
    async fetchGetAllUsers(){},
    async fetchGetUser(){},
    async fetchDeleteUser(){},
    async fetchUpdateUser(){},
    async fetchCreateUser(){}
  }
})

export function initUsersStore(): void {}
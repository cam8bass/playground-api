import type {
  AdminQueryInterface,
  AdminUpdateUserInterface,
  AdminUsersInterface,
  jsonResponseInterface
} from '@/shared/interfaces'
import { formatQueryString, sendRequest } from '@/shared/utils'
import { defineStore } from 'pinia'

import { type Ref } from 'vue'

interface UsersStateInterface {
  users: AdminUsersInterface[] | null
  user: AdminUsersInterface | null
  query: AdminQueryInterface
  page: {
    currentPage: number
    totalPage: number
    limitPerPage: number
  }
  results: number
  refresh: boolean
}

export const useUsersStore = defineStore('UsersStore', {
  state: (): UsersStateInterface => ({
    users: null,
    user: null,
    results: 0,
    refresh: true,
    page: { currentPage: 1, totalPage: 1, limitPerPage: 10 },
    query: {
      search: '',
      limit: 10,
      fields: null,
      sort: null,
      parameters: null
    }
  }),
  getters: {
    getAllUsers(): AdminUsersInterface[] | null {
      if (this.users) {
        const page = this.getCurrentPage
        const limit = this.getLimitPerPage
        const skip = (page - 1) * limit
        return this.users.slice(skip, skip + limit)
      }
      return null
    },

    getQuery(): AdminQueryInterface {
      return this.query
    },

    getResults(): number {
      return this.results
    },

    getRefresh(): boolean {
      return this.refresh
    },

    getUser(): AdminUsersInterface | null {
      if (this.user) {
        return this.user
      }
      return null
    },

    getNumberOfUsers(): number {
      return this.results
    },

    getLimitPerPage(): number {
      return this.page.limitPerPage
    },

    getTotalPages(): number {
      return this.page.totalPage
    },

    getCurrentPage(): number {
      return this.page.currentPage
    },
    // TODO: voir pour vérifier si la requete a deja été envoyé avec les valeurs passé en query, alors on ne reinitialise pas la page et on ne reinitialise pas la requete

    checkIsDefaultQuery(): boolean {
      return (
        this.query.search === '' &&
        this.query.limit === 10 &&
        this.query.fields === null &&
        this.query.sort === null &&
        this.query.parameters === null
      )
    }
  },
  actions: {
    // USERS

    async fetchAdminGetAllUsers(): Promise<void> {
      if (this.query.search) {
        this.resetUsersStore()

        this.refresh = true
      }

      if (!this.users) this.updateRefresh(true)

      if (
        !this.getRefresh ||
        (this.users && this.users.length === this.results) ||
        (this.users && this.users.length >= this.getCurrentPage * this.getLimitPerPage)
      ) {
        return
      }

      if (this.users && this.getCurrentPage > this.getTotalPages) {
        this.updateCurrentPage(this.getTotalPages)
        return
      }

      const devUrl = '/playground-connect/v1/admin/users'

      const queryString = formatQueryString(devUrl, this.getQuery, this.getCurrentPage)

      const { data } = await sendRequest(queryString, 'GET')
      if (data.value && data.value.status === 'success' && data.value.data) {
        const { data: newUsers, results = 0 } = data.value as {
          data: AdminUsersInterface[]
          results: number
          limit: number
        }

        if (this.query.limit) {
          this.updateLimitPerPage(this.query.limit)
        }

        if (results) {
          this.updateResults(results)
          this.updateTotalPage()
        }

        if (!this.users) {
          this.users = newUsers
        } else {
          newUsers.forEach((user) => {
            if (this.users && !this.users.some((oldUser) => oldUser._id === user._id)) {
              this.users.push(user)
            }
          })
        }
      }

      this.updateRefresh(false)
    },

    async fetchAdminGetUser(idUser: string) {
      const devUrl = `/playground-connect/v1/admin/users/${idUser}`
      const { data } = await sendRequest(devUrl, 'GET')

      if (data.value && data.value.status === 'success' && data.value.data) {
        this.user = data.value.data
      }
    },

    async fetchAdminDeleteUser(iduser: string): Promise<void> {
      const devUrl = `/playground-connect/v1/admin/users/${iduser}`
      const { data } = await sendRequest(devUrl, 'DELETE')
      await this.reloadAllUsers(data)
    },

    async fetchAdminUpdateUser(values: AdminUpdateUserInterface, idUser: string) {
      const devUrl = `/playground-connect/v1/admin/users/${idUser}`

      const { data } = await sendRequest(devUrl, 'PATCH', values)
      if (data.value && data.value.status === 'success' && data.value.data) {
        this.user = data.value.data
      }
    },
    async fetchAmdinCreateUser() {},

    async reloadAllUsers(data: Ref<jsonResponseInterface | null>): Promise<void> {
      if (data.value && data.value.status === 'success') {
        this.refresh = true
        await initUsersStore()
      }
    },

    // Other

    resetUsersStore(): void {
      this.users = null
      this.user = null
      this.results = 0
      this.refresh = true
      this.page = { currentPage: 1, totalPage: 1, limitPerPage: 10 }
    },

    resetAllQuery(): void {
      this.query = {
        search: '',
        limit: 10,
        fields: null,
        sort: null,
        parameters: null
      }
    },

    updateTotalPage(): void {
      // Calculer le nombre de pages en s'assurant que c'est au moins 1
      this.page.totalPage = Math.max(Math.ceil(this.results / this.page.limitPerPage), 1)
    },

    updateCurrentPage(page: number): void {
      this.page.currentPage = page < 1 ? 1 : page
    },

    updateRefresh(status: boolean): void {
      this.refresh = status
    },

    updateResults(value: number = 0): void {
      this.results = value
    },

    updateLimitPerPage(value: number = 10): void {
      this.page.limitPerPage = value
    },

    updateQuery(query: Partial<AdminQueryInterface>): void {
      this.query = {
        search: query.search ? query.search : '',
        limit: query.limit ? query.limit : 10,
        fields: query.fields ? query.fields : null,
        sort: query.sort === null ? query.sort : query.sort ? query.sort : null,
        parameters: query.parameters ? query.parameters : null
      }
    }
  }
})

export async function initUsersStore(): Promise<void> {
  const usersStore = useUsersStore()

  if (usersStore.refresh) {
    await usersStore.fetchAdminGetAllUsers()
  }
  usersStore.refresh = false
}

import {
  DEFAULT_PAGE,
  DEFAULT_QUERY,
  type AdminQueryInterface,
  type AdminUpdateUserInterface,
  type AdminUsersInterface,
  type PageInterface,
  type AdminOverviewInterface,
  DEFAULT_USERS_OVERVIEW,
  type jsonResponseInterface
} from '@/shared/interfaces'
import { formatQueryString, initStore, sendRequest } from '@/shared/utils'
import { defineStore } from 'pinia'

export interface UsersStateInterface {
  users: AdminUsersInterface[] | null
  user: AdminUsersInterface | null
  query: AdminQueryInterface
  page: PageInterface
  overview: AdminOverviewInterface
  results: number
  refresh: {
    users: boolean
    user: boolean
  }
}

export const useUsersStore = defineStore('usersStore', {
  state: (): UsersStateInterface => ({
    users: null,
    user: null,
    results: 0,
    refresh: {
      users: true,
      user: true
    },
    page: { ...DEFAULT_PAGE },
    query: {
      ...DEFAULT_QUERY
    },
    overview: {
      users: { ...DEFAULT_USERS_OVERVIEW }
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

    getRefresh(): { users: boolean; user: boolean } {
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

    getOverview(): AdminOverviewInterface {
      return this.overview
    },

    getCurrentPage(): number {
      return this.page.currentPage
    }
  },
  actions: {
    // USERS

    async fetchAdminGetAllUsers(): Promise<void> {
      if (this.query.search) {
        this.resetUsersStore()
        this.updateRefresh({ users: true })
      }

      if (!this.users) this.updateRefresh({ users: true })

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

      const response: jsonResponseInterface = await sendRequest(queryString, 'GET')

      const newUsers: AdminUsersInterface[] = response.data

      if (newUsers && response.status === 'success') {
        if (this.query.limit) {
          this.updateLimitPerPage(this.query.limit)
        }

        if (response.results) {
          this.updateResults(response.results)
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

      this.updateRefresh({ users: false })
    },

    async fetchAdminGetUser(idUser: string) {
      if (idUser) {
        const devUrl = `/playground-connect/v1/admin/users/${idUser}`
        const response = await sendRequest(devUrl, 'GET')

        if (response.data && response.status === 'success') {
          this.user = response.data
        }
      }
      return
    },

    async fetchAdminDeleteUser(iduser: string): Promise<void> {
      if (iduser) {
        const devUrl = `/playground-connect/v1/admin/users/${iduser}`
        const response = await sendRequest(devUrl, 'DELETE')

        if (response.data && response.status === 'success') {
          this.resetAllUsers()
          this.updateRefresh({ users: true })
        }
      }
      return
    },

    async fetchAdminUpdateUser(values: AdminUpdateUserInterface, idUser: string) {
      if (values && idUser) {
        const devUrl = `/playground-connect/v1/admin/users/${idUser}`

        const response = await sendRequest(devUrl, 'PATCH', values)
        if (response.data && response.status === 'success') {
          this.user = response.data
          this.resetAllUsers()
        }
      }
      return
    },

    async fetchAllUsersOverview(): Promise<void> {
      const devUrl = '/playground-connect/v1/admin/getAllUserOverview'

      const response = await sendRequest(devUrl, 'GET')

      if (response.data && response.status === 'success') {
        this.overview.users = response.data
      }
    },

    async fetchAmdinCreateUser() {},

    // Other

    resetUsersStore(): void {
      this.users = null
      this.user = null
      this.results = 0
      this.refresh = {
        users: true,
        user: true
      }
      this.page = { currentPage: 1, totalPage: 1, limitPerPage: 10 }
      this.overview = {
        users: {
          ...DEFAULT_USERS_OVERVIEW
        }
      }
    },

    resetAllUsers(): void {
      this.users = null
    },

    resetSelectedUser(): void {
      this.user = null
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

    updateRefresh(status: { users?: boolean; user?: boolean }): void {
      this.refresh.users = status.users ?? this.refresh.users
      this.refresh.user = status.user ?? this.refresh.user
    },

    updateResults(value: number = 0): void {
      this.results = value
    },

    updateLimitPerPage(value: number = 10): void {
      this.page.limitPerPage = value
    },

    updateQuery(query: Partial<AdminQueryInterface>): void {
      this.query = {
        search: query.search !== undefined ? query.search : this.query.search,
        limit: query.limit !== undefined ? query.limit : this.query.limit,
        fields: query.fields !== undefined ? query.fields : this.query.fields,
        sort: query.sort !== undefined ? query.sort : this.query.sort,
        parameters: query.parameters !== undefined ? query.parameters : this.query.parameters
      }
    }
  }
})

/**
 * Initialize all users in the store.
 */
export async function initAllUsers(): Promise<void> {
  const { usersStore } = initStore('usersStore')

  if (usersStore.getRefresh.users) {
    // Fetch all users if the refresh status is true
    await usersStore.fetchAdminGetAllUsers()
    usersStore.updateRefresh({ users: false })
  }
}

/**
 * Initialize the selected user in the store.
 * @param idUser - The ID of the user to be initialized.
 */
export async function initSelectedUser(idUser: string): Promise<void> {
  const { usersStore } = initStore('usersStore')

  if (usersStore.getUser && usersStore.getUser._id !== idUser) {
    // Reset the selected user if the ID is different
    usersStore.resetSelectedUser()
    usersStore.updateRefresh({ user: true })
  }

  if (usersStore.getRefresh.user) {
    // Fetch the user if the refresh status is true
    await usersStore.fetchAdminGetUser(idUser)
    usersStore.updateRefresh({ user: false })
  }
}

export type UsersStore = ReturnType<typeof useUsersStore>

import type { queryType } from '@/shared/types/types'
import { initStore } from '@/shared/utils'

/**
 * Moves to the next page of the user list
 * @returns {Promise<void>} void
 */
export async function nextPage(): Promise<void> {
  const { usersStore } = initStore('usersStore')

  if (!usersStore) return
  const page = usersStore.getCurrentPage
  const nextPage = page + 1
  usersStore.updateCurrentPage(nextPage)
  usersStore.updateRefresh({ users: true })
  await usersStore.fetchAdminGetAllUsers()
}

/**
 * Moves to the previous page of the user list
 * @returns {void} void
 */
export function previousPage(): void {
  const { usersStore } = initStore('usersStore')

  if (!usersStore) return
  const page = usersStore.getCurrentPage
  usersStore.updateCurrentPage(page - 1)
}

/**
 * Update the query state in the store
 * @param {Object} query - The query state to update
 * @param {queryType} query.input - The input of the query
 * @param {string[]|string|{}|number|null} query.value - The value of the query
 * @returns {void} void
 */
export function updateQuery(query: {
  input: queryType
  value: string[] | string | {} | number | null
}): void {
  const { usersStore } = initStore('usersStore')

  if (!usersStore) return
  usersStore.updateQuery({ [query.input]: query.value })
}

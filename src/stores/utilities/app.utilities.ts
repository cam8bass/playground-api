import router from '@/router/router'
import { initStore } from '@/shared/utils'

/**
 * Logs out the user and resets the state of the application
 * @returns {Promise<void>} Promise(void)
 */
export async function logout(): Promise<void> {
  const { userStore, apiKeysStore, usersStore, appStore } = initStore(
    'userStore',
    'apiKeysStore',
    'usersStore',
    'appStore'
  )

  if (!userStore || !appStore) return
  await userStore.fetchLogout()

  if (userStore.isAdmin) {
    if (!usersStore || !apiKeysStore) return
    usersStore.resetUsersStore()
    apiKeysStore.resetApiKeysStore()
  }

  userStore.resetUserStore()
  appStore.resetModal()
  router.push('/home')
}

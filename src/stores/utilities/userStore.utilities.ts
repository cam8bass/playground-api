import { initStore } from '@/shared/utils'

/**
 * Update the read state of a specific notification
 * @param {string} idNotification - The id of the notification to update
 * @returns {Promise<void>} void
 */
export async function updateReadNotification(idNotification: string): Promise<void> {
  const { userStore } = initStore('userStore')

  if (!userStore) return
  await userStore.fetchUpdateUserNotification(idNotification)
}

/**
 * Delete the selected notification
 * @param {string} idNotification - The id of the notification to delete
 * @returns {Promise<void>} void
 */
export async function deleteSelectedNotification(idNotification: string): Promise<void> {
  const { userStore } = initStore('userStore')

  if (!userStore) return
  await userStore.fetchDeleteSelectedUserNotification(idNotification)
}

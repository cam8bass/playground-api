import { errorMesage } from '@/shared/messages'
import { AppError, initStore } from '@/shared/utils'

/**
 * Update the read state of a specific notification
 * @param {string} idNotification - The id of the notification to update
 * @returns {Promise<void>} void
 */
export async function updateReadNotification(idNotification: string): Promise<void> {
  const { userStore } = initStore('userStore')

  await userStore.fetchUpdateUserNotification(idNotification)
}

/**
 * Delete the selected notification
 * @param {string} idNotification - The id of the notification to delete
 * @returns {Promise<void>} void
 */
export async function deleteSelectedNotification(idNotification: string): Promise<void> {
  const { userStore } = initStore('userStore')

  await userStore.fetchDeleteSelectedUserNotification(idNotification)
}

/**
 * Update the view state of a specific notification
 * @param {string} idNotification - The id of the notification to update
 * @returns {Promise<void>} void
 */
export async function updateViewNotification(idNotification: string): Promise<void> {
  const { userStore } = initStore('userStore')

  if (!userStore || !userStore.isLoggedIn) {
    throw new AppError({ message: errorMesage.ERROR_LOGIN_REQUIRED, categories: 'security' })
  }
  await userStore.fetchUpdateViewUserNotification(idNotification)
}

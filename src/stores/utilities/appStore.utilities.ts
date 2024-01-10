import type { updateModalInterface } from '@/shared/interfaces'
import type { NavigationType, ShowType } from '@/shared/types/types'
import { initStore } from '@/shared/utils'

/**
 * Update the modal state in the store
 * @param {updateModalInterface} modal - The modal state to update
 * @returns {void} void
 */
export function updateModal(modal: updateModalInterface): void {
  const { appStore } = initStore('appStore')
  if (!appStore) return
  appStore.updateModal(modal)
}

/**
 * Update the navigation state in the store
 * @param {NavigationType} navigation - The navigation state to update
 * @returns {void} void
 */
export function updateNavigation(navigation: { type: NavigationType; value?: boolean }): void {
  const { appStore } = initStore('appStore')

  if (!appStore) return

  appStore.updateNavigation({
    [navigation.type]: navigation.value ?? !appStore.getNavigation[navigation.type]
  })
}

/**
 * Reset the modal state in the store
 * @returns {void} void
 */
export function resetModal(): void {
  const { appStore } = initStore('appStore')

  if (!appStore) return
  appStore.resetModal()
}

/**
 * Update the visibility of a specific modal
 * @param {ShowType} show - The modal to update
 * @returns {void} void
 */
export function updateShow(show: ShowType): void {
  const { appStore } = initStore('appStore')

  if (!appStore) return

  appStore.updateShow({ [show]: !appStore.getShow[show] })
}

/**
 * Reset the popup state in the store
 * @returns {void} void
 */
export function resetPopup(): void {
  const { appStore } = initStore('appStore')

  if (!appStore) return
  appStore.updateNavigation({ popup: false })
  appStore.resetNotificationApp()
}
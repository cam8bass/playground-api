import { catchAsync, initStore } from '.'
import config from '../config'
import type { jsonResponseInterface, AppErrorInterface } from '../interfaces'
import type { requestHttpType } from '../types/types'

/**
 * Makes an HTTP request to the specified URL, using the specified method and optional request body.
 * @param url - The URL of the resource to request.
 * @param method - The HTTP method to use for the request (e.g., GET, POST, PUT, etc.).
 * @param body - The request body, if any, to send with the request.
 * @returns A JSON object containing the response data.
 * @throws An AppError object if the request fails.
 */

const fetchJSON = catchAsync(
  async (
    url: string,
    method: requestHttpType,
    body: object | null = null
  ): Promise<jsonResponseInterface> => {
    const ajax = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(config.timeout)
    })

    if (!ajax.ok) {
      const error: AppErrorInterface = await ajax.json()
      throw error
    }

    if (ajax.status === 204) {
      return {
        status: 'no-content'
      }
    }
    const response: jsonResponseInterface = await ajax.json()

    return response
  }
)

/**
 * A function that sends an HTTP request to the specified URL, using the specified method and optional request body.
 * @param url - The URL of the resource to request.
 * @param method - The HTTP method to use for the request (e.g., GET, POST, PUT, etc.).
 * @param body - The request body, if any, to send with the request.
 * @returns {Promise<jsonResponseInterface>} A JSON object containing the response data.
 * @throws An AppError object if the request fails.
 */
export const sendRequest = async (
  url: string,
  method: requestHttpType,
  body: object | null = null
): Promise<jsonResponseInterface> => {
  const { appStore } = initStore('appStore')

  const response = await fetchJSON(url, method, body)

  if (response) {
    if (response.notification) {
      appStore.updateNotificationApp(response.notification)
      appStore.updateNavigation({ popup: true })

      const { userStore } = initStore('userStore')

      if (userStore && userStore.isLoggedIn) {
        userStore.updateRefresh({ notification: true })
        await userStore.fetchUserNotifications()
      }
    }
  }

  return response
}

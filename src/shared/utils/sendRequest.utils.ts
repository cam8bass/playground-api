import { useAppStore, useErrorStore } from '@/stores'
import type { jsonResponseInterface, errorInterface } from '@/shared/interfaces'
import { ref, type Ref } from 'vue'
import type { requestHttpType } from '../types/types'

export async function sendRequest(
  url: string,
  method: requestHttpType,
  body: object | null = null
): Promise<{
  data: Ref<jsonResponseInterface | null>
}> {
  const appStore = useAppStore()
  const errorStore = useErrorStore()
  const data = ref<jsonResponseInterface | null>(null)
  errorStore.resetError()
  try {
    appStore.updateLoading(true)

    const ajax = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : undefined
    })

    const res: jsonResponseInterface = await ajax.json()

    if (!ajax.ok) {
      throw res
    } else {
      data.value = res
      if (data.value.notification) {
        appStore.updateNotification(data.value.notification.type, data.value.notification.message)
        appStore.updatePopup(true)
      }
    }
  } catch (e: any) {
    const errors = e as errorInterface
    errorStore.updateError(errors.statusCode, errors.status, errors.errors, errors.message)
    // TODO: Vérifider si le status de l'erreur est égale a 500, dans ce cas ouvir une modal avec la description de l'erreur et un boutton qui permet de retourner à la page home.
  } finally {
    appStore.updateLoading(false)
  }
  return { data }
}

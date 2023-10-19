import { useErrorStore } from '@/stores'
import type { errorInterface } from '../interfaces'

export const handleErrorProd = (err: errorInterface) => {

  const errorStore = useErrorStore()
  // si c une erreur que je traite
  errorStore.updateError(err.statusCode, err.status, err.errors)

  // TODO: si c une erreur que je ne traite pas  voir ce que je fait
  // errorStore.updateError(500, 'error', { request: errorMesage.ERROR_SERVER_ERRORS })
}

export const handleErrorDev = (err: errorInterface) => {
  const errorStore = useErrorStore()
  // Permet d'enregistrer les erreurs dans le store error
  errorStore.updateError(err.statusCode, err.status, err.errors, err.message)
  // TODO: A voir
  console.error(err.statusCode, err.status, err.message, err.errors)
}

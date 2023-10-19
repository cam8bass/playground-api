import { handleErrorDev, handleErrorProd } from '.'
import type { vueEnvType } from '../types/types'

export default (err: any) => {
  const vueEnv = import.meta.env.MODE as vueEnvType
  err.status = err.status || 'error'
  err.statusCode = err.statusCode || 500

  if (vueEnv === 'development') {
    handleErrorDev(err)
  } else if (vueEnv === 'production') {
    // let error = err
    // Gerer l'ensemble des cas d'erreur
    handleErrorProd(err)
  }
}

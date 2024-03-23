import { AppError, initStore, isAppError } from '@/shared/utils'

export const handleTimeoutError = (): AppError => {
  return new AppError({
    message:
      "La requête a expiré en raison d'un délai d'attente dépassé. Veuillez réessayer ultérieurement.",
    categories: 'server',
    statusCode: 500
  })
}

export const handleAbortError = (): AppError => {
  return new AppError({
    message:
      "La requête a été interrompue par une action de votre part (bouton d'arrêt du navigateur, fermeture de l'onglet, etc.). Veuillez réessayer si nécessaire.",
    categories: 'server',
    statusCode: 500
  })
}

export const handleTypeError = (): AppError => {
  return new AppError({
    message:
      "La fonctionnalité que vous avez demandée prend plus de temps que prévu pour s'exécuter. Veuillez réessayer ultérieurement.",
    categories: 'server',
    statusCode: 500
  })
}

export function handleError(err: any) {
  let error = err

  if (!isAppError(error)) {
    error = new AppError({
      message:
        'Une erreur réseau est survenue, veuillez vérifier votre connexion Internet et réessayer. Si le problème persiste, veuillez contacter le support technique.',
      categories: 'server',
      statusCode: 500
    })
  }

  const { errorStore } = initStore('errorStore')
  errorStore.addErrors(error)
}

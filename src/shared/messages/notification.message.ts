import type { notificationMessageInterface } from '../interfaces'

export const notificationMessage: notificationMessageInterface = {
  NOTIFICATION_ACCESS_DENIED:
    "Vous ne disposez pas des droits d'accès nécessaires pour accéder à cette page.",
  NOTIFICATION_ACCOUNT_INACTIVE:
    "Votre compte n'est pas activé. Veuillez vous connecter à la page de connexion avec vos identifiants pour générer la procédure d'activation du compte.",
  NOTIFICATION_ACCOUNT_LOCKED:
    "Suite à un nombre important de tentatives de connexion erronées, votre compte a été bloqué pendant 1 heure. Si vous n'êtes pas à l'origine de ce blocage, nous vous conseillons de réinitialiser vos identifiants de connexion.",
  NOTIFICATION_ERROR_SERVER:
    'Nous rencontrons actuellement un problème technique qui peut affecter votre navigation sur le site. Nous nous excusons pour la gêne occasionnée et travaillons activement pour résoudre ce problème. Merci de votre patience et de votre compréhension.'
}

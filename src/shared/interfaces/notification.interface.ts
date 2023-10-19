import type { requestStatusType } from '../types/types'

export interface notificationInterface {
  type: requestStatusType | null
  message: string | null
}

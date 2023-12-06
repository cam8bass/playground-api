import type { notificationInterface } from '.'
import type { requestStatusType } from '../types/types'

export interface jsonResponseInterface {
  status: requestStatusType
  notification?: notificationInterface
  data?: any
  results?: number
  limit?: number
}

export interface jsonResponseOptionsInterface {
  notification?: notificationInterface
  data?: any
  results?: number
  limit?: number
}

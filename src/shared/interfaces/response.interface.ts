import type { notificationInterface } from '.'
import type { requestStatusType } from '../types/types'

export interface jsonResponseInterface {
  status: requestStatusType
  token?: string
  notification?: notificationInterface
  data?: any
  results?: number
}

export interface jsonResponseOptionsInterface {
  token?: string
  notification?: notificationInterface
  data?: any
  results?: number
}

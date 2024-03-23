import type { NotificationDetailInterface } from '.'
import type { requestStatusType } from '../types/types'

export interface jsonResponseInterface {
  status: requestStatusType
  notification?: NotificationDetailInterface[]
  data?: any
  results?: number
  limit?: number
}

export interface jsonResponseOptionsInterface {
  status?: requestStatusType
  notification?: NotificationDetailInterface[]
  data?: any
  results?: number
  limit?: number
}

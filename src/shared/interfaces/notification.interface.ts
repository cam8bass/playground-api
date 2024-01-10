import { boolean } from 'zod'
import type { requestStatusType } from '../types/types'

export interface NotificationInterface {
  _id: string
  user: string
  notifications: NotificationDetailInterface[]
}

export interface NotificationDetailInterface {
  type: requestStatusType
  message: string
  read: boolean
  createAt: Date
  readAt: Date
  _id: string
}

export interface NotificationAppInterface {
  _id?: string
  type: requestStatusType
  message: string
}

export interface FilterAppInterface {
  notification: FilterNotificationInterface
}



export interface FilterNotificationInterface {
  all: boolean
  read: boolean
  unread: boolean
}

export const DEFAULT_FILTER_NOTIFICATION: FilterNotificationInterface = {
  all: true,
  read: false,
  unread: false
}

import type { apiNameType } from '../types/types'

export interface apiKeyInterface {
  _id: string
  active: boolean
  apiName: apiNameType
  apiKey: string
  apiKeyExpire: Date
  renewalToken?: string
  renewalTokenExpire?: Date
  createAt: Date
}

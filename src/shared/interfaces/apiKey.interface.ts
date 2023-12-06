import type { apiNameType } from '../types/types'



export interface ApiKeyInterface  {
  user: {
    _id: string
    email: string
  }
  apiKeys: [KeyInterface]
  createAt: Date
  _id: string
}

export interface KeyInterface {
  apiName: apiNameType
  apiKey: string
  apiKeyExpire: Date
  active: boolean
  renewalToken: string
  renewalTokenExpire: Date
  _id: string
  createAt: Date
}

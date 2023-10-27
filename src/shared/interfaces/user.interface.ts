import type { apiKeyInterface } from '.'
import type { userRoleType } from '../types/types'

export interface userInterface {
  _id: string
  firstname: string
  lastname: string
  email: string
  active: boolean
  role: userRoleType
  accountLockedExpire?: Date
  emailChangeAt?: Date
  passwordChangeAt?: Date
  activationAccountAt?: Date
  disableAccountAt?: Date
  createAt?: Date
  apiKeys?: [apiKeyInterface]
}

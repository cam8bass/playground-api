import type { userRoleType } from '../types/types'

export interface userInterface {
  _id: string
  firstname: string
  lastname: string
  email: string
  active: boolean
  role: userRoleType
  accountLocked: boolean
  accountLockedExpire?: Date
  emailChangeAt?: Date
  passwordChangeAt?: Date
  activationAccountAt?: Date
  disableAccountAt?: Date
  createAt?: Date
}

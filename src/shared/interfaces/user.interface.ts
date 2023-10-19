import type { userRoleType } from '../types/types'

export interface userBasicInfoInterface {
  _id: string 
  firstname: string
  lastname: string 
  email: string 
  active: boolean 
  role: userRoleType 
  accountLockedExpire: Date 
}

export interface userCompleteInfoInterface extends userBasicInfoInterface {
  emailChangeAt?: Date | null
  passwordChangeAt?: Date | null
  activationAccountAt?: Date | null
  disableAccountAt?: Date | null
  createAt?: Date | null
  apiKeys?: null
}


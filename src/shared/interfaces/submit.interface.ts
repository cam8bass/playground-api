import type { apiNameType } from '../types/types'

export interface passwordSubmitInterface {
  password: string
  newPassword: string
  passwordConfirm: string
  request?: string
}

export interface nameSubmitInterface {
  firstname?: string
  lastname?: string
  request?: string
}

export interface forgotPasswordSubmitInterface {
  email: string
  request?: string
}

export interface requestCreateNewApiKeyInterface {
  apiName: apiNameType
  request?: string
}

export interface adminSubmitActiveApiKey {
  active: string
  request?: string
}

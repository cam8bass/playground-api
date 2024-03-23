import type { apiNameType } from '../types/types'

export interface passwordSubmitInterface {
  password: string
  newPassword: string
  passwordConfirm: string

}

export interface nameSubmitInterface {
  firstname?: string
  lastname?: string

}

export interface forgotPasswordSubmitInterface {
  email: string

}

export interface requestCreateNewApiKeyInterface {
  apiName: apiNameType

}

export interface adminSubmitActiveApiKey {
  active: string

}

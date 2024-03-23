import type {
  apiNameType,
  errorCategoriesType,
  errorPriorityType,
  errorStatusType,
  userRoleType
} from '../types/types'

export interface AppErrorConfigInterface {
  message: string
  categories: errorCategoriesType
  fields?: FieldsErrorInterface
  statusCode?: number
}

export interface AppErrorContextInterface {
  user: string | null
  url: string | null
}

export interface AppErrorInterface extends Error {
  _id: string
  isOperational: boolean
  createdAt: Date
  statusCode: number | null
  status: errorStatusType
  message: string
  priority: errorPriorityType
  categories: errorCategoriesType
  context: AppErrorContextInterface
  fields: FieldsErrorInterface | null
  stack?: string
  name: string
}



export interface FieldsErrorInterface {
  form?: string
  password?: string
  newPassword?: string
  passwordConfirm?: string
  firstname?: string
  lastname?: string
  email?: string
  newEmail?: string
  apiName?: apiNameType
  role?: userRoleType
  active?: string
  limit?: number
}


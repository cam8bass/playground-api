import type { requestStatusType } from '../types/types'

export interface errorInterface {
  statusCode: number
  status: requestStatusType
  message: string
  errors: object
}

export interface errorDevInterface {
  statusCode: number
  status: requestStatusType
  message: string
  errors: object
}
export interface errorProdInterface {
  statusCode: number
  status: requestStatusType
  errors: object
}

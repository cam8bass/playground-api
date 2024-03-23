import type { userRoleType } from '../types/types'

export interface AdminUpdateUserInterface {
  firstname?: string
  lastname?: string
  email?: string
  role?: userRoleType
  active?: boolean
}

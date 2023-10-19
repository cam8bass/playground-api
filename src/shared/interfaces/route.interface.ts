import type { RouteMeta } from 'vue-router'
import type { userRoleType } from '../types/types'

export interface routeMetaInterface extends RouteMeta{
  title: string
  requiresAuth: boolean
  role?: userRoleType[]
}

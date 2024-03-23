export interface AdminOverviewInterface {
  users: AdminUsersOverviewInterface
}

export interface AdminUsersOverviewInterface {
  totalUsers: number
  totalActiveAccount: number
  totalInactiveAccount: number
  totalDisableAccount: number
  totalAccountLocked: number
}

export const DEFAULT_USERS_OVERVIEW: AdminUsersOverviewInterface = {
  totalUsers: 0,
  totalActiveAccount: 0,
  totalInactiveAccount: 0,
  totalDisableAccount: 0,
  totalAccountLocked: 0
}

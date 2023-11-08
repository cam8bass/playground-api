import type { userInterface } from '.'

export interface AdminUsersInterface extends userInterface {
  emailChangeAt?: Date
  emailResetToken?: string
  emailResetTokenExpire?: Date

  passwordChangeAt?: Date
  passwordResetToken?: string
  passwordResetTokenExpire?: Date

  activationAccountToken?: string
  activationAccountTokenExpire?: Date
  accountLockedExpire?: Date
  activationAccountAt?: Date

  loginFailures: number
}

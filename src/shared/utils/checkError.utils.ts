import type { AppErrorInterface } from '../interfaces'

/**
Determines whether the specified value is an instance of AppError.
@param error - The value to test.
@returns true if the value is an instance of AppError; otherwise, false.
 */
export function isAppError(error: unknown): error is AppErrorInterface {
  return (
    (error as AppErrorInterface).isOperational &&
    (error as AppErrorInterface).isOperational === true &&
    (error as AppErrorInterface).name === 'AppError'
  )
}

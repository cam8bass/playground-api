import { handleAbortError, handleError, handleTimeoutError, handleTypeError } from '.'

export function errorManagement(err: any) {
  let error = err

  if (error.name === 'TimeoutError') error = handleTimeoutError()
  if (error.name === 'AbortError') error = handleAbortError()
  if (error.name === 'TypeError') error = handleTypeError()

  handleError(error)

  return error
}

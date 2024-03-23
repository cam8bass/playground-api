import { errorManagement } from '@/error/errorManagement.error'
import { initStore } from '.'

/**
 * Wraps a function in a try/catch block that adds any uncaught errors to the store.
 * @param fn the function to wrap
 * @returns a wrapped function that returns a promise
 */

// export function catchAsync(fn: Function) {
//   return async (...args: any[]) => {
//     const { appStore } = initStore('appStore')
//     try {
//       appStore.updateLoading(true)
//       return await fn(...args)
//     } catch (err: any) {
//       if (isAppError(err)) {
//         const { errorStore } = initStore('errorStore')
//         errorStore.addErrors(err)
//         return err
//       } else {
//         return new AppError({
//           statusCode: 500,
//           message: errorMesage.ERROR_SERVER,
//           categories: 'server'
//         })
//       }
//     } finally {
//       appStore.updateLoading(false)
//     }
//   }
// }

// export function catchAsync(fn: Function) {
//   return async (...args: any[]) => {
//     const { appStore } = initStore('appStore')
//     try {
//       appStore.updateLoading(true)
//       return await fn(...args)
//     } catch (error: any) {
//       if (!isAppError(error)) {
//         throw error
//       }
//       const { errorStore } = initStore('errorStore')
//       errorStore.addErrors(error)
//       return false
//     } finally {
//       appStore.updateLoading(false)
//     }
//   }
// }

// export function catchAsync(fn: Function) {
//   return async (...args: any[]) => {
//     const { appStore } = initStore('appStore')
//     try {
//       appStore.updateLoading(true)
//       return await fn(...args)
//     } catch (error: any) {
//       if (!isAppError(error)) {
//         throw error
//       }
//       const { errorStore } = initStore('errorStore')
//       errorStore.addErrors(error)
//       return error
//     } finally {
//       appStore.updateLoading(false)
//     }
//   }
// }

// export function catchAsync(fn: Function) {
//   return async (...args: any[]) => {
//     const { appStore } = initStore('appStore')
//     try {
//       appStore.updateLoading(true)
//       return await fn(...args)
//     } catch (err: any) {

//       // if (!isAppError(err)) {
//       //   throw err
//       // }
//       // const { errorStore } = initStore('errorStore')
//       // errorStore.addErrors(err)
//       // return err
//     } finally {
//       appStore.updateLoading(false)
//     }
//   }
// }

export function catchAsync(fn: Function) {
  return async (...args: any[]) => {
    const { appStore } = initStore('appStore')
    try {
      appStore.updateLoading(true)
      return await fn(...args).catch(errorManagement)
    } finally {
      appStore.updateLoading(false)
    }
  }
}

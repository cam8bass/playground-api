import type { errorDevInterface, errorProdInterface } from '@/shared/interfaces'
import type { requestStatusType, vueEnvType } from '@/shared/types/types'
import { defineStore } from 'pinia'
// TODO: voir pour peut etre definir errorProd ou erroDev

interface ErrorStateInterface {
  errorProd: errorProdInterface | null
  errorDev: errorDevInterface | null
}

export const useErrorStore = defineStore('errorStore', {
  state: (): ErrorStateInterface => ({
    errorProd: null,
    errorDev: null
  }),
  getters: {
    getError(): errorDevInterface | errorProdInterface | null {
      const vueEnv = import.meta.env.MODE as vueEnvType

      if (vueEnv === 'production') {
        if (this.errorProd) {
          return this.errorProd
        }
      } else if (vueEnv === 'development') {
        if (this.errorDev) {
          return this.errorDev
        }
      }
      return null
    }

    // getErrorProd(): errorProdInterface | null {
    //   if (this.errorProd) {
    //     return this.errorProd
    //   }
    //   return null
    // },
    // getErrorDev(): errorDevInterface | null {
    //   if (this.errorDev) {
    //     return this.errorDev
    //   }
    //   return null
    // }
  },
  actions: {
    updateError(
      statusCode: number,
      status: requestStatusType,
      errors: object,
      message?: string
    ): void {
      const vueEnv = import.meta.env.MODE as vueEnvType

      if (vueEnv === 'production') {
        this.errorProd = {
          statusCode: statusCode,
          status: status,
          errors: errors
        }
      } else if (vueEnv === 'development' && message) {
        this.errorDev = {
          statusCode: statusCode,
          status: status,
          errors: errors,
          message: message
        }
      }
    },

    resetError(): void {
      const vueEnv = import.meta.env.MODE as vueEnvType

      if (vueEnv === 'production') {
        this.errorProd = null
      } else if (vueEnv === 'development') {
        this.errorDev = null
      }
    }

    // updateErrorDev(
    //   statusCode: number,
    //   status: requestStatusType,
    //   message: string,
    //   errors: object
    // ): void {
    //   this.errorDev = {
    //     statusCode: statusCode,
    //     status: status,
    //     message: message,
    //     errors: errors
    //   }
    // },

    // updateErrorProd(statusCode: number, status: requestStatusType, errors: object): void {
    //   this.errorProd = {
    //     statusCode: statusCode,
    //     status: status,
    //     errors: errors
    //   }
    // },

    // resetErrorProd(): void {
    //   this.errorProd = null
    // },
    // resetErrorDev(): void {
    //   this.errorDev = null
    // }
  }
})

export function initErrorStore(): void {}

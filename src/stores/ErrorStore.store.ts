import { type AppErrorInterface } from '@/shared/interfaces'
import { defineStore } from 'pinia'

interface ErrorStateInterface {
  critical: AppErrorInterface[]
  warning: AppErrorInterface[]
  info: AppErrorInterface[]
  debug: AppErrorInterface[]
}

export const useErrorStore = defineStore('errorStore', {
  state: (): ErrorStateInterface => ({
    critical: [],
    warning: [],
    info: [],
    debug: []
  }),
  getters: {
    getAllCriticalErrors(): AppErrorInterface[] {
      return this.critical
    },
    getAllWarningErrors(): AppErrorInterface[] {
      return this.warning
    },
    getAllInfoErrors(): AppErrorInterface[] {
      return this.info
    },
    getAllDebugErrors(): AppErrorInterface[] {
      return this.debug
    },

    getLastCriticalError(): AppErrorInterface | null {
      return this.getAllCriticalErrors[this.getAllCriticalErrors.length - 1] ?? null
    },

    getLastWarningError(): AppErrorInterface | null {
      return this.getAllWarningErrors[this.getAllWarningErrors.length - 1] ?? null
    },

    getLastInfoError(): AppErrorInterface | null {
      return this.getAllInfoErrors[this.getAllInfoErrors.length - 1] ?? null
    },
    getLastDebugError(): AppErrorInterface | null {
      return this.getAllDebugErrors[this.getAllDebugErrors.length - 1] ?? null
    }
  },
  actions: {
    addErrors(errors: AppErrorInterface): void {
      this[errors.priority].push(errors)
    },

    deleteSelectedError(err: AppErrorInterface): void {
      this[err.priority] = this[err.priority].filter((el) => el._id !== err._id)
    },

    deleteInfoErrorByUrl(url: string): void {
      this.info = this.info.filter((el) => el.context.url !== url)
    },

    resetAllErrors(): void {
      this.critical = []
      this.warning = []
      this.info = []
      this.debug = []
    }
  }
})

export type ErrorStore = ReturnType<typeof useErrorStore>

import { v4 as uuidv4 } from 'uuid'
import type {
  AppErrorInterface,
  AppErrorContextInterface,
  AppErrorConfigInterface
} from '../interfaces'
import type { errorPriorityType, errorCategoriesType, errorStatusType } from '../types/types'
import { initStore } from '../utils'
import { useRoute } from 'vue-router'

export class AppError extends Error implements AppErrorInterface {
  public readonly isOperational = true
  public readonly _id: string
  public readonly createdAt: Date
  public readonly status: errorStatusType

  public statusCode: number | null
  public categories: errorCategoriesType
  public priority: errorPriorityType

  public readonly context: AppErrorContextInterface
  public fields: object | null

  constructor(errorConfig: AppErrorConfigInterface) {
    const { categories, message, fields = null, statusCode = null } = errorConfig

    super(message)
    this.name = 'AppError'

    this._id = uuidv4()
    this.createdAt = new Date()

    this.context = this.setContext()

    this.statusCode = statusCode
    this.status = this.getStatusCodeStatus(statusCode)
    this.categories = categories
    this.priority = this.setPriority()

    this.fields = fields

    // const { errorStore } = initStore('errorStore')
    // errorStore.addErrors(this)
  }

  /**
   * Sets the priority of the error based on the categories.
   */
  private setPriority(): errorPriorityType {
    let priority: errorPriorityType
    switch (this.categories!) {
      case 'external':
      case 'storage':
        priority = 'warning'
        break
      case 'security':
      case 'server':
      case 'unexpected':
        priority = 'critical'
        break
      case 'validation':
        priority = 'info'
        break
      default:
        priority = 'critical'
        break
    }
    return priority
  }

  /**
   * Sets the context of the error.
   * @param req - The request object.
   * @returns The context of the error.
   */
  private setContext(): {
    url: string | null
    user: string | null
  } {
    const { userStore } = initStore('userStore')
    const route = useRoute()

    return {
      url: route ? route.fullPath : null,
      user: userStore && userStore.getCurrentUser ? userStore.getCurrentUser._id : null
    }

  }

  /**
   * Returns the status of the error based on the status code.
   * @param statusCode - The status code of the error.
   * @returns The status of the error.
   */
  private getStatusCodeStatus(statusCode: number | null): errorStatusType {
    if (!statusCode) return 'fail'
    return statusCode.toString().startsWith('4') ? 'fail' : 'error'
  }
}

import { useAppStore, useErrorStore, useUserStore, useApiKeysStore, useUsersStore } from '@/stores'

import { errorMesage } from '../messages'
import { AppError } from './AppError.utils'

interface InitStoreInterface {
  appStore: ReturnType<typeof useAppStore>
  errorStore: ReturnType<typeof useErrorStore>
  userStore: ReturnType<typeof useUserStore>
  apiKeysStore: ReturnType<typeof useApiKeysStore>
  usersStore: ReturnType<typeof useUsersStore>
}

/**
 * Initialize Pinia stores
 * @param {Array<keyof InitStoreInterface>} storeTypes - String of store types to initialize
 * @returns {InitStoreInterface} - Initialized Pina stores - If use destructuring, the return store will be initialized
//  */
export function initStore(...storeTypes: (keyof InitStoreInterface)[]): InitStoreInterface {
  const initializedStores: InitStoreInterface = {} as InitStoreInterface
  return storeTypes.reduce((acc, storeType) => {
    Object.defineProperty(acc, storeType, {
      get: function () {
        if (!initializedStores[storeType]) {
          switch (storeType) {
            case 'appStore':
              initializedStores.appStore = useAppStore()
              break
            case 'errorStore':
              initializedStores.errorStore = useErrorStore()
              break
            case 'userStore':
              initializedStores.userStore = useUserStore()
              break
            case 'apiKeysStore':
              initializedStores.apiKeysStore = useApiKeysStore()

              break
            case 'usersStore':
              initializedStores.usersStore = useUsersStore()

              break
            default:
              throw new AppError({
                message: errorMesage.ERROR_UNKNOWN_STORE,
                categories: 'storage'
              })
          }
        }
        return initializedStores[storeType]
      },
      enumerable: true
    })

    return acc
  }, {} as InitStoreInterface)
}

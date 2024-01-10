export type modalType =
  | 'logout'
  | 'requestChangeEmail'
  | 'deactivation'
  | 'renewalApiKey'
  | 'deleteSelectedApiKey'
  | 'adminDeleteSelectedUser'
  | 'adminDeleteSelectedApiKey'
  | 'adminDeleteAllApiKeysFromUser'
  | 'deleteAllNoticationsUser'

export type signupFieldType = 'firstname' | 'lastname' | 'email' | 'password' | 'passwordConfirm'

export type loginFieldType = 'email' | 'password'

export type requestStatusType = 'success' | 'fail' | 'error'

export type userRoleType = 'user' | 'admin'

export type vueEnvType = 'production' | 'development'

export type requestHttpType = 'GET' | 'POST' | 'PATCH' | 'DELETE'

export type apiNameType = 'Api-travel' | 'Api-test1' | 'Api-test2'

export type filterType = 'role' | 'email' | 'firstname' | 'lastname' | 'active' | 'accountLocked'

export type sortFilterType = 'createAt' | '-createAt'

export type parametersFilterType = 'role' | 'active' | 'accountLocked' | 'accountDisable'

export type queryType = 'search' | 'limit' | 'fields' | 'sort' | 'parameters'


export type StoreType = 'usersStore' | 'apiKeysStore' | 'appStore' | 'errorStore' | 'userStore'

export type ShowType =  'fields'|'limit'|'parameters'|'sort'|'overview'|'notificationMore'


export type NavigationType = 'login' | 'menu' | 'popup' | 'menuFilter' |'notification'


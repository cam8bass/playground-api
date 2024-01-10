export interface NavigationInterface {
  login: boolean
  menu: boolean
  popup: boolean
  menuFilter: boolean
  notification: boolean
}

export const DEFAULT_NAVIGAION: NavigationInterface = {
  login: false,
  menu: false,
  popup: false,
  menuFilter: false,
  notification: false
}

// import type { FiltersInterface } from '.'

// export interface ShowFiltersInterface extends FiltersInterface {
//   overview: boolean
// }

// export const DEFAULT_SHOW: ShowFiltersInterface = {
//   fields: false,
//   limit: false,
//   parameters: false,
//   sort: false,
//   overview: false
// }

export interface ShowInterface {
  fields: boolean
  limit: boolean
  parameters: boolean
  sort: boolean
  overview: boolean
  notificationMore: boolean
}


export const DEFAULT_SHOW: ShowInterface = {
  fields: false,
  limit: false,
  parameters: false,
  sort: false,
  overview: false,
  notificationMore: false
}
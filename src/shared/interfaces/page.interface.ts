export interface PageInterface {
  currentPage: number
  totalPage: number
  limitPerPage: number
}

export const DEFAULT_PAGE: PageInterface = {
  currentPage: 1,
  totalPage: 1,
  limitPerPage: 10
}

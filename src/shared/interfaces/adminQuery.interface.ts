export interface AdminQueryInterface {
  limit: number
  fields: string | null
  sort: string | null
  parameters: {} | null
  search: string
}


export const DEFAULT_QUERY:AdminQueryInterface={
  search: '',
  limit: 10,
  fields: null,
  sort: null,
  parameters: null
}
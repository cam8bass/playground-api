export interface AdminQueryInterface {
  limit: number
  fields: string | null
  sort: string | null
  parameters: {} | null
  search: string
}

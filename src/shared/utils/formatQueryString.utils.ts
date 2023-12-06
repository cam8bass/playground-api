import type { AdminQueryInterface } from '../interfaces'

export function formatQueryString(
  devUrl: string,
  query: AdminQueryInterface,
  page: number
): string {
  const queryParams = new URLSearchParams()
  queryParams.set('page', String(page))
  queryParams.set('limit', String(query.limit))

  if (query.parameters) {
    for (const [key, value] of Object.entries(query.parameters)) {
      queryParams.set(key, String(value))
    }
  }

  if (query.fields) {
    queryParams.set('fields', query.fields)
  }

  if (query.sort) {
    queryParams.set('sort', query.sort)
  }

  if (query.search) {
    queryParams.set('search', query.search)
  }

  return buildUrl(devUrl, queryParams)
}

function buildUrl(url: string, queryParams: URLSearchParams): string {
  const queryString = queryParams.toString()
  return queryString ? `${url}?${queryString}` : url
}

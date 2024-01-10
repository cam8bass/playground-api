import type { AdminQueryInterface } from '../interfaces'

/**
 * Formats the query string for an API request.
 * @param {string} devUrl - The development URL.
 * @param {AdminQueryInterface} query - The query parameters.
 * @param {number} page - The page number.
 * @returns {string} The formatted query string.
 */
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

/**
 * Builds the URL with query parameters.
 * @param {string} url - The base URL.
 * @param {URLSearchParams} queryParams - The query parameters.
 * @returns {string} The built URL.
 */
function buildUrl(url: string, queryParams: URLSearchParams): string {
  const queryString = queryParams.toString()
  return queryString ? `${url}?${queryString}` : url
}

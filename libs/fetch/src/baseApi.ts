import { baseFetch, type BaseFetchOptions } from './baseFetch'
import { urlcat } from './url'

export type ApiOptions = Omit<BaseFetchOptions, 'body'>

export function baseApi(fetcher = baseFetch) {
  return {
    get: (url: string, query?: Record<string, string>, options?: ApiOptions) =>
      fetcher(urlcat(url, '', query), { ...options, method: 'GET' }),

    post: (url: string, body: unknown, options?: ApiOptions) =>
      fetcher(url, { ...options, body, method: 'POST' }),

    put: (url: string, body: unknown, options?: ApiOptions) =>
      fetcher(url, { ...options, body, method: 'PUT' }),

    patch: (url: string, body: unknown, options?: ApiOptions) =>
      fetcher(url, { ...options, body, method: 'PATCH' }),

    delete: (url: string, options?: ApiOptions) =>
      fetcher(url, { ...options, method: 'DELETE' }),
  }
}

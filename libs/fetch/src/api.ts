import { baseApi, type ApiOptions } from './baseApi'
import { baseFetch } from './baseFetch'

export function api(fetcher = baseFetch) {
  const base = baseApi(fetcher)

  return {
    get: async (
      url: string,
      query?: Record<string, string>,
      options?: ApiOptions,
    ) => (await base.get(url, query, options))[0],

    post: async (url: string, body: unknown, options?: ApiOptions) =>
      (await base.post(url, body, options))[0],

    put: async (url: string, body: unknown, options?: ApiOptions) =>
      (await base.put(url, body, options))[0],

    patch: async (url: string, body: unknown, options?: ApiOptions) =>
      (await base.patch(url, body, options))[0],

    delete: async (url: string, options?: ApiOptions) =>
      (await base.delete(url, options))[0],
  }
}

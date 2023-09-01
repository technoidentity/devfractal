import {
  QueryCache,
  QueryClient,
  type QueryClientConfig,
  type QueryFunction,
} from '@tanstack/react-query'

export type CreateQueryClientOptions = QueryClientConfig & {
  isProd: boolean
  onError: (error: unknown) => void
  queryFn: QueryFunction
}

/**
 * Creates a new instance of the React Query client with sensible defaults.
 * @param {QueryClientOptions} [options] - The options to use when creating the client.
 * @returns {QueryClient} - The new instance of the React Query client. Look at the React Query docs for more information.
 *
 * @example
 * import { createQueryClient } from '@srtp/query'
 *
 * const queryClient = createQueryClient({
 *  isProd: process.env.NODE_ENV === 'production',
 * onError: err => console.error(err),
 * queryFn: async ({ queryKey }) => {
 * const [url, init] = queryKey
 * const res = await fetch(url, init)
 * const data = await res.json()
 * return data
 * },
 */
export function createQueryClient({
  isProd,
  onError,
  queryFn,
  ...options
}: CreateQueryClientOptions): QueryClient {
  const queries = {
    refetchOnWindowFocus: isProd,
    retry: isProd ? 3 : 0,
    staleTime: isProd ? 0 : 5 * 60 * 1000,
    useErrorBoundary: true,
    suspense: true,
    ...options.defaultOptions?.queries,
    queryFn,
  }

  return new QueryClient({
    queryCache: new QueryCache({ onError }),
    ...options,
    defaultOptions: {
      ...options.defaultOptions,
      queries: {
        ...queries,
        ...options.defaultOptions?.queries,
      },
      mutations: {
        useErrorBoundary: true,
        ...options.defaultOptions?.mutations,
      },
    },
  })
}

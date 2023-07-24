import {
  QueryCache,
  QueryClient,
  type QueryClientConfig,
  type QueryFunction,
} from '@tanstack/react-query'

export function createQueryClient({
  isProd,
  onError,
  queryFn,
  ...options
}: QueryClientConfig & {
  isProd: boolean
  onError: (error: unknown) => void
  queryFn: QueryFunction
}) {
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

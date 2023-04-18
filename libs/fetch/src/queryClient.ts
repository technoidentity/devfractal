import { QueryClient, type QueryClientConfig } from '@tanstack/react-query'

// @TODO: this should be import.meta.env.DEV?
const isProd = process.env.NODE_ENV === 'production'

type OnError = NonNullable<
  NonNullable<QueryClientConfig['defaultOptions']>['queries']
>['onError']
export function createQueryClient(
  options: QueryClientConfig & {
    onError: OnError
  },
) {
  return new QueryClient({
    ...options,
    defaultOptions: {
      ...options.defaultOptions,
      queries: {
        refetchOnWindowFocus: isProd,
        retry: isProd ? 3 : 0,
        staleTime: isProd ? 0 : 5 * 60 * 1000,
        useErrorBoundary: true,
        suspense: true,
        ...options.defaultOptions?.queries,
        onError: options.onError,
      },
    },
  })
}

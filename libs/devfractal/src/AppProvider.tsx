import { createQueryClient, createQueryFn } from '@srtp/query'
import { ThemeProvider } from '@srtp/ui'
import type { axios } from '@srtp/web'
import type { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { RouterProvider, type RouterProviderProps } from 'react-router-dom'

export type AppProviderProps = Readonly<{
  router?: RouterProviderProps['router']
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ErrorFallback: React.ComponentType<FallbackProps>
  suspenseFallback: React.ReactNode
  queryClient?: QueryClient
  children?: React.ReactNode
  baseUrl?: string
  axios?: typeof axios
  isProd?: boolean
}>

export function AppProvider(props: AppProviderProps) {
  const queryClient =
    props.queryClient ??
    createQueryClient({
      isProd: !!props.isProd,
      queryFn: props.baseUrl ? createQueryFn(props.baseUrl) : undefined,
    })

  return (
    <ThemeProvider>
      <ErrorBoundary FallbackComponent={props.ErrorFallback}>
        <Suspense fallback={props.suspenseFallback}>
          <QueryClientProvider client={queryClient}>
            {props.router && <RouterProvider router={props.router} />}
            {props.children}
          </QueryClientProvider>
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  )
}
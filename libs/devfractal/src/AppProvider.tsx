// @TODO: fix this, use createQueryClient instead
import { queryClient } from '@srtp/router'
import { ThemeProvider } from '@srtp/ui'
import type { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { RouterProvider, type RouterProviderProps } from 'react-router-dom'

export type AppProviderProps = Readonly<{
  router?: RouterProviderProps['router']
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ErrorFallback?: React.ComponentType<FallbackProps>
  suspenseFallback?: React.ReactNode
  queryClient?: QueryClient
  children?: React.ReactNode
}>

const ErrorFallback = (_: FallbackProps) => <div>Error</div>

export function AppProvider(props: AppProviderProps) {
  return (
    <ThemeProvider>
      <ErrorBoundary FallbackComponent={props.ErrorFallback ?? ErrorFallback}>
        <Suspense fallback={props.suspenseFallback ?? <h1>Loading...</h1>}>
          <QueryClientProvider client={queryClient}>
            {props.router && <RouterProvider router={props.router} />}
          </QueryClientProvider>
          {props.children}
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

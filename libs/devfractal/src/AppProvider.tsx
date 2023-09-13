import { QueryProvider, type QueryProviderProps } from '@srtp/query'
import { ReactProvider } from '@srtp/react'
import { ThemeProvider } from '@srtp/ui'
import { type FallbackProps } from 'react-error-boundary'
import { RouterProvider, type RouterProviderProps } from 'react-router-dom'

export type AppProviderProps = QueryProviderProps &
  Readonly<{
    router?: RouterProviderProps['router']
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ErrorFallback: React.ComponentType<FallbackProps>
    suspenseFallback: React.ReactNode
  }>

export function AppProvider({
  router,
  ErrorFallback,
  suspenseFallback,
  children,
  ...props
}: AppProviderProps) {
  return (
    <ThemeProvider>
      <ReactProvider
        ErrorFallback={ErrorFallback}
        suspenseFallback={suspenseFallback}
      >
        <QueryProvider {...props}>
          {router && <RouterProvider router={router} />}
          {children}
        </QueryProvider>
      </ReactProvider>
    </ThemeProvider>
  )
}

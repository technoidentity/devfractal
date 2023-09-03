import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

import { createQueryClient } from './queryClient'

import { queryFn, type ToUrl } from './queryFn'

type QueryProviderProps = Readonly<{
  isProd: boolean
  children: React.ReactNode
  basePathOrToUrl: string | ToUrl
}>

export const QueryProvider = ({
  basePathOrToUrl,
  children,
  isProd,
}: QueryProviderProps) => {
  const queryClient = React.useMemo(
    () =>
      createQueryClient({
        isProd,
        onError: error => {
          console.error(error)
        },
        queryFn: queryFn(basePathOrToUrl),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}

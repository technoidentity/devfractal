import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

import {
  createQueryClient,
  type CreateQueryClientOptions,
} from './createQueryClient'

type QueryProviderProps = CreateQueryClientOptions &
  Readonly<{ children: React.ReactNode }>

export const QueryProvider = ({ children, ...options }: QueryProviderProps) => {
  const queryClient = React.useMemo(
    () => createQueryClient(options),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

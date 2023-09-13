import { axios } from '@srtp/web'
import type { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

import { AxiosProvider } from './AxiosProvider'
import { BaseUrlProvider } from './BaseUrlProvider'
import { createQueryClient } from './createQueryClient'
import { createQueryFn } from './createQueryFn'

export type QueryProviderProps = Readonly<{
  queryClient?: QueryClient
  children?: React.ReactNode
  baseUrl?: string
  axios?: typeof axios
  isProd?: boolean
}>

export function QueryProvider(props: QueryProviderProps) {
  const queryClient = React.useMemo(
    () =>
      props.queryClient ??
      createQueryClient({
        isProd: !!props.isProd,
        queryFn: props.baseUrl ? createQueryFn(props.baseUrl) : undefined,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <AxiosProvider value={{ axios: props.axios ?? axios }}>
      <BaseUrlProvider value={{ baseUrl: props.baseUrl }}>
        <QueryClientProvider client={queryClient}>
          {props.children}
        </QueryClientProvider>
      </BaseUrlProvider>
    </AxiosProvider>
  )
}

import { Button, ChakraProvider, Heading, Spinner } from '@chakra-ui/react'
import { Provider as JotaiProvider } from 'jotai'
import React, { Suspense } from 'react'

import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from '@tanstack/react-query'
import {
  ErrorBoundary,
  ErrorBoundaryPropsWithComponent,
} from 'react-error-boundary'

type ProviderProps = Readonly<{
  children: React.ReactNode
  errorFallbackComponent?: ErrorBoundaryPropsWithComponent['FallbackComponent']
  suspenseFallback?: React.ReactNode
  onReset?: ErrorBoundaryPropsWithComponent['onReset']
}>

const DefaultErrorFallback = ({ error, resetErrorBoundary }: any) => {
  return (
    <Heading color="red">
      {JSON.stringify(error, null, 2)}
      <Button onClick={() => resetErrorBoundary()}>Try again</Button>
    </Heading>
  )
}

const DefaultSuspenseFallback = () => (
  <Spinner
    thickness="4px"
    speed="0.65s"
    emptyColor="gray.200"
    color="blue.500"
    size="xl"
  />
)

const isProd = process.env.NODE_ENV === 'production'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: isProd,
      retry: isProd ? 3 : 0,
      staleTime: isProd ? 0 : 5 * 60 * 1000,
      useErrorBoundary: true,
      suspense: true,
    },
  },
})

export const Provider = ({
  children,
  errorFallbackComponent: ErrorFallbackComponent,
  suspenseFallback,
  onReset,
}: ProviderProps) => {
  const { reset } = useQueryErrorResetBoundary()

  const handleReset = React.useCallback(() => {
    onReset?.()
    reset()
  }, [onReset, reset])

  return (
    <ChakraProvider>
      <ErrorBoundary
        FallbackComponent={ErrorFallbackComponent ?? DefaultErrorFallback}
        onReset={handleReset}
      >
        <Suspense fallback={suspenseFallback ?? <DefaultSuspenseFallback />}>
          <QueryClientProvider client={queryClient}>
            <JotaiProvider>{children}</JotaiProvider>
          </QueryClientProvider>
        </Suspense>
      </ErrorBoundary>
    </ChakraProvider>
  )
}

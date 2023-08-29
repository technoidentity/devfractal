import { Button, ChakraProvider, Heading } from '@chakra-ui/react'
import { jstr } from '@srtp/core'
import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { TodoApp } from './components'

const isProd = import.meta.env['NODE_ENV'] === 'production'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: isProd,
      retry: isProd ? 3 : 0,
      staleTime: isProd ? 0 : 5 * 60 * 1000,
      useErrorBoundary: true,
      suspense: true,
    },
    mutations: {
      useErrorBoundary: true,
    },
  },
})

const Fallback = ({ error, resetErrorBoundary }: any) => {
  return (
    <Heading color="red">
      {jstr(error)}
      <Button onClick={() => resetErrorBoundary()}>Try again</Button>
    </Heading>
  )
}

export const App = () => {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={Fallback}>
      <Suspense fallback={<Heading>Loading...</Heading>}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <TodoApp />
          </ChakraProvider>
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  )
}

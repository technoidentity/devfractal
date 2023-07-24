import { Button, Heading } from '@chakra-ui/react'
import { jstr } from '@srtp/spec'
import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from '@tanstack/react-query'
import { createStore, Provider } from 'jotai'
import { queryClientAtom } from 'jotai-tanstack-query'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { TodoList } from './client/Virtual'

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

export const TodoApp = () => {
  const { reset } = useQueryErrorResetBoundary()

  const storeRef = React.useRef<ReturnType<typeof createStore>>()
  if (!storeRef.current) {
    const store = createStore()
    storeRef.current = store
    store.set(queryClientAtom, queryClient)
  }

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={Fallback}>
      <Suspense fallback={<Heading>Loading...</Heading>}>
        <QueryClientProvider client={queryClient}>
          <Provider store={storeRef.current}>
            <TodoList />
          </Provider>
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  )
}

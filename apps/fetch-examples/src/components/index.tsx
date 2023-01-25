import { Button, Heading } from '@chakra-ui/react'
import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from '@tanstack/react-query'
import { atom, Provider } from 'jotai'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { TodoList } from './client/Virtual'

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

const queryClientAtom = atom(queryClient)

const Fallback = ({ error, resetErrorBoundary }: any) => {
  return (
    <Heading color="red">
      {JSON.stringify(error, null, 2)}
      <Button onClick={() => resetErrorBoundary()}>Try again</Button>
    </Heading>
  )
}

export const TodoApp = () => {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={Fallback}>
      <Suspense fallback={<Heading>Loading...</Heading>}>
        <QueryClientProvider client={queryClient}>
          <Provider initialValues={[[queryClientAtom, queryClient]]}>
            <TodoList />
          </Provider>
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  )
}

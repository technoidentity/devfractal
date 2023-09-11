import { Button, ChakraProvider, Heading } from '@chakra-ui/react'
import { jstr } from '@srtp/core'
import {
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { TodoApp } from './components'
import { queryClient } from '@/queryClient'

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

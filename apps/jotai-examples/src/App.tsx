import { TodoApp } from './examples'
import { DerivedSignal } from './examples/4.DerivedSignal'
import { Provider } from 'jotai'
import {
  Alert,
  AlertIcon,
  ChakraProvider,
  Spinner,
  Stack,
} from '@chakra-ui/react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { Suspense } from 'react'

const ErrorFallback = ({ error }: FallbackProps) => (
  <Stack spacing={3}>
    <Alert status="error">
      <AlertIcon />
      {error.message ?? 'Fatal Error'}
    </Alert>
  </Stack>
)

const SuspenseFallback = () => (
  <Spinner
    thickness="4px"
    speed="0.65s"
    emptyColor="gray.200"
    color="blue.500"
    size="xl"
  />
)

export const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Suspense fallback={<SuspenseFallback />}>
      <ChakraProvider>
        <Provider>
          <DerivedSignal />
          <TodoApp />
        </Provider>
      </ChakraProvider>
    </Suspense>
  </ErrorBoundary>
)

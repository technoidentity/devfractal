import {
  Alert,
  AlertIcon,
  ButtonGroup,
  ChakraProvider,
  Spinner,
  Stack,
} from '@chakra-ui/react'
import { Provider } from 'jotai'
import { Suspense } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { TodoApp } from './examples'
import { DerivedSignal } from './examples/4.DerivedSignal'
import { Wizard } from './examples/9.Wizard'

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

const Page1 = () => (
  <div>
    <h1>Page 1</h1>
  </div>
)

const Page2 = () => (
  <div>
    <h1>Page 2</h1>
  </div>
)
const Page3 = () => (
  <div>
    <h1>Page 3</h1>
  </div>
)

const Page4 = () => (
  <div>
    <h1>Page 4</h1>
  </div>
)

export const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Suspense fallback={<SuspenseFallback />}>
      <ChakraProvider>
        <Provider>
          <Wizard>
            <Wizard.Pages>
              <Page1 />
              <Page2 />
              <Page3 />
              <Page4 />
            </Wizard.Pages>
            <ButtonGroup>
              <Wizard.ButtonPrev />
              <Wizard.ButtonNext />
            </ButtonGroup>
          </Wizard>
          <DerivedSignal />
          <TodoApp />
        </Provider>
      </ChakraProvider>
    </Suspense>
  </ErrorBoundary>
)

import { Box, Button, ButtonGroup, Flex, Spinner, Text } from '@chakra-ui/react'
import type { Atom } from 'jotai'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const simpleFetch = async (url: string) => {
  await delay(1000 + 1000 * Math.random())

  const response = await fetch(url)
  const json = await response.json()

  if (!response.ok) {
    throw new Error('Fetch Error.')
  }

  return json
}

const createFetchAtom = (urlAtom: Atom<string>) => {
  const fetchAtom = atom(async get => {
    const url = get(urlAtom)
    return simpleFetch(url)
  })

  return fetchAtom
}

export function useAsync<T>(fn: () => Promise<T>) {
  const signal = React.useMemo(() => atom(fn), [fn])
  return useAtomValue(signal)
}

const todoIdAtom = atom(1)
const urlAtom = atom(
  get => `https://jsonplaceholder.typicode.com/todos/${get(todoIdAtom)}`,
)

const todoAtom = createFetchAtom(urlAtom)

const useToggle = (init = false) => {
  const [state, dispatch] = React.useReducer(state => !state, init)

  return [state, dispatch] as const
}

export function Fetch() {
  const setTodoId = useSetAtom(todoIdAtom)
  const todo = useAtomValue(todoAtom)

  return (
    <Box mb="4">
      <pre>{JSON.stringify(todo, null, 2)}</pre>

      <ButtonGroup>
        <Button
          onClick={() => {
            setTodoId(todoId => todoId + 1)
          }}
        >
          Previous
        </Button>

        <Button
          onClick={() => {
            setTodoId(todoId => todoId + 1)
          }}
        >
          Next
        </Button>
      </ButtonGroup>
    </Box>
  )
}

const ErrorFallback = ({ error }: { error: Error }) => (
  <Text textColor="red.600" fontSize="3xl" fontFamily="sans-serif">
    {error.message}
  </Text>
)

export const App = () => {
  const [value, toggle] = useToggle(true)

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Flex direction="column" mt="4">
        <Suspense fallback={<Spinner size="xl" m="4" />}>
          {value && <Fetch />}
        </Suspense>
        <Button onClick={toggle}>{value ? 'Hide' : 'Show'}</Button>
      </Flex>
    </ErrorBoundary>
  )
}

import { Box, Button } from '@chakra-ui/react'

import type { Atom } from 'jotai'
import { atom } from 'jotai'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorMessage, Loading } from './common'
import { useToggle } from './hooks'
import { get as fetch } from './utils'
import { useValue, useAction } from '@srtp/global-state'

const createFetchAtom = (urlAtom: Atom<string>) => {
  const fetchAtom = atom(async get => {
    const url = get(urlAtom)
    return fetch(url)
  })

  return fetchAtom
}

const todoIdAtom = atom(1)
const urlAtom = atom(
  get => `https://jsonplaceholder.typicode.com/todos/${get(todoIdAtom)}`,
)

const todoAtom = createFetchAtom(urlAtom)

export function Fetch() {
  const setTodoId = useAction(todoIdAtom)
  const todo = useValue(todoAtom)

  return (
    <div>
      <pre>{JSON.stringify(todo, null, 2)}</pre>

      <Box mt="2">
        <Button
          mr="2"
          onClick={() => {
            setTodoId(todoId => todoId + 1)
          }}
        >
          Previous
        </Button>

        <Button
          mr="2"
          onClick={() => {
            setTodoId(todoId => todoId + 1)
          }}
        >
          Next
        </Button>
      </Box>
    </div>
  )
}

export const App = () => {
  const [value, toggle] = useToggle(true)

  return (
    <ErrorBoundary FallbackComponent={ErrorMessage}>
      <Box flexDir="column" alignItems="flex-start" gap="2">
        <Suspense fallback={<Loading />}>{value && <Fetch />}</Suspense>
        <Button mt="2" onClick={toggle}>
          {value ? 'Hide' : 'Show'}
        </Button>
      </Box>
    </ErrorBoundary>
  )
}

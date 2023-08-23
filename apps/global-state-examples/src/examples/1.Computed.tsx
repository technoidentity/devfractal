import { Box, Button } from '@chakra-ui/react'

import { useAction, useToggle, useValue } from '@srtp/react'
import type { Atom } from 'jotai'
import { atom } from 'jotai'

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
  const [value, { toggle }] = useToggle(true)

  return (
    <Box flexDir="column" alignItems="flex-start" gap="2">
      <Button mt="2" onClick={toggle}>
        {value ? 'Hide' : 'Show'}
      </Button>
    </Box>
  )
}

import { Box, Button, Checkbox } from '@chakra-ui/react'
import { ErrorMessage, Fetching, Loading } from './common'
import { useCount, useToggle } from './hooks'
import { Todo } from './types'
import { useFetch } from './useFetch'
import { cast } from '@srtp/core'

const todosUrl = 'https://jsonplaceholder.typicode.com/todos'

type TodoViewProps = Readonly<{ todo: Todo }>

export const TodoView = ({ todo }: TodoViewProps) => {
  return (
    <Box mb="2" alignItems="baseline" gap="2">
      <Checkbox isChecked={todo.completed}>{todo.title}</Checkbox>
    </Box>
  )
}

export function Fetch() {
  const [count, dispatch] = useCount(1)
  const { isFetching, data, error } = useFetch(`${todosUrl}/${count}`)

  if (error) {
    return <ErrorMessage error={error as Error} />
  }

  if (data) {
    const todo = cast(Todo, data)

    return (
      <>
        <Box>
          <TodoView todo={todo} />
          {isFetching ? <Fetching /> : <div />}
        </Box>

        <Box>
          <Button
            mr={2}
            disabled={isFetching || count === 1}
            onClick={() => {
              dispatch('dec')
            }}
          >
            Previous
          </Button>

          <Button
            mr={2}
            disabled={isFetching}
            onClick={() => {
              dispatch('inc')
            }}
          >
            Next
          </Button>
        </Box>
      </>
    )
  }

  return <Loading />
}

export const FetchApp = () => {
  const [value, toggle] = useToggle(true)

  return (
    <Box flexDir="column" alignItems="flex-start" gap="2">
      {value && <Fetch />}
      <Button onClick={toggle}>{value ? 'Hide' : 'Show'}</Button>
    </Box>
  )
}

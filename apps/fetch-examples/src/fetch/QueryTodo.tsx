import { ErrorMessage, Loading } from './common'

import { Box, Button, Checkbox, Heading, Input } from '@chakra-ui/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { KeyboardEvent } from 'react'
import type { Todo } from './types'
import { TodoList } from './types'
import { get, patch, post } from './utils'
import { useInputState } from '@srtp/local-state'
import { cast } from '@srtp/spec'

type TodoItemProps = Readonly<{
  todo: Todo
  onToggle: (todo: Todo) => void
}>

const TodoItem = ({ todo, onToggle }: TodoItemProps) => {
  return (
    <Box mb="2" alignItems="baseline" gap="2">
      <Checkbox
        isChecked={todo.completed}
        onChange={() => {
          onToggle(todo)
        }}
      >
        {todo.title}
      </Checkbox>
    </Box>
  )
}

export type AddTodoProps = Readonly<{
  onAdd: (title: string) => void
}>

const AddTodo = ({ onAdd }: AddTodoProps) => {
  const [title, setTitle] = useInputState('')

  const submit = () => {
    if (title.trim() !== '') {
      onAdd(title)
      setTitle('')
    }
  }

  const keyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      submit()
    }
  }

  return (
    <Box m="2" alignItems="baseline" gap="2">
      <Input
        type="text"
        value={title}
        placeholder="Enter todo title..."
        onKeyDown={keyDown}
        onChange={setTitle}
      />

      <Button onClick={submit}>Add</Button>
    </Box>
  )
}

const todoUrl = '/api/todos'
const todoIdUrl = (id: number) => `${todoUrl}/${id}`

export const QueryTodoApp = () => {
  const { data, error, refetch } = useQuery({
    queryKey: [todoUrl],
    queryFn: () => get(todoUrl),
  })

  const toggleTodo = useMutation({
    mutationFn: (todo: Todo) =>
      patch(todoIdUrl(todo.id), { id: todo.id, completed: !todo.completed }),
    onSettled: () => refetch(),
  })

  const addTodo = useMutation({
    mutationFn: (title: string) => post(todoUrl, { title, completed: false }),
    onSettled: () => refetch(),
  })

  if (error) {
    return <ErrorMessage error={error as Error} />
  }

  if (data) {
    const todosList = cast(TodoList, data)

    return (
      <>
        <Heading as="h2" m="2" fontSize="2xl" fontWeight="semibold">
          Todos List
        </Heading>

        <AddTodo onAdd={addTodo.mutate} />

        <div>
          {todosList.map(todo => (
            <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo.mutate} />
          ))}
        </div>
      </>
    )
  }

  return <Loading />
}

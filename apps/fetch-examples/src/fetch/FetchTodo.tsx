import { Box, Button, Checkbox, Heading, Input } from '@chakra-ui/react'
import { cast } from '@srtp/spec'

import type { KeyboardEvent } from 'react'
import { ErrorMessage, Loading } from './common'
import type { Todo } from './types'
import { TodoList } from './types'
import { useFetch } from './useFetch'
import { useMutation } from './useMutation'
import { useInputState } from '@srtp/local-state'

const todoUrl = '/api/todos'
const todoIdUrl = (id: number) => `${todoUrl}/${id}`

type TodoItemProps = Readonly<{
  todo: Todo
  onToggle: (id: number) => void
}>

const TodoItem = ({ todo, onToggle }: TodoItemProps) => {
  return (
    <Box mb="2" alignItems="baseline" gap="2">
      <Checkbox
        isChecked={todo.completed}
        onChange={() => {
          onToggle(todo.id)
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

export const TodoApp = () => {
  const { data, error, refetch } = useFetch(todoUrl)
  const [toggleTodo] = useMutation('PATCH')
  const [addTodo] = useMutation('POST')

  const handleAdd = (title: string) => {
    addTodo(todoUrl, { title, completed: false })
      .then(refetch)
      .catch(console.error)
  }

  const handleToggle = (id: number) => {
    toggleTodo(todoIdUrl(id), { completed: true })
      .then(refetch)
      .catch(console.error)
  }

  if (error) {
    return <ErrorMessage error={error} />
  }

  if (data) {
    const todosList = cast(TodoList, data)

    return (
      <>
        <Heading as="h2" m="2" fontSize="2xl" fontWeight="semibold">
          Todos List
        </Heading>

        <AddTodo onAdd={handleAdd} />

        <div>
          {todosList.map(todo => (
            <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
          ))}
        </div>
      </>
    )
  }

  return <Loading />
}

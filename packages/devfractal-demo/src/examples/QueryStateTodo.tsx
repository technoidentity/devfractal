/* eslint-disable @typescript-eslint/no-misused-promises */
import { CloseIcon } from '@chakra-ui/icons'
import {
  Button,
  Checkbox,
  Container,
  Flex,
  Heading,
  Input,
} from '@chakra-ui/react'
import { queryState } from '@srtp/query'
import { useInputState } from '@srtp/react'
import { cast } from '@srtp/spec'
import type { KeyboardEvent } from 'react'

import { http } from '@srtp/web'
import { z } from 'zod'
import { Todo } from './todoEndpoints'

const TodoList = z.array(Todo)

type TodoItemProps = Readonly<{
  todo: Todo
  onToggle: (todo: Todo) => void
  onDelete: (todoId: number) => void
}>

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <Flex placeItems="baseline" mb="2" alignItems="baseline" gap="4">
      <Checkbox isChecked={todo.completed} onChange={() => onToggle(todo)}>
        {todo.title}
      </Checkbox>

      <Button size="xs" onClick={() => onDelete(todo.id)}>
        <CloseIcon color="red.500" />
      </Button>
    </Flex>
  )
}

export type AddTodoProps = Readonly<{ onAdd: (title: string) => void }>

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
    <Flex direction="row" m="2" alignItems="baseline" gap="2">
      <Input
        type="text"
        value={title}
        placeholder="Enter todo title..."
        onKeyDown={keyDown}
        onChange={setTitle}
      />

      <Button onClick={submit}>Add</Button>
    </Flex>
  )
}

const baseUrl = '/api'

const api = http

const [useTodoQuery, actions] = queryState(
  ['todos'],
  { queryFn: () => api.get(`${baseUrl}/todos`) },
  {
    toggleTodo: (todo: Todo) => {
      return api.patch(`${baseUrl}/todos/${todo.id}`, {
        ...todo,
        completed: !todo.completed,
      })
    },

    addTodo: (title: string) => {
      return api.post(`${baseUrl}/todos`, { title, completed: false })
    },

    deleteTodo: (id: number) => {
      return api.delete(`${baseUrl}/todos/${id}`)
    },
  },
)

export const QueryTodoApp = () => {
  const { data } = useTodoQuery({ params: {} })

  const [toggleTodo] = actions.useToggleTodo()
  const [addTodo] = actions.useAddTodo()
  const [deleteTodo] = actions.useDeleteTodo()

  const todosList = cast(TodoList, data)

  console.count()

  return (
    <Container>
      <Heading
        as="h2"
        m="2"
        fontSize="2xl"
        fontWeight="semibold"
        textAlign="center"
      >
        Todos List
      </Heading>

      <AddTodo onAdd={addTodo} />

      <div>
        {todosList.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </Container>
  )
}

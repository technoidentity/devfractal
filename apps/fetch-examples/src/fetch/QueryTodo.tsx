import { CloseIcon } from '@chakra-ui/icons'
import {
  Button,
  Checkbox,
  Container,
  Flex,
  Heading,
  Input,
} from '@chakra-ui/react'
import { useInputState } from '@srtp/react'
import { cast } from '@srtp/spec'
import type { KeyboardEvent } from 'react'
import { epMutation, epQuery } from '@srtp/query'
import { todoEndpoints } from './todoEndpoints'
import type { Todo } from './types'
import { TodoList } from './types'

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

const useTodoQuery = epQuery(todoEndpoints.getTodos, baseUrl)
const useToggleTodo = epMutation(todoEndpoints.updateTodo, baseUrl)
const useAddTodo = epMutation(todoEndpoints.addTodo, baseUrl)
const useDeleteTodo = epMutation(todoEndpoints.removeTodo, baseUrl)

export const QueryTodoApp = () => {
  const { data, invalidateKey } = useTodoQuery({})

  const toggleTodo = useToggleTodo({
    action: (todo: Todo) => ({
      params: { id: todo.id },
      request: { ...todo, completed: !todo.completed },
      invalidateKey,
    }),
  })

  const addTodo = useAddTodo({
    action: (title: string) => ({
      request: { title, completed: false },
      invalidateKey,
    }),
  })

  const deleteTodo = useDeleteTodo({
    action: (id: number) => ({
      params: { id },
      request: undefined,
      invalidateKey,
    }),
  })

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

      <AddTodo onAdd={addTodo.mutate} />

      <div>
        {todosList.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo.mutate}
            onDelete={deleteTodo.mutate}
          />
        ))}
      </div>
    </Container>
  )
}

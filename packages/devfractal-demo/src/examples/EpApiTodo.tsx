import { CloseIcon } from '@chakra-ui/icons'
import {
  Button,
  Checkbox,
  Container,
  Flex,
  Heading,
  Input,
} from '@chakra-ui/react'
import { createEpApi } from '@srtp/query'
import { useInputState } from '@srtp/react'
import type { KeyboardEvent } from 'react'
import type { Todo } from './todoEndpoints'
import { todoEndpoints } from './todoEndpoints'

type TodoItemProps = Readonly<{
  todo: Todo
  onToggle: (todo: Todo) => void
  onRemove: (todoId: number) => void
}>

const TodoItem = ({ todo, onToggle, onRemove }: TodoItemProps) => {
  return (
    <Flex placeItems="baseline" mb="2" alignItems="baseline" gap="4">
      <Checkbox isChecked={todo.completed} onChange={() => onToggle(todo)}>
        {todo.title}
      </Checkbox>

      <Button size="xs" onClick={() => onRemove(todo.id)}>
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

const todos = createEpApi(todoEndpoints, '/api')

export const QueryTodoApp = () => {
  const [todoList] = todos.useGetTodos({
    request: { limit: 10, page: 1 },
  })

  const toggleTodo = todos.useUpdateTodo({})
  const addTodo = todos.useAddTodo({})
  const removeTodo = todos.useRemoveTodo({})

  function onToggle(todo: Todo) {
    toggleTodo.mutate({
      params: { id: todo.id },
      request: { ...todo, completed: !todo.completed },
    })
  }

  function onRemove(id: number) {
    removeTodo.mutate({ params: { id }, request: undefined })
  }

  function onAdd(title: string) {
    addTodo.mutate({ request: { title, completed: false } })
  }

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

      <AddTodo onAdd={onAdd} />

      <div>
        {todoList.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        ))}
      </div>
    </Container>
  )
}

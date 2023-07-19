import { Box, Button, Checkbox, Heading, Input } from '@chakra-ui/react'
import { createEpApi } from '@srtp/fetch'
import { useInputState } from '@srtp/react'
import type { KeyboardEvent } from 'react'
import { todoEndpoints } from './todoEndpoints'
import { TodoList, type Todo } from './types'

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

// const todoUrl = '/api/todos'
// const todoIdUrl = (id: number) => `${todoUrl}/${id}`

const api = createEpApi(todoEndpoints, '/api')

// const m = api.useAddTodo({ mutation: { title: 'foo', completed: false } })
// api.useUpdateTodo({
//   path: { id: 1 },
//   body: { id: 1, title: 'hello', completed: false },
// })

// api.useDeleteTodo({ path: { id: 1 } })

export const EndpointTodoApp = () => {
  const { data, invalidateKey } = api.useGetTodos({})

  const toggleTodo = api.useUpdateTodo({
    action: (todo: Todo) => ({
      params: { id: todo.id },
      request: { ...todo, completed: !todo.completed },
      invalidateKey,
    }),
  })

  const addTodo = api.useAddTodo({
    action: (title: string) => ({ request: { title, completed: false } }),
  })

  const todoList = TodoList.parse(data)

  return (
    <>
      <Heading as="h2" m="2" fontSize="2xl" fontWeight="semibold">
        Todos List
      </Heading>

      <AddTodo onAdd={addTodo.mutate} />

      <div>
        {todoList.map(todo => (
          <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo.mutate} />
        ))}
      </div>
    </>
  )
}

// const api = restQueries(Todo.shape, { name: 'api/todos', query: z.object({}) })

// const foo = api.mutations.useCreate({
//   body: { title: 'foo', completed: false },
// })
// const bar = api.mutations.useRemove({ path: { id: 1 } })
// const fizz = api.mutations.useUpdate({
//   path: { id: 1 },
//   body: { id: 1, title: 'foo', completed: false },
// })
// const buzz = api.queries.useGetAll({ query: {} })

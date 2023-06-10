import {
  Button,
  ChakraProvider,
  Checkbox,
  Flex,
  Heading,
  Input,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react'
import { useEvent, useInputState, useString } from '@srtp/local-state'
import type { QueryClient } from '@tanstack/react-query'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { KeyboardEvent } from 'react'
import './index.css'
import invariant from 'tiny-invariant'
import { map, pipe, toArray } from '@srtp/fn'

type Todo = Readonly<{
  id: number
  title: string
  done: boolean
}>

const todoList: readonly Todo[] = [
  { id: 1, title: 'Learn React', done: false },
  { id: 2, title: 'Learn Chakra UI', done: false },

  { id: 3, title: 'Learn React Query', done: false },
  { id: 4, title: 'Learn React Router', done: false },
]

const todoMap = new Map(todoList.map(todo => [todo.id, todo]))
let id = 5

type IDType = { id: any }
type Create<T extends IDType> = Omit<T, 'id'>
type Update<T extends IDType> = Pick<T, 'id'> & Partial<Omit<T, 'id'>>
type Delete<T extends IDType> = Pick<T, 'id'>

const todoApi = {
  getAll() {
    return Promise.resolve(todoMap.values())
  },

  post(todo: Create<Todo>): Promise<Todo> {
    const t = { ...todo, id: id++ }
    todoMap.set(id, t)
    return Promise.resolve(t)
  },

  put(todo: Todo): Promise<Todo> {
    todoMap.set(todo.id, todo)
    return Promise.resolve(todo)
  },

  patch(todo: Update<Todo>): Promise<Todo> {
    const t = todoMap.get(todo.id)
    if (t) {
      todoMap.set(todo.id, { ...t, ...todo })
    }
    return Promise.resolve(t!)
  },

  delete(todo: Delete<Todo>): Promise<void> {
    todoMap.delete(todo.id)
    return Promise.resolve()
  },
}

type TodoItemProps = Readonly<{
  todo: Todo
  toggle?(id: Todo['id']): void
}>

const TodoItem = ({ todo, toggle }: TodoItemProps) => {
  return (
    <ListItem display="flex" gap="2">
      <Checkbox checked={todo.done} onChange={() => toggle?.(todo.id)} />
      <Text>{todo.title}</Text>
    </ListItem>
  )
}

function useTodoList() {
  const result = useQuery({
    queryKey: ['todos'],
    queryFn: () => todoApi.getAll(),
  })

  // @TODO: data should be defined always
  return result
}

let dummyID = -1
function useAddTodo(queryClient: QueryClient) {
  const mutation = useMutation({
    mutationFn: (title: string) => todoApi.post({ title, done: false }),
    onMutate: async (title: string) => {
      await queryClient.cancelQueries(['todos'])
      const previousTodos = queryClient.getQueryData(['todos'])
      queryClient.setQueryData(['todos'], old => [
        ...(old as Todo[]),
        { id: dummyID--, title, done: false },
      ])
      return { previousTodos }
    },
    onError: (err, _, context) => {
      console.error(err)

      queryClient.setQueryData(['todos'], context?.previousTodos)
    },
    // on sucess replace previous dummy todo with actual todo
    onSuccess: (todo, _) => {
      queryClient.setQueryData(['todos'], old =>
        (old as Todo[]).map(t => (t.id === todo.id ? todo : t)),
      )
    },

    onSettled: async () => {
      await queryClient.invalidateQueries(['todos'])
    },
  })

  return [mutation.mutate, mutation] as const
}

function useToggle(queryClient: QueryClient) {
  const mutation = useMutation({
    mutationFn: (id: number) => todoApi.patch({ id, done: true }),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries(['todos'])
      const previousTodos = queryClient.getQueryData(['todos'])
      queryClient.setQueryData(['todos'], old =>
        (old as Todo[]).map(todo =>
          todo.id === id ? { ...todo, done: true } : todo,
        ),
      )
      return { previousTodos }
    },
    onError: (err, _, context) => {
      console.error(err)

      queryClient.setQueryData(['todos'], context?.previousTodos)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(['todos'])
    },
  })

  return [mutation.mutate, mutation] as const
}

export function useDelete(queryClient: QueryClient, id: number) {
  const mutation = useMutation({
    mutationFn: () => todoApi.delete({ id }),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries(['todos'])
      const previousTodos = queryClient.getQueryData(['todos'])
      queryClient.setQueryData(['todos'], old =>
        (old as Todo[]).filter(todo => todo.id !== id),
      )
      return { previousTodos }
    },
    onError: (err, _, context) => {
      console.error(err)

      queryClient.setQueryData(['todos'], context?.previousTodos)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(['todos'])
    },
  })

  return [mutation.mutate, mutation]
}

type AddTodoProps = { onAddTodo(title: string): void }

const AddTodo = ({ onAddTodo }: AddTodoProps) => {
  const [text, setText] = useInputState('')

  const keyDown = useEvent((evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter' && text.trim() !== '') {
      onAddTodo(text)
      setText('')
    }
  })

  return (
    <Flex p="2" alignItems="baseline">
      <Input
        type="text"
        value={text}
        placeholder="Enter todo title"
        onKeyDown={keyDown}
        onChange={setText}
      />

      <Button colorScheme="blue" mt="2" ml="3" onClick={() => onAddTodo(text)}>
        Add
      </Button>
    </Flex>
  )
}

type TabsProps = Readonly<{
  tabs: readonly string[]
  activeTab: string
  onTabChange(tab: string): void
}>

const Tabs = ({ tabs, activeTab, onTabChange }: TabsProps) => {
  return (
    <Flex>
      {tabs.map(tab => (
        <Text
          key={tab}
          p="2"
          cursor="pointer"
          bgColor={activeTab === tab ? 'gray.400' : 'gray.100'}
          mt="2"
          mr="1"
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </Text>
      ))}
    </Flex>
  )
}

const tabs = ['All', 'Incomplete', 'Completed']

export const TodoApp = () => {
  const queryClient = useQueryClient()
  const { data } = useTodoList()
  const [add] = useAddTodo(queryClient)
  const [toggle] = useToggle(queryClient)

  const [activeTab, setActiveTab] = useString(tabs[0])

  invariant(data !== undefined, 'todoList should be defined')

  return (
    <ChakraProvider>
      <Flex justifyContent="space-between" p="2" bgColor="gray.200">
        <Heading>React Examples</Heading>
        <Text fontSize="3xl" fontWeight="bold" color="green">
          100
        </Text>
      </Flex>

      <Tabs
        tabs={tabs}
        onTabChange={tab => setActiveTab(_ => tab)}
        activeTab={activeTab}
      />

      <Heading as="h2" size="lg" p="2">
        Todo List
      </Heading>

      <AddTodo onAddTodo={add} />

      <List>
        {pipe(
          data,
          map(todo => <TodoItem key={todo.id} todo={todo} toggle={toggle} />),
          toArray,
        )}
      </List>
    </ChakraProvider>
  )
}

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
import { primitive, state } from '@srtp/react'
import { useEvent, useInputState } from '@srtp/react'
import type { KeyboardEvent } from 'react'
import { z } from 'zod'

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

const useTodoList = state(
  { todoList },
  {
    toggle(state, id: number) {
      const todo = state.todoList.find(todo => todo.id === id)
      if (todo) {
        todo.done = !todo.done
      }
    },

    add(state, title: string) {
      state.todoList.push({
        id: state.todoList.length + 1,
        title,
        done: false,
      })
    },
  },
)

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

const FilterValue = z.enum(['All', 'Incomplete', 'Completed'])
type FilterValue = z.infer<typeof FilterValue>
const tabs = FilterValue.options

const useTabValue = primitive(FilterValue)

export const TodoApp = () => {
  const [{ todoList }, { add }] = useTodoList()
  const [activeTab, , setActiveTab] = useTabValue(tabs[0])

  return (
    <ChakraProvider>
      <Flex justifyContent="space-between" p="2" bgColor="gray.200">
        <Heading>React Examples</Heading>
        <Text fontSize="3xl" fontWeight="bold" color="green">
          100
        </Text>
      </Flex>

      <Tabs tabs={tabs} onTabChange={setActiveTab} activeTab={activeTab} />

      <Heading as="h2" size="lg" p="2">
        Todo List
      </Heading>

      <AddTodo onAddTodo={text => add(text)} />

      <List>
        {todoList.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </List>
    </ChakraProvider>
  )
}

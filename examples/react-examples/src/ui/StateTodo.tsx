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
import { state, useEvent, useInputState, useString } from '@srtp/react'
import type { KeyboardEvent } from 'react'

import '../index.css'

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
  onToggle(id: Todo['id']): void
}>

const TodoItem = ({ todo, onToggle }: TodoItemProps) => {
  return (
    <ListItem display="flex" gap="2">
      <Checkbox checked={todo.done} onChange={() => onToggle(todo.id)} />
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

const tabs = ['All', 'Incomplete', 'Completed']

export const TodoApp = () => {
  const [{ todoList }, { add, toggle }] = useTodoList()
  const [activeTab, , setActiveTab] = useString(tabs[0])

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
          <TodoItem key={todo.id} todo={todo} onToggle={toggle} />
        ))}
      </List>
    </ChakraProvider>
  )
}

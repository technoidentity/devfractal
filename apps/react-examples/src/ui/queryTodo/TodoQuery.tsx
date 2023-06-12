import {
  Button,
  ChakraProvider,
  Checkbox,
  Container,
  Flex,
  Heading,
  Input,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react'
import { useEvent, useInputState, useString } from '@srtp/local-state'
import { useQueryClient } from '@tanstack/react-query'
import type { KeyboardEvent } from 'react'
import type { Todo } from './todo'
import { useAddTodo, useTodoList, useToggle } from './todoHooks'

type TodoItemProps = Readonly<{
  todo: Todo
}>

const TodoItem = ({ todo }: TodoItemProps) => {
  const queryClient = useQueryClient()
  const [toggle] = useToggle(queryClient)

  return (
    <ListItem display="flex" gap="2">
      <Checkbox
        isDisabled={todo.id < 0}
        isChecked={todo.completed}
        onChange={() => toggle(todo)}
      />
      <Text>{todo.title}</Text>
    </ListItem>
  )
}

const AddTodo = () => {
  const queryClient = useQueryClient()
  const [add] = useAddTodo(queryClient)

  const [text, setText] = useInputState('')

  const keyDown = useEvent((evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter' && text.trim() !== '') {
      add(text)
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

      <Button colorScheme="blue" mt="2" ml="3" onClick={() => add(text)}>
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

export const TodoQueryApp = () => {
  const [activeTab, setActiveTab] = useString(tabs[0])
  const { data } = useTodoList()

  console.log('rendering')

  return (
    <ChakraProvider>
      <Container>
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

        <AddTodo />

        <List>
          {data.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </List>
      </Container>
    </ChakraProvider>
  )
}

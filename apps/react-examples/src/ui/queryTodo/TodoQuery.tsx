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
import { useString } from '@srtp/react'
import { useEvent, useInputState } from '@srtp/react'
import type { KeyboardEvent } from 'react'

import {
  useAddTodo,
  useDelete,
  useTodoList,
  useToggle,
} from './stateQueryTodoHooks'
import type { Todo } from './todo'

type TodoItemProps = Readonly<{
  todo: Todo
}>

const TodoItem = ({ todo }: TodoItemProps) => {
  const [toggle] = useToggle()
  const [remove] = useDelete()

  return (
    <ListItem display="flex" justifyContent="space-between" m="2">
      <Checkbox
        isDisabled={todo.id < 0}
        isChecked={todo.completed}
        onChange={() => toggle(todo.id)}
      />
      <Text>{todo.title}</Text>
      <Button colorScheme="red" size="sm" onClick={() => remove(todo.id)}>
        Delete
      </Button>
    </ListItem>
  )
}

const AddTodo = () => {
  const [add] = useAddTodo()

  const [text, setText] = useInputState('')

  const submit = useEvent(() => {
    add(text)
    setText('')
  })
  const keyDown = useEvent((evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter' && text.trim() !== '') {
      submit()
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

      <Button colorScheme="blue" mt="2" ml="3" onClick={submit}>
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
  const [data] = useTodoList()

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

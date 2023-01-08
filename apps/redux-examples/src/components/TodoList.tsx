import {
  Button,
  ButtonGroup,
  Checkbox,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Todo } from '@srtp/todo'
import { useDispatch, useState } from './Context'

export type TodoItemProps = Readonly<{
  todo: Todo
}>

export const TodoItem = ({ todo }: TodoItemProps) => {
  const dispatch = useDispatch()

  return (
    <Tr>
      <Td>{todo.title}</Td>
      <Td>
        <Checkbox
          isChecked={todo.completed}
          onChange={() => dispatch({ type: 'toggleTodo', id: todo.id })}
        />
      </Td>
      <Td>
        <ButtonGroup>
          <Button onClick={() => dispatch({ type: 'deleteTodo', id: todo.id })}>
            Delete
          </Button>
        </ButtonGroup>
      </Td>
    </Tr>
  )
}

export const TodoList = () => {
  const state = useState()
  const todoList = Array.from(state.todos.values())

  return (
    <Flex direction="column">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Completed</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {todoList.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </Tbody>
      </Table>
    </Flex>
  )
}

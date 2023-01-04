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
import React from 'react'
import { deleteTodo, state, toggleTodo } from './state'

export type TodoItemProps = Readonly<{ todo: Todo }>

export const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <Tr>
      <Td>{todo.title}</Td>
      <Td>
        <Checkbox
          isChecked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
      </Td>
      <Td>
        <ButtonGroup>
          <Button>Edit</Button>
          <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
        </ButtonGroup>
      </Td>
    </Tr>
  )
}

export const TodoList = () => {
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

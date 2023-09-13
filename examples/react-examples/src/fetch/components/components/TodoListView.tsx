import {
  Button,
  ButtonGroup,
  Checkbox,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import type { Task } from '@srtp/fake-tasks'
import React from 'react'

type TodoItemProps = Readonly<{
  todo: Readonly<Task>
  onToggle?(id: Task): void
  onDelete?(id: number): void
}>

const TodoItem = React.memo(({ todo, ...actions }: TodoItemProps) => (
  <Tr>
    <Td>{todo.title}</Td>
    <Td>{todo.title}</Td>
    <Td>
      <Checkbox
        isChecked={todo.completed}
        onChange={() => actions.onToggle?.(todo)}
      />
    </Td>
    {actions.onDelete && (
      <Td>
        <ButtonGroup>
          <Button>Edit</Button>
          <Button onClick={() => actions?.onDelete?.(todo.id)}>Delete</Button>
        </ButtonGroup>
      </Td>
    )}
  </Tr>
))

export type TodoListViewProps = Readonly<{
  todoList: readonly Task[]
  onToggle?(id: Task): void
  onDelete?(todo: number): void
}>

export const TodoListView = ({ todoList, ...actions }: TodoListViewProps) => (
  <Table variant="simple">
    <Thead>
      <Tr>
        <Th>Id</Th>
        <Th>Title</Th>
        <Th>Completed</Th>
        {actions.onDelete && <Th>Actions</Th>}
      </Tr>
    </Thead>
    <Tbody>
      {todoList.map(todo => (
        <TodoItem key={todo.id} todo={todo} {...actions} />
      ))}
    </Tbody>
  </Table>
)

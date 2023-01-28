/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Button,
  ButtonGroup,
  Checkbox,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Filter, Todo } from '@srtp/todo'
import {
  useDelete,
  useFilteredTodos,
  useFilterValue,
  useToggle,
  useUpdateFilter,
} from './state'

export type TodoItemProps = Readonly<{ todo: Todo }>

export const TodoItem = ({ todo }: TodoItemProps) => {
  const toggleTodo = useToggle()
  const deleteTodo = useDelete()

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
  const todoList = useFilteredTodos()
  const filter = useFilterValue()

  const updateFilter = useUpdateFilter()

  return (
    <>
      <RadioGroup onChange={evt => updateFilter(evt as Filter)} value={filter}>
        <Stack direction="row">
          <Radio value="All">All</Radio>
          <Radio value="Completed">Completed</Radio>
          <Radio value="Incomplete">Incomplete</Radio>
        </Stack>
      </RadioGroup>
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
    </>
  )
}

// Will start class in 5 min,

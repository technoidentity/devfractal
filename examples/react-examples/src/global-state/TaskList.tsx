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
import type { Task, TaskFilter } from '@srtp/fake-tasks'

import {
  useDelete,
  useFilterValue,
  useFilteredTasks,
  useToggle,
  useUpdateFilter,
} from './state'

export type TaskItemProps = Readonly<{ task: Task }>

export const TaskItem = ({ task }: TaskItemProps) => {
  const toggleTask = useToggle()
  const deleteTask = useDelete()

  return (
    <Tr>
      <Td>{task.title}</Td>
      <Td>
        <Checkbox
          isChecked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
      </Td>
      <Td>
        <ButtonGroup>
          <Button>Edit</Button>
          <Button onClick={() => deleteTask(task.id)}>Delete</Button>
        </ButtonGroup>
      </Td>
    </Tr>
  )
}

export const TaskList = () => {
  const taskList = useFilteredTasks()
  const filter = useFilterValue()

  const updateFilter = useUpdateFilter()

  return (
    <>
      <RadioGroup
        onChange={evt => updateFilter(evt as TaskFilter)}
        value={filter}
      >
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
            {taskList.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </Tbody>
        </Table>
      </Flex>
    </>
  )
}

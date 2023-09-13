import {
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
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
import type { Task } from '@srtp/fake-tasks'
import React from 'react'

import { filteredTasksSelector, filterSelector } from './selectors'
import { actions, useAction, useSelect } from './state'
import { TaskForm } from './TaskForm'

export type TaskItemProps = Readonly<Task>

export const TaskItem = React.memo(function TaskItem({
  completed,
  id,
  title,
}: TaskItemProps) {
  const { deleteTask, toggleTask } = actions

  const onDelete = useAction(() => deleteTask(id))
  const onToggle = useAction(() => toggleTask(id))

  return (
    <Tr>
      <Td>{title}</Td>
      <Td>
        <Checkbox isChecked={completed} onChange={onToggle} />
      </Td>
      <Td>
        <ButtonGroup>
          <Button>Edit</Button>
          <Button onClick={onDelete}>Delete</Button>
        </ButtonGroup>
      </Td>
    </Tr>
  )
})

export const TaskList = () => {
  const [show, set] = React.useState(false)

  const filter = useSelect(filterSelector)
  const filtered = useSelect(filteredTasksSelector)

  const onSetFilter = useAction(actions.setFilter)

  return (
    <>
      <RadioGroup onChange={onSetFilter} value={filter}>
        <Stack direction="row">
          <Radio value="All">All</Radio>
          <Radio value="Completed">Completed</Radio>
          <Radio value="Incomplete">Incomplete</Radio>
        </Stack>
      </RadioGroup>

      <Divider orientation="horizontal" />

      <Flex direction="column">
        {show ? (
          <TaskForm />
        ) : (
          <Button alignSelf="flex-end" m="20px" onClick={() => set(!show)}>
            Add
          </Button>
        )}

        <Divider orientation="horizontal" />

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Completed</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filtered.map(task => (
              <TaskItem key={task.id} {...task} />
            ))}
          </Tbody>
        </Table>
      </Flex>
    </>
  )
}

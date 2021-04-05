import { Stack, Heading, Center } from '@chakra-ui/layout'
import React from 'react'
import type { TaskType } from '../common'
import { Task } from './Task'

export interface TaskListProps {
  readonly list: readonly TaskType[]
}

export const TaskList: React.FC<TaskListProps> = ({ list }) => (
  <>
    <Center margin={10} color="#4c473f">
      <Heading>List of Tasks</Heading>
    </Center>
    <Stack margin={10}>
      {list.map(listItem => (
        <Task
          key={listItem.id}
          id={listItem.id}
          title={listItem.title}
          description={listItem.description}
        />
      ))}
    </Stack>
  </>
)

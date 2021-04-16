import { Stack, Heading, Center } from '@chakra-ui/layout'
import React from 'react'
import type { Task } from '../../common'
import { TaskItem } from './TaskItem'

export interface TaskListProps {
  readonly list: readonly Task[]
}

export const TaskList: React.FC<TaskListProps> = ({ list }) => (
  <>
    <Center margin={10} color="#4c473f">
      <Heading>List of Tasks</Heading>
    </Center>
    <Stack margin={10}>
      {list.map(listItem => (
        <TaskItem
          key={listItem.id}
          id={listItem.id}
          title={listItem.title}
          description={listItem.description}
        />
      ))}
    </Stack>
  </>
)
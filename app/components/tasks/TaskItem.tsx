import { Box, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import type { Task } from '../../common'

interface TaskItemProps {
  readonly taskDetails: Task
}
export const TaskItem: React.FC<TaskItemProps> = ({ taskDetails }) => (
  <Box
    color="#4c473f"
    bg="#ffefd5"
    borderRadius="10px"
    p={5}
    shadow="md"
    borderWidth="1px"
    _hover={{ bg: '#e5d7bf' }}
  >
    <Link
      href={{
        pathname: '/tasks/displayTask',
        query: { data: JSON.stringify(taskDetails) },
      }}
    >
      <a>
        <Heading>{taskDetails.title}</Heading>
      </a>
    </Link>
  </Box>
)

import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { deleteTask, Task } from '../../common'
import { SubmitButton } from '../common'

export interface OneTaskFormProps {
  readonly taskDetails: Task
}
export const OneTaskForm: React.FC<OneTaskFormProps> = ({ taskDetails }) => {
  const toast = useToast()

  const router = useRouter()

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    if (!taskDetails.id) {
      return
    }

    deleteTask(taskDetails.id)
      .then(() => {
        toast({
          title: 'Task deleted',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
      })
      .catch(() => {
        toast({
          title: 'Failed to delete task',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      })

    router
      .push('/tasks/list')
      .catch(error => <Heading>{error.message}</Heading>)
  }

  return (
    <>
      <Center margin={10} color="#4c473f">
        <Heading>List of Tasks</Heading>
      </Center>

      <Stack margin={10}>
        <Box
          color="#4c473f"
          bg="#ffefd5"
          borderRadius="10px"
          p={5}
          shadow="md"
          borderWidth="1px"
          _hover={{ bg: '#e5d7bf' }}
        >
          <Heading>{taskDetails.title}</Heading>
          <Text>{taskDetails.description}</Text>
        </Box>
        <Button
          type="submit"
          bg="lightgreen"
          variantcolor="teal"
          variant="outline"
          width="full"
          mt={4}
        >
          <Link
            href={{
              pathname: '/tasks/edit',
              query: { data: JSON.stringify(taskDetails) },
            }}
          >
            <a>Edit</a>
          </Link>
        </Button>
        <SubmitButton handleSubmit={handleDelete} title="Delete" />
      </Stack>
    </>
  )
}

import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'

import React from 'react'
import { SubmitButton } from '../../components/pre-interview'
import { useRouter } from 'next/router'
import type { Task } from '../../common'
import Link from 'next/link'

const DisplayTask = () => {
  const toast = useToast()

  const router = useRouter()
  const { id, title, description }: Task = JSON.parse(
    (router.query.data as any) as string,
  )

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    if (!id) {
      return
    }
    const res = await fetch('/api/tasks/deleteTask', {
      body: JSON.stringify(id),
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })

    const { error } = await res.json()

    if (!error) {
      toast({
        title: 'Task deleted',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Failed to delete task',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push('/tasks/displayTaskList')
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
          <Heading>{title}</Heading>
          <Text>{description}</Text>
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
              pathname: '/tasks/editTask',
              query: { data: JSON.stringify({ id, title, description }) },
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

export default DisplayTask

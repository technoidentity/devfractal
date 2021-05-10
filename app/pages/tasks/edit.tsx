import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import type { Task } from '../../common'
import { supabase, updateTask } from '../../common'
import { SubmitButton } from '../../components/pre-interview'
import { Header } from '../../components/tasks'
const Edit = () => {
  const user = supabase.auth.user()

  const toast = useToast()

  const router = useRouter()
  if (!router.query.data) {
    return <Text size="lg">Error</Text>
  }
  const { id, title, description }: Task = JSON.parse(
    (router.query.data as any) as string,
  )

  if (!user) {
    return (
      <Link href="/tasks">
        <a>Login to continue</a>
      </Link>
    )
  }

  const [editedTitle, setEditedTitle] = useState<string>(title)
  const [editedDescription, setEditedDescription] = useState<string>(
    description ?? '',
  )

  const handleEdit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    if (!id) {
      return
    }

    updateTask(id, editedTitle, editedDescription)
      .then(() => {
        toast({
          title: 'Task updated',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
      })
      .catch(() => {
        toast({
          title: 'Failed to update task',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      })

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router
      .push('/tasks/list')
      .catch(error => <Heading>{error.message}</Heading>)
  }

  return (
    <>
      <Header />
      <Flex alignItems="center" justifyContent="center" m="20">
        <Box
          m="auto"
          p={8}
          bg="beige"
          maxWidth="600px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Box textAlign="center">
            <Heading>Enter Task Details</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>

                <Input
                  bg="white"
                  type="text"
                  placeholder="enter title here"
                  width="md"
                  value={editedTitle}
                  onChange={event => setEditedTitle(event.currentTarget.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>

                <Input
                  bg="white"
                  type="text"
                  placeholder="enter description here"
                  width="md"
                  value={editedDescription}
                  onChange={event =>
                    setEditedDescription(event.currentTarget.value)
                  }
                />
              </FormControl>
              <SubmitButton handleSubmit={handleEdit} title="Submit" />
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export default Edit

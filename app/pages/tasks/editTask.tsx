import React, { useState } from 'react'
import { supabase, Task } from '../../common'
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { SubmitButton } from '../../components/pre-interview'

const EditTask = () => {
  const user = supabase.auth.user()

  const toast = useToast()

  const router = useRouter()
  const { id, title, description }: Task = JSON.parse(
    (router.query.data as any) as string,
  )

  if (!user) {
    return (
      <Heading>
        <Link href="/pre-interview">
          <a>Login to continue</a>
        </Link>
      </Heading>
    )
  }

  const [editedTitle, setEditedTitle] = useState<string>(title)
  const [editedDescription, setEditedDescription] = useState<string>(
    description ?? '',
  )

  const handleEdit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    if (!id) {
      return
    }
    const data: Task = {
      id,
      title: editedTitle,
      description: editedDescription,
    }
    const res = await fetch('/api/tasks/updateTask', {
      body: JSON.stringify(data),
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    })

    const { error } = await res.json()

    if (!error) {
      toast({
        title: 'Task updated',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Failed to update task',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push('/tasks/displayTaskList')
  }

  return (
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
  )
}

export default EditTask

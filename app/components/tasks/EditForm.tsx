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
import React, { useState } from 'react'
import type { Task } from '../../common'
import { updateTask } from '../../common'
import { SubmitButton } from '../common'
import { Error } from './Error'

export interface EditFormProps {
  readonly taskDetails: Task
}
export const EditForm: React.FC<EditFormProps> = ({ taskDetails }) => {
  const toast = useToast()
  const router = useRouter()
  const [editedTitle, setEditedTitle] = useState<string>(taskDetails.title)
  const [editedDescription, setEditedDescription] = useState<string>(
    taskDetails.description ?? '',
  )

  const handleEdit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    if (!taskDetails.id) {
      return
    }

    updateTask(taskDetails.id, editedTitle, editedDescription)
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

    router.push('/tasks/list').catch(error => <Error message={error.message} />)
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

import React, { useState } from 'react'

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react'

import { postTask } from '../../common'
import { SubmitButton } from '../pre-interview'

export const TaskForm: React.FC = () => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const toast = useToast()

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    if (!title) {
      toast({
        title: 'Please enter title',
        status: 'error',
        duration: 1000,
        isClosable: true,
      })
      return
    }
    if (!description) {
      toast({
        title: 'Please enter description',
        status: 'error',
        duration: 1000,
        isClosable: true,
      })
      return
    }
    const error = await postTask(title, description)

    setTitle('')
    setDescription('')

    if (!error) {
      toast({
        title: 'Task created',
        description: 'Thank you',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Failed to create task',
        description: 'Try again',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
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
                value={title}
                onChange={event => setTitle(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>

              <Input
                bg="white"
                type="text"
                placeholder="enter description here"
                width="md"
                value={description}
                onChange={event => setDescription(event.currentTarget.value)}
              />
            </FormControl>
            <SubmitButton handleSubmit={handleSubmit} title="Submit" />
          </form>
        </Box>
      </Box>
    </Flex>
  )
}

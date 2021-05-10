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
import { deleteTask, supabase, Task } from '../../common'
import { SubmitButton } from '../../components/pre-interview'
import { Header } from '../../components/tasks'

const One = () => {
  const toast = useToast()
  const user = supabase.auth.user()
  const router = useRouter()
  if (!router.query.data) {
    return <Text size="lg">Error</Text>
  }
  const { id, title, description }: Task = JSON.parse(
    (router.query.data as any) as string,
  )

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    if (!id) {
      return
    }

    deleteTask(id)
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

  if (!user) {
    return (
      <Heading>
        <Link href="/tasks">
          <a>Login to continue</a>
        </Link>
      </Heading>
    )
  }
  return (
    <>
      <Header />
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
              pathname: '/tasks/edit',
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
export default One

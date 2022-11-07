import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react'
import { ActionArgs, json, LoaderArgs } from '@remix-run/node'
import { Form, Link, useActionData } from '@remix-run/react'
import { authenticator } from '~/services/auth.server'
import { AuthorizationError } from 'remix-auth'

export async function action({ request, context }: ActionArgs) {
  try {
    return await authenticator.authenticate('user-pass', request, {
      successRedirect: '/courses',
      throwOnError: true,
    })
  } catch (error) {
    if (error instanceof Response) return error
    if (error instanceof AuthorizationError) {
      return json({ error: error.message }, { status: 401 })
    }
    return json({ error: 'something went wrong' })
  }
}

export const LoginForm = () => {
  const result = useActionData()

  return (
    <>
      <Flex alignItems="center" justifyContent="center" mt="20px">
        <Box
          w="600px"
          boxShadow="  inset 0 -3em 3em rgba(0,0,0,0.1),
          0 0  0 2px rgb(255,255,255),
          0.3em 0.3em 1em rgba(0,0,0,0.3);"
          p="30px"
          mb="30px"
        >
          <Center>
            <Heading>Login</Heading>
          </Center>
          <Form method="post">
            <FormControl>
              <FormLabel htmlFor="title">Username</FormLabel>
              <Input name="username" required />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="title">Password</FormLabel>
              <Input type="password" name="password" required />
            </FormControl>
            <ButtonGroup gap="2" mt="10px">
              <Button colorScheme="blackAlpha" type="submit">
                Login
              </Button>
              <Button colorScheme="blackAlpha">Reset</Button>
            </ButtonGroup>
          </Form>
          <Text color="red">{result?.error && <div>{result.error}</div>}</Text>
          <Text mt="20px">
            Not a user{' '}
            <Link
              to="/signup"
              style={{ textDecoration: 'underline', color: 'blue' }}
            >
              Signup
            </Link>
          </Text>
        </Box>
      </Flex>
    </>
  )
}

export default LoginForm

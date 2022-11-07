import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react'
import { ActionFunction, redirect } from '@remix-run/node'
import { Form, Link, useActionData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { db } from '~/utils/db.server'
import bcrypt from 'bcryptjs'

type ActionData = { error: string } | undefined

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData()
  const username = data.get('username')
  const password = data.get('password')

  invariant(typeof username === 'string', 'username must be a string')
  invariant(typeof password === 'string', 'password must be a string')

  const isUsernameExists =
    (await db.user.count({
      where: {
        username,
      },
    })) > 0

  const hashedPassword = await bcrypt.hash(password, 10)

  if (isUsernameExists) {
    return { error: 'username already exists' }
  }

  await db.user.create({
    data: {
      username,
      passwordHash: hashedPassword,
    },
  })
  return redirect('/login')
}

export const SignupForm = () => {
  const data = useActionData<ActionData>()
  return (
    <>
      <Flex alignItems="center" justifyContent="center" mt="20px">
        <Box
          w="600px"
          boxShadow="  inset 0 -3em 3em rgba(0,0,0,0.1),
               0 0  0 2px rgb(255,255,255),
               0.3em 0.3em 1em rgba(0,0,0,0.3);"
          p="30px"
        >
          <Center>
            <Heading>Register</Heading>
          </Center>
          <Form method="post">
            <FormControl>
              <FormLabel htmlFor="title">Username</FormLabel>
              <Input type="text" name="username" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="title">Password</FormLabel>
              <Input type="password" name="password" />
            </FormControl>
            {data?.error && <Text color="red">{data.error}</Text>}
            <Button colorScheme="blue" type="submit" mt="10px">
              Signup
            </Button>
            <Text mt="20px">
              Already a user{' '}
              <Link
                to="/login"
                style={{ textDecoration: 'underline', color: 'blue' }}
              >
                Login
              </Link>
            </Text>
          </Form>
        </Box>
      </Flex>
    </>
  )
}

export default SignupForm

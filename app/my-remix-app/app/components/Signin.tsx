import {
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Text,
  Box,
  Button,
} from '@chakra-ui/react'
import { Link, Form } from '@remix-run/react'
import { LoginArgs } from '~/services/user.server'

type ActionData = {
  fieldErrors?: LoginArgs
  fields?: LoginArgs
  formError?: string
}

interface SigninProps {
  searchParams: URLSearchParams
  actionData: ActionData
}

export const Signin = ({ actionData, searchParams }: SigninProps) => {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool{' '}
            <Link to="/https://beta.reactjs.org" color={'blue.400'}>
              features
            </Link>{' '}
            ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            {actionData?.formError ? (
              <Text color="red.500" role="alert" id="password-error">
                {actionData.formError}
              </Text>
            ) : null}
            <Form method="post">
              <input
                type="hidden"
                name="redirectTo"
                value={searchParams.get('redirectTo') ?? undefined}
              />
              <FormControl>
                <FormLabel htmlFor="title">Username</FormLabel>
                <Input
                  name="username"
                  aria-invalid={Boolean(actionData?.fieldErrors?.username)}
                  aria-errormessage={
                    actionData?.fieldErrors?.username
                      ? 'username-error'
                      : undefined
                  }
                  required
                />
                {actionData?.fieldErrors?.username ? (
                  <Text color="red.500" role="alert" id="username-error">
                    {actionData.fieldErrors.username}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  aria-invalid={
                    Boolean(actionData?.fieldErrors?.password) || undefined
                  }
                  aria-errormessage={
                    actionData?.fieldErrors?.password
                      ? 'password-error'
                      : undefined
                  }
                  required
                />
                {actionData?.fieldErrors?.password ? (
                  <Text color="red.500" role="alert" id="password-error">
                    {actionData.fieldErrors.password}
                  </Text>
                ) : null}
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link to="/" color={'blue.400'}>
                    Forgot password?
                  </Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                >
                  Sign in
                </Button>
              </Stack>
            </Form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

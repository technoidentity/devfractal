import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Text,
  InputRightElement,
  Button,
  Link,
} from '@chakra-ui/react'
import { Form } from '@remix-run/react'
import type { LoginArgs } from '~/services/user.server'

type ActionData = {
  fieldErrors?: LoginArgs
  fields?: LoginArgs
  formError?: string
}

interface SignupProps {
  showPassword: boolean
  setShowPassword(showPassword: boolean): void
  actionData: ActionData
}

export const Signup = ({
  actionData,
  showPassword,
  setShowPassword,
}: SignupProps) => {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
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
              <FormControl id="title" isRequired>
                <FormLabel htmlFor="title">Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  aria-invalid={Boolean(actionData?.fieldErrors?.username)}
                  aria-errormessage={
                    actionData?.fieldErrors?.username
                      ? 'username-error'
                      : undefined
                  }
                />
                {actionData?.fieldErrors?.username ? (
                  <Text color="red.500" role="alert" id="username-error">
                    {actionData.fieldErrors.username}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    aria-invalid={
                      Boolean(actionData?.fieldErrors?.password) || undefined
                    }
                    aria-errormessage={
                      actionData?.fieldErrors?.password
                        ? 'password-error'
                        : undefined
                    }
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => {
                        setShowPassword(showPassword)
                      }}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {actionData?.fieldErrors?.password ? (
                  <Text color="red.500" role="alert" id="password-error">
                    {actionData.fieldErrors.password}
                  </Text>
                ) : null}
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user?{' '}
                  <Link color={'blue.400'} href="/signin">
                    Login
                  </Link>
                </Text>
              </Stack>
            </Form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

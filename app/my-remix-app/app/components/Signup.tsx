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

interface SignupProps {
  showPassword: boolean
  setShowPassword(showPassword: boolean): void
}

export const Signup = ({ showPassword, setShowPassword }: SignupProps) => {
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
            <Form method="post">
              <FormControl isRequired>
                <FormLabel htmlFor="title">Username</FormLabel>
                <Input type="text" name="username" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword(showPassword)}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
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

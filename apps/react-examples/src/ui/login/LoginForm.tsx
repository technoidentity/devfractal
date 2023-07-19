import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  ButtonGroup,
} from '@chakra-ui/react'
import { useInputState } from '@srtp/react'

export const LoginForm = () => {
  const [email, setEmail] = useInputState('')
  const [password, setPassword] = useInputState('')

  return (
    <Flex alignItems="center" justifyContent="center" mt="20px">
      <Box
        w="600px"
        boxShadow="  inset 0 -3em 3em rgba(0,0,0,0.1),
               0 0  0 2px rgb(255,255,255),
               0.3em 0.3em 1em rgba(0,0,0,0.3);"
        p="30px"
        mb="30px"
      >
        <form>
          <FormControl>
            <FormLabel htmlFor="title">Email</FormLabel>
            <Input type="email" value={email} onChange={setEmail} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="title">Password</FormLabel>
            <Input type="password" value={password} onChange={setPassword} />
          </FormControl>
          <ButtonGroup gap="2" mt="10px">
            <Button colorScheme="blackAlpha" type="submit">
              Login
            </Button>
            <Button colorScheme="blackAlpha">Reset</Button>
          </ButtonGroup>
        </form>
      </Box>
    </Flex>
  )
}

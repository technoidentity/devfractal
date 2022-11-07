import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Center,
  Flex,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { User } from '@prisma/client'
import { Link as RLink, NavLink } from '@remix-run/react'

const activeStyle = {
  color: 'blue',
}

export const Nav = ({ user }: { user?: User }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
      <Box bg="darkgray" px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <Text fontWeight="bold" fontSize="2xl" letterSpacing="wide">
              ILM
            </Text>
          </Box>
          <>
            {!user && (
              <Flex alignItems={'center'}>
                <Stack direction={'row'} spacing={7}>
                  <Button onClick={toggleColorMode}>
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                  </Button>
                  <NavLink
                    to="/login"
                    style={({ isActive }) => (isActive ? activeStyle : {})}
                  >
                    <Button>Signin</Button>
                  </NavLink>
                  <NavLink
                    to="/signup"
                    style={({ isActive }) => (isActive ? activeStyle : {})}
                  >
                    <Button>signup</Button>
                  </NavLink>
                </Stack>
              </Flex>
            )}
          </>
          <>
            {user && (
              <Flex alignItems={'center'}>
                <Stack direction={'row'} spacing={7}>
                  <Button onClick={toggleColorMode}>
                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                  </Button>
                  <Center>{user.username}</Center>
                  <form method="post" action="/logout">
                    <Button type="submit">Logout</Button>
                  </form>
                </Stack>
              </Flex>
            )}
          </>
        </Flex>
      </Box>
    </>
  )
}

/* eslint-disable no-console */
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { MdClose, MdMenu } from 'react-icons/md'
import { supabase } from '../../common'

export interface MenuItemsProps {
  readonly title: string
  readonly to: string
}

const MenuItems: React.FC<MenuItemsProps> = ({ title, to }) => (
  <Text mb={{ base: 8, sm: 0 }} mr={{ base: 0, sm: 8 }} display="block">
    <Link href={to}>
      <a>{title}</a>
    </Link>
  </Text>
)

export const Header = () => {
  const [show, setShow] = React.useState(false)
  const toggleMenu = () => setShow(!show)
  const user = supabase.auth.user()
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={['teal.200', 'teal.200', 'teal.200', 'teal.200']}
      color={['teal.900', 'teal.900', 'teal.700', 'teal.700']}
    >
      <Flex align="center">
        {/* <Logo
          w="100px"
          color={['teal.900', 'teal.900', 'teal.500', 'teal.500']}
        /> */}
        <Text> Hello </Text>
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={toggleMenu}>
        {show ? <Icon as={MdClose} /> : <Icon as={MdMenu} />}
      </Box>

      <Box
        display={{ base: show ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
      >
        <Flex
          align={['center', 'center', 'center', 'center']}
          justify={['center', 'space-between', 'flex-end', 'flex-end']}
          direction={['column', 'row', 'row', 'row']}
          pt={[4, 4, 0, 0]}
        >
          <MenuItems title="Home" to="/tasks" />

          {!user ? (
            <>
              <Link href="/tasks/signin">
                <a>
                  {' '}
                  <Button
                    size="sm"
                    rounded="md"
                    color={['teal.200', 'teal.200', 'teal.900', 'teal.900']}
                    bg={['teal.900', 'teal.900', 'teal.200', 'teal.200']}
                    _hover={{
                      bg: ['teal.600', 'teal.600', 'teal.600', 'teal.600'],
                    }}
                  >
                    {' '}
                    Sign In
                  </Button>{' '}
                </a>
              </Link>
              <Link href="/tasks/signup">
                <a>
                  <Button
                    size="sm"
                    rounded="md"
                    color={['teal.200', 'teal.200', 'teal.900', 'teal.900']}
                    bg={['teal.900', 'teal.900', 'teal.200', 'teal.200']}
                    _hover={{
                      bg: ['teal.600', 'teal.600', 'teal.600', 'teal.600'],
                    }}
                  >
                    Create Account
                  </Button>
                </a>
              </Link>
            </>
          ) : (
            <>
              <MenuItems title="Create Task" to="/tasks/create" />
              <MenuItems title="Tasks List" to="/tasks/list" />
              <Link href="/tasks">
                <a>
                  <Button
                    size="sm"
                    rounded="md"
                    color={['teal.200', 'teal.200', 'teal.900', 'teal.900']}
                    bg={['teal.900', 'teal.900', 'teal.200', 'teal.200']}
                    _hover={{
                      bg: ['teal.600', 'teal.600', 'teal.600', 'teal.600'],
                    }}
                    onClick={async () => {
                      const { error } = await supabase.auth.signOut()
                      if (error) {
                        console.log('Error logging out:', error.message)
                      }
                    }}
                  >
                    Sign Out
                  </Button>{' '}
                </a>
              </Link>
            </>
          )}
        </Flex>
      </Box>
    </Flex>
  )
}

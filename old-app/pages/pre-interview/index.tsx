import { Box, Button, Flex, Heading, Spacer } from '@chakra-ui/react'
import { Auth } from '@supabase/ui'
import Link from 'next/link'
import React from 'react'
import { isAdmin, supabase } from '../../common'
import { LoginForm } from '../../components/pre-interview'

export default function IndexPage() {
  const { user } = Auth.useUser()

  return (
    <>
      <Flex
        mb={10}
        p={15}
        bg="lightblue"
        borderWidth={1}
        borderRadius={12}
        boxShadow="lg"
      >
        <Box>
          <Heading size="lg" ml={2}>
            Pre Interview
          </Heading>
        </Box>
        <Spacer />
        <Box>
          {user && (
            <Button
              colorScheme="teal"
              mr="4"
              onClick={async () => {
                await supabase.auth.signOut()
              }}
            >
              Sign Out
            </Button>
          )}
        </Box>
      </Flex>
      {!user && <LoginForm />}
      {user && (
        <Link href="/pre-interview/questionsList">
          <a>Go to Questions Page</a>
        </Link>
      )}
      {isAdmin() && (
        <Link href="/pre-interview/userList/">
          <a>Go to Users Details Page</a>
        </Link>
      )}
    </>
  )
}

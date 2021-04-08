import React from 'react'
import { Box, Flex, Heading, Spacer, Button } from '@chakra-ui/react'
import { supabase } from '../../common/initSupabase'
import { Auth } from '@supabase/ui'
import LoginForm from '../../components/pre-interview/LoginForm'

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
      {!user && <LoginForm />}{' '}
    </>
  )
}

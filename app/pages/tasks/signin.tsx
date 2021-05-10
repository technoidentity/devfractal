/* eslint-disable no-console */
import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { Auth } from '@supabase/ui'
import { useRouter } from 'next/router'
import React from 'react'
import { supabase } from '../../common'

export default function IndexPage() {
  const { user } = Auth.useUser()

  const router = useRouter()
  if (user) {
    router.push('/tasks').catch(error => <Heading>{error.message}</Heading>)
  }
  return (
    <Flex alignItems="center" justifyContent="center" m="20">
      {!user ? (
        <Box
          m="auto"
          p={8}
          bg="beige"
          maxWidth="600px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Auth
            supabaseClient={supabase}
            providers={['google', 'github']}
            socialLayout="horizontal"
            socialButtonSize="xlarge"
          />
        </Box>
      ) : (
        <Box
          m="auto"
          p={8}
          bg="beige"
          maxWidth="600px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Heading>Welcome {user.email}</Heading>
          <Button
            w="full"
            mt={12}
            bg="black.100"
            color="black.900"
            onClick={async () => {
              const { error } = await supabase.auth.signOut()
              if (error) {
                console.log('Error logging out:', error.message)
              }
            }}
          >
            Logout
          </Button>
        </Box>
      )}
    </Flex>
  )
}

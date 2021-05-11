import { Box, Flex, Heading, Text } from '@chakra-ui/react'
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
      {!user && (
        <Box
          m="auto"
          p={8}
          bg="beige"
          maxWidth="600px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Text size="lg" color="red">
            You need to confirm your email id
          </Text>
          <Text size="lg" color="red">
            {' '}
            Click on the confirmation link sent to your email id{' '}
          </Text>
          <Auth
            view="sign_up"
            supabaseClient={supabase}
            providers={['google', 'github']}
            socialLayout="horizontal"
            socialButtonSize="xlarge"
          />
        </Box>
      )}
    </Flex>
  )
}

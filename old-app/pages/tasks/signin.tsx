import { Box, Flex } from '@chakra-ui/react'
import { Auth } from '@supabase/ui'
import { useRouter } from 'next/router'
import React from 'react'
import { supabase } from '../../common'
import { Error } from '../../components/tasks'

export default function IndexPage() {
  const { user } = Auth.useUser()

  const router = useRouter()
  if (user) {
    router.push('/tasks').catch(error => <Error message={error.message} />)
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
          <Auth
            view="sign_in"
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

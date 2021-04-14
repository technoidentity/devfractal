import { supabase } from '../../common/initSupabase'
import React, { useState } from 'react'

import { Flex, Box, Heading } from '@chakra-ui/react'
import LoadingButton from './LoadingButton'
import SendLinkButton from './SignInButton'
import ErrorMessage from './ErrorMessage'
import SuccessMessage from './SuccessMessage'
import EmailInputField from './EmailInputField'

export default function LoginForm() {
  const [email, setEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { error } = await supabase.auth.signIn(
      { email },
      {
        redirectTo: 'http://localhost:3000/pre-interview/',
      },
    )

    if (error) {
      setErrorMessage(error.message)
      setEmail('')
    } else {
      setErrorMessage('')
      setSuccess(true)
    }
    setIsLoading(false)
  }

  return (
    <Flex alignItems="center" justifyContent="center" m="20">
      <Box
        m="auto"
        p={8}
        bg="beige"
        maxWidth="600px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form>
            <EmailInputField setEmail={setEmail} />
            {isLoading ? (
              <LoadingButton />
            ) : (
              <SendLinkButton handleSubmit={handleSubmit} />
            )}
            {errorMessage && <ErrorMessage message={errorMessage} />}
            {success && <SuccessMessage />}
          </form>
        </Box>
      </Box>
    </Flex>
  )
}

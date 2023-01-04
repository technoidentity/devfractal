import { Box, Flex, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import { supabase } from '../../common/initSupabase'
import { SubmitButton } from '../common/SubmitButton'
import { EmailInputField } from './EmailInputField'
import { ErrorMessage } from './ErrorMessage'
import { LoadingButton } from './LoadingButton'
import { SuccessMessage } from './SuccessMessage'

export const LoginForm = () => {
  const [email, setEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
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
              <SubmitButton
                handleSubmit={handleSubmit}
                title="Send Magic Link"
              />
            )}
            {errorMessage && <ErrorMessage message={errorMessage} />}
            {success && <SuccessMessage />}
          </form>
        </Box>
      </Box>
    </Flex>
  )
}

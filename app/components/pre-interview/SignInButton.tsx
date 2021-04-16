import React from 'react'
import { Button } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import { BiMailSend } from 'react-icons/bi'
export interface SignInButtonProps {
  handleSubmit(): void
}
export const SignInButton: React.FC<SignInButtonProps> = ({ handleSubmit }) => (
  <Button
    type="submit"
    leftIcon={<Icon as={BiMailSend} />}
    bg="lightgreen"
    variantcolor="teal"
    variant="outline"
    width="full"
    mt={4}
    onClick={handleSubmit}
  >
    Send Magic Link
  </Button>
)

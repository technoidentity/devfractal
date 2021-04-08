import React from 'react'
import { Button } from '@chakra-ui/react'

export interface SignInButtonProps {
  handleSubmit(): void
}
const SignInButton: React.FC<SignInButtonProps> = ({ handleSubmit }) => (
  <Button
    type="submit"
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

export default SignInButton

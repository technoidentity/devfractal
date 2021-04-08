import React from 'react'
import { Button } from '@chakra-ui/react'

const LoadingButton = () => (
  <Button
    isLoading
    loadingText="Send Magic Link"
    type="submit"
    bg="lightgreen"
    variantcolor="teal"
    variant="outline"
    width="full"
    mt={4}
  >
    Send Magic Link
  </Button>
)

export default LoadingButton

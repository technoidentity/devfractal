import { Button } from '@chakra-ui/react'
import React from 'react'

export const LoadingButton = () => (
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

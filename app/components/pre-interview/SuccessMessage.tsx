import React from 'react'
import { Box, Alert, AlertIcon, AlertDescription } from '@chakra-ui/react'

export const SuccessMessage: React.FC = () => (
  <Box my={4}>
    <Alert status="success" borderRadius={4}>
      <AlertIcon />
      <AlertDescription>
        Click on the link sent to your email to sign in
      </AlertDescription>
    </Alert>
  </Box>
)

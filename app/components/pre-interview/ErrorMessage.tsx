import { Alert, AlertDescription, AlertIcon, Box } from '@chakra-ui/react'
import React from 'react'

export interface ErrorMessageProps {
  readonly message: string
}
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <Box my={4}>
    <Alert status="error" borderRadius={4}>
      <AlertIcon />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  </Box>
)

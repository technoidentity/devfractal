import React from 'react'
import { Box, Alert, AlertIcon, AlertDescription } from '@chakra-ui/react'

export interface ErrorMessageProps {
  readonly message: string
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <Box my={4}>
    <Alert status="error" borderRadius={4}>
      <AlertIcon />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  </Box>
)

export default ErrorMessage

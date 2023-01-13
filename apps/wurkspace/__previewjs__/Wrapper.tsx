import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'

export const Wrapper = ({ children }: any) => (
  <ChakraProvider>{children}</ChakraProvider>
)

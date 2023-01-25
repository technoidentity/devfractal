import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import '@previewjs/config-helper-nextjs'

export const Wrapper = ({ children }: any) => (
  <ChakraProvider>{children}</ChakraProvider>
)

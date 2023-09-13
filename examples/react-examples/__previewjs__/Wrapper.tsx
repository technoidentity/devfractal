import { ChakraProvider } from '@chakra-ui/react'

export const Wrapper = ({ children }: any) => (
  <ChakraProvider>{children}</ChakraProvider>
)

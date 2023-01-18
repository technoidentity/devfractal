import { ChakraProvider } from '@chakra-ui/react'
import '../styles/global.css'
import '@previewjs/config-helper-nextjs'

export const Wrapper = ({ children }: any) => (
  <ChakraProvider>{children}</ChakraProvider>
)

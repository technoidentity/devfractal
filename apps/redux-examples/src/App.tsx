import { ChakraProvider } from '@chakra-ui/react'
import { TodoApp } from './components'

export const App = () => (
  <ChakraProvider>
    <TodoApp />
  </ChakraProvider>
)

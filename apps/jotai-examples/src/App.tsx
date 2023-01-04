import { TodoApp } from './examples'
import { DecCounter } from './examples/DecCounter'
import { Provider } from 'jotai'
import { ChakraProvider } from '@chakra-ui/react'

export const App = () => (
  <ChakraProvider>
    <Provider>
      <DecCounter />
      <TodoApp />
    </Provider>
  </ChakraProvider>
)

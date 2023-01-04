import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { TodoApp } from './components'

export const App = () => (
  <ChakraProvider>
    <TodoApp />
  </ChakraProvider>
)

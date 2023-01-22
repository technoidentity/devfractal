import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'

const root = createRoot(document.getElementById('root')!)

root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
)

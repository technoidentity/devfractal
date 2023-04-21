import { ChakraProvider, Heading } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import { routes } from './routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './core/useGet'
import { Suspense } from 'react'

const root = createRoot(document.getElementById('root')!)

const router = createBrowserRouter(routes)

root.render(
  <Suspense fallback={<Heading>Loading...</Heading>}>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  </Suspense>,
)

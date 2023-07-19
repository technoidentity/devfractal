import { ChakraProvider, Heading } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import { QueryClientProvider } from '@tanstack/react-query'

import { Suspense } from 'react'
import { rootRouter } from './routes'
import { queryClient } from '@srtp/router'

const root = createRoot(document.getElementById('root')!)

const router = createBrowserRouter([rootRouter])

root.render(
  <ChakraProvider>
    <Suspense fallback={<Heading>Loading...</Heading>}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Suspense>
  </ChakraProvider>,
)

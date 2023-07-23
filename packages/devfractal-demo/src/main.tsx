import { queryClient } from '@srtp/router'
import { QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
// import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import invariant from 'tiny-invariant'
import './globals.css'
// import { rootRouter } from './routes'
import './todoRouter'

const container = document.createElement('div')
invariant(container, 'container not found')
const root = createRoot(container)

// const router = createBrowserRouter([rootRouter])

root.render(
  <Suspense fallback={<h1>Loading...</h1>}>
    <QueryClientProvider client={queryClient}>
      {/* <RouterProvider router={router} /> */}
    </QueryClientProvider>
  </Suspense>,
)

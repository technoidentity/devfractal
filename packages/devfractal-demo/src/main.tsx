import { queryClient } from '@srtp/router'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import invariant from 'tiny-invariant'
import './globals.css'
import { tasksRoutes } from './tasksRoutes'

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
}

const container = document.getElementById('root')
console.log(container)

invariant(container, 'container not found')
const root = createRoot(container)

const router = createBrowserRouter(tasksRoutes)

root.render(
  <Suspense fallback={<h1>Loading...</h1>}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  </Suspense>,
)

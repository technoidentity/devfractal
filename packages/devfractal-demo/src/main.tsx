import { queryClient } from '@srtp/router'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import invariant from 'tiny-invariant'
import './globals.css'

import { ErrorBoundary } from 'react-error-boundary'
import { tasksRoutes } from './examples/router/tasksRoutes'

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
}

const container = document.getElementById('root')

invariant(container, 'container not found')
const root = createRoot(container)

const router = createBrowserRouter(tasksRoutes)

root.render(
  <ErrorBoundary fallback={<div>Error</div>}>
    <Suspense fallback={<h1>Loading...</h1>}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools position="bottom-right" />
      </QueryClientProvider>
    </Suspense>
  </ErrorBoundary>,
)

import { queryClient } from '@srtp/router'
import { QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import invariant from 'tiny-invariant'
import './globals.css'
import './todoRouter'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import { rootRouter } from './routes'

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
}

const container = document.createElement('div')
invariant(container, 'container not found')
const root = createRoot(container)

// const router = createBrowserRouter([rootRouter])

root.render(
  <Suspense fallback={<h1>Loading...</h1>}>
    <QueryClientProvider client={queryClient}>
      {/* <RouterProvider router={router} /> */}
      {/* @TODO: enable only in dev mode */}
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  </Suspense>,
)

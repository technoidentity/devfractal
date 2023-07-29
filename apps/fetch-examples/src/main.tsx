import { createRoot } from 'react-dom/client'

import invariant from 'tiny-invariant'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

import { Suspense } from 'react'
import { App } from './App'
import './index.css'

const container = document.getElementById('root')
invariant(container, 'Root container not found')
const root = createRoot(container)

const client = new QueryClient({
  defaultOptions: {
    queries: { suspense: true },
    mutations: { useErrorBoundary: true },
  },
})

if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser')
  await worker.start()
}

root.render(
  <ErrorBoundary fallback={<h1>Something went wrong</h1>}>
    <Suspense fallback={<h1>Loading...</h1>}>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </Suspense>
  </ErrorBoundary>,
)

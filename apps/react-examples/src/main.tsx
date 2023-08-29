import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'

import './index.css'
import { TodoQueryApp } from './ui/queryTodo'

const root = createRoot(document.getElementById('root')!)

const qc = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      suspense: true,
      useErrorBoundary: true,
    },
    mutations: {
      useErrorBoundary: true,
    },
  },
})

root.render(
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <Suspense fallback={<div>Loading...</div>}>
      <QueryClientProvider client={qc}>
        <TodoQueryApp />
      </QueryClientProvider>
    </Suspense>
  </ErrorBoundary>,
)

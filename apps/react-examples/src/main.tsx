import { createRoot } from 'react-dom/client'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { TodoQueryApp } from './ui/queryTodo'

const root = createRoot(document.getElementById('root')!)

const qc = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      suspense: true,
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

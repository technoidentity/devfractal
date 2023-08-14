import '@/globals.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider, queryClient } from 'devfractal'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

export const Wrapper = ({ children }: any) => (
  <ThemeProvider>
    <ErrorBoundary fallback={<div>Error</div>}>
      <Suspense fallback={<h1>Loading...</h1>}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider
            router={createBrowserRouter([{ path: '*', element: children }])}
          />
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  </ThemeProvider>
)

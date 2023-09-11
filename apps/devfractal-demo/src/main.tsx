// import { UpdateExample } from '@/examples/state/UpdateExample'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppProvider } from 'devfractal'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import invariant from 'tiny-invariant'

import { QueryTaskApp } from './examples/query/EpStateTasks'
import { tasksRoutes } from './examples/router/tasksRoutes'
import './global.css'
import { queryClient } from '@/queryClient'

// if (process.env.NODE_ENV === 'development') {
//   const { worker } = await import('./mocks/browser')
//   await worker.start({ onUnhandledRequest: 'bypass' })
// }

const container = document.getElementById('root')

invariant(container, 'container not found')
const root = createRoot(container)

const indexRoute: RouteObject = { path: '/', element: <QueryTaskApp /> }

const router = createBrowserRouter([...tasksRoutes, indexRoute])

root.render(
  <AppProvider
    ErrorFallback={_ => <div>Error</div>}
    suspenseFallback={<div>Loading...</div>}
    router={router}
    queryClient={queryClient}
  >
    <ReactQueryDevtools position="bottom-right" />
  </AppProvider>,
)

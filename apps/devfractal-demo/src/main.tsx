import { AppProvider, createRoot } from 'devfractal'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { queryClient } from '@/queryClient'

import { DataTable } from './server-side/DataTable'
import './global.css'

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
}

const router = createBrowserRouter([
  {
    path: '*',
    element: <DataTable />,
  },
])

const root = createRoot('root')

root.render(
  <AppProvider
    ErrorFallback={_ => <div>Error</div>}
    suspenseFallback={<div>Loading...</div>}
    queryClient={queryClient}
  >
    <RouterProvider router={router} />
  </AppProvider>,
)

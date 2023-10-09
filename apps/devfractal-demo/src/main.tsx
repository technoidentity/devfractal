import { AppProvider, createRoot } from 'devfractal'
import './global.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { DataTable } from './server-side/DataTable'
import { queryClient } from '@/queryClient'

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
}

const root = createRoot('root')

const router = createBrowserRouter([
  {
    path: '*',
    element: <DataTable />,
  },
])

root.render(
  <AppProvider
    ErrorFallback={_ => <div>Error</div>}
    suspenseFallback={<div>Loading...</div>}
    queryClient={queryClient}
  >
    <RouterProvider router={router} />
  </AppProvider>,
)

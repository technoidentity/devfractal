import { AppProvider, createRoot } from 'devfractal'

import { App } from './App'
import { queryClient } from '@/queryClient'
import './global.css'

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
}

const root = createRoot('root')

root.render(
  <AppProvider
    ErrorFallback={_ => <div>Error</div>}
    suspenseFallback={<div>Loading...</div>}
    queryClient={queryClient}
  >
    <App />
  </AppProvider>,
)

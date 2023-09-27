import { createRoot } from '@srtp/react'
import { App } from '@/App'

if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
}

const root = createRoot('root')

root.render(<App />)

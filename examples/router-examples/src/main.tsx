import { createRoot } from '@srtp/react'

import { ContactsApp } from '@/contacts'
import './global.css'

if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
}

const root = createRoot('root')

root.render(<ContactsApp />)

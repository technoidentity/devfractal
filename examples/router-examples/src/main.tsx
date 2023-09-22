import { createRoot } from '@srtp/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { contactsRouter } from '@/contacts'
import './global.css'

if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
}

const root = createRoot('root')

const router = createBrowserRouter(contactsRouter)

function ContactsApp(): JSX.Element {
  return <RouterProvider router={router} />
}

root.render(<ContactsApp />)

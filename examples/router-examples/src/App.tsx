import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { contactListRoute } from '@/contacts/routes'
import './global.css'

export function App(): JSX.Element {
  const router = React.useMemo(
    () => createBrowserRouter(contactListRoute.routes),
    [],
  )

  return <RouterProvider router={router} />
}

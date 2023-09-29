import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { routes } from './contacts-v2'
import './global.css'

export function App(): JSX.Element {
  const router = React.useMemo(() => createBrowserRouter(routes), [])

  return <RouterProvider router={router} />
}

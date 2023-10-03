import { QueryProvider } from '@srtp/query'
import { ErrorFallback, Loading } from '@srtp/ui'
import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { routes } from './contacts-v2'
import './global.css'

export function App(): JSX.Element {
  const router = React.useMemo(() => createBrowserRouter(routes), [])

  return (
    <QueryProvider ErrorFallback={ErrorFallback} suspenseFallback={<Loading />}>
      <RouterProvider router={router} />
    </QueryProvider>
  )
}

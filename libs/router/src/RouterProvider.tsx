import { Boundary, type BoundaryProps } from '@srtp/react'
import React from 'react'
import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
  type RouterProviderProps as ReactRouterProviderProps,
} from 'react-router-dom'

export type RouterProviderProps = Omit<BoundaryProps, 'children'> &
  Omit<ReactRouterProviderProps, 'router'> & {
    routes: Parameters<typeof createBrowserRouter>[0]
  }

export const RouterProvider = ({
  routes,
  ErrorFallback,
  suspenseFallback,
  ...props
}: RouterProviderProps) => {
  const router = React.useMemo(() => createBrowserRouter(routes), [])

  return (
    <Boundary ErrorFallback={ErrorFallback} suspenseFallback={suspenseFallback}>
      <ReactRouterProvider {...props} router={router} />
    </Boundary>
  )
}

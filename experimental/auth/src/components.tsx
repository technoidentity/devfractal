import { isUndefined } from '@srtp/core'
import React, { Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Navigate, type RouteProps } from 'react-router-dom'

import { PageNotFound, defaultErrorElement, fallback } from './common'
import { useIsAuthenticated, useRoles } from './hooks'

type ChildrenProps = { readonly children: React.ReactNode }

type ProtectedRouteExtraProps = {
  readonly navigateTo?: string
  readonly roles?: readonly string[]
}
export type ProtectedRouteProps = RouteProps & ProtectedRouteExtraProps

export const ProtectedRoute = ({
  navigateTo = '/',
  roles,
  element,
}: ProtectedRouteProps) => {
  const userRoles = useRoles()
  const isAuthenticated = useIsAuthenticated()

  if (!isAuthenticated) {
    return <Navigate to={navigateTo} replace />
  }

  if (isUndefined(roles) || roles.find(role => userRoles?.includes(role))) {
    return <Suspense fallback={fallback}>{element}</Suspense>
  }

  // @TODO: should redirect to 'navigateTo'?
  return <PageNotFound />
}

export type ProtectedRouteArgs = RouteObject & ProtectedRouteExtraProps

export const protectedRoute = ({
  navigateTo = '/',
  roles,
  element,
  ...props
}: ProtectedRouteArgs) => ({
  errorElement: defaultErrorElement,
  element: (
    <ProtectedRoute navigateTo={navigateTo} roles={roles} element={element} />
  ),
  ...props,
})

export const publicRoute = ({ element, ...props }: RouteObject) => ({
  errorElement: defaultErrorElement,
  element: <Suspense fallback={fallback}>{element}</Suspense>,
  ...props,
})

export const SignedIn = ({ children }: ChildrenProps) => {
  const isAuthenticated = useIsAuthenticated()

  return isAuthenticated ? <>{children}</> : null
}

export const SignedOut = ({ children }: ChildrenProps) => {
  const isAuthenticated = useIsAuthenticated()

  return isAuthenticated ? null : <>{children}</>
}

export type ProtectedProps = ChildrenProps & {
  readonly roles?: readonly string[]
}

export const Protected = ({ roles, children }: ProtectedProps) => {
  const isAuthenticated = useIsAuthenticated()
  const userRoles = useRoles()

  if (
    isAuthenticated &&
    (isUndefined(roles) || roles.find(role => userRoles?.includes(role)))
  ) {
    return <>{children}</>
  }

  return null
}

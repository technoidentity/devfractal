import { isDefined, isNotNil } from '@srtp/core'
import { useAtomValue, useSetAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import React from 'react'
import invariant from 'tiny-invariant'

import type { AuthUser } from './common'
import {
  authAtom,
  isAuthenticatedAtom,
  nameAtom,
  rolesAtom,
  tokenAtom,
} from './state'

export const useLogin = () => {
  const setAuth = useSetAtom(authAtom)

  return React.useCallback(
    (auth: AuthUser) => {
      setAuth(auth)
    },
    [setAuth],
  )
}

export const useLogout = () => {
  const setAuth = useSetAtom(authAtom)

  return React.useCallback(() => {
    setAuth(RESET)
  }, [setAuth])
}

export const useIsAuthenticated = () => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom)
  return isAuthenticated
}

export const useToken = () => useAtomValue(tokenAtom)

export const useUser = () => {
  const user = useAtomValue(authAtom)
  invariant(isNotNil(user), 'User is undefined')

  return { user }
}

export const useName = () => {
  const name = useAtomValue(nameAtom)
  invariant(isDefined(name), 'Name is undefined')

  return name
}

export const useRoles = () => useAtomValue(rolesAtom)

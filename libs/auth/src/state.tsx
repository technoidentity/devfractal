/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Provider, atom, createStore, useAtomValue } from 'jotai'
import { RESET, atomWithStorage } from 'jotai/utils'
import React from 'react'
import type { z } from 'zod'
import { AuthUser } from './common'
import { isDefined, isNil, isUndefined } from '@srtp/spec'
import type { Nullish } from '@srtp/core'

const authKey = 'auth'

// TODO: need to cache this.
export const getToken = () => {
  const authValue = localStorage.getItem(authKey)

  if (!authValue) {
    return undefined
  }

  return AuthUser.parse(JSON.parse(authValue)).token
}

const authStorageAtom = () => {
  const unsafeAuthAtom = atomWithStorage<Nullish<AuthUser>>(authKey, undefined)

  const AuthStoreValue = AuthUser.nullish()
  type AuthStoreValue = z.infer<typeof AuthStoreValue>

  return atom(
    get => {
      const auth = get(unsafeAuthAtom)
      if (isNil(auth)) {
        return undefined
      }

      return AuthStoreValue.parse(auth)
    },

    (_, set, auth: Nullish<AuthUser> | typeof RESET) => {
      if (auth === RESET || isNil(auth)) {
        set(unsafeAuthAtom, RESET)
      } else {
        set(unsafeAuthAtom, AuthStoreValue.parse(auth))
      }
    },
  )
}

export const authAtom = authStorageAtom()

export const tokenAtom = atom(get => {
  const auth = get(authAtom)

  return auth?.token
})

export const nameAtom = atom(get => {
  const auth = get(authAtom)

  return auth?.name
})

export const rolesAtom = atom(get => {
  const auth = get(authAtom)

  return auth?.role
})

export const isAuthenticatedAtom = atom(get => {
  const auth = get(authAtom)

  return isDefined(auth)
})

const store = createStore()

store.sub(authAtom, () => {
  // eslint-disable-next-line no-console
  console.log('authAtom value changed to', store.get(authAtom))
})
// @TODO: unsubscribe();

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  useAtomValue(authAtom)

  return <Provider store={store}>{children}</Provider>
}

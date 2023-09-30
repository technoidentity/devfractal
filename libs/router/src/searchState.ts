import { cast, type Tail } from '@srtp/core'
import { omap$ } from '@srtp/fn'
import type { Handlers } from '@srtp/react'
import { toSearchParams } from '@srtp/web'
import { produce } from 'immer'
import React from 'react'
import type { z } from 'zod'

import { safeSearch } from './safeHooks'

export type SearchStateActions<Hs extends Handlers<any>> = {
  [A in keyof Hs]: (...args: Tail<Parameters<Hs[A]>>) => void
}

export type SearchStateSearchParams<Hs extends Handlers<any>> = {
  [A in keyof Hs]: (...args: Tail<Parameters<Hs[A]>>) => URLSearchParams
}

// @TODO: support initialValue?
export function searchState<
  Spec extends z.ZodTypeAny,
  Hs extends Handlers<z.infer<Spec>>,
>(spec: Spec, handlers: Hs) {
  const useSearch = safeSearch(spec)

  return function useSearchState(): readonly [
    z.infer<Spec>,
    SearchStateActions<Hs>,
    SearchStateSearchParams<Hs>,
  ] {
    const [search, setSearch] = useSearch()

    const actions = React.useMemo(
      () =>
        omap$(handlers, fn => (...args: any[]) => {
          setSearch(search => {
            fn(search, ...args)
          })
        }),
      [setSearch],
    )

    const searchParams = React.useMemo(
      () =>
        omap$(handlers, fn => (...args: any[]) => {
          const search = cast(spec, args[0])
          const newState = produce(search, (draft: any) => {
            fn(draft, ...args)
          })

          return toSearchParams(newState)
        }),
      [],
    )

    return [search, actions, searchParams] as const
  }
}

import type { Tail } from '@srtp/core'
import { omap$ } from '@srtp/fn'
import type { Handlers } from '@srtp/react'
import React from 'react'
import type { z } from 'zod'

import { safeSearch } from './hooks'

export type SearchActions<
  Spec extends z.ZodTypeAny,
  Hs extends Handlers<z.infer<Spec>>,
> = {
  [A in keyof Hs]: (...args: Tail<Parameters<Hs[A]>>) => void
}

// @TODO: support initialValue?
export function searchState<
  Spec extends z.ZodTypeAny,
  Hs extends Handlers<z.infer<Spec>>,
>(spec: Spec, handlers: Hs) {
  const useSearch = safeSearch(spec)

  return function useSearchState(): readonly [
    z.infer<Spec>,
    SearchActions<Spec, Hs>,
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

    return [search, actions] as const
  }
}

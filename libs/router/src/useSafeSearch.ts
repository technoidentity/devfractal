import { useSearchParams } from 'react-router-dom'

import { cast } from '@srtp/spec'
import type { z } from 'zod'
import React from 'react'
import { entriesToObject } from '@srtp/fn'
import { toSearch } from '@srtp/web'

// const defaultOptions: qs.StringifyOptions = {
//   arrayFormat: 'index',
//   skipNull: true,
//   skipEmptyString: true,
// }

export function safeSearch<Spec extends z.ZodTypeAny>(spec: Spec) {
  return function useSearch(): readonly [
    z.infer<Spec> | undefined,
    (values: z.infer<Spec>) => void,
  ] {
    const [search, set] = useSearchParams()

    const setSearch = React.useCallback(
      (values: z.infer<Spec>) => {
        set(toSearch(cast(spec, values)))
      },
      [set],
    )

    const searchValue = React.useMemo(() => {
      const result = spec.safeParse(entriesToObject(search))
      return result.success ? (result.data as z.infer<Spec>) : undefined
    }, [search])

    return [searchValue, setSearch] as const
  }
}

export function useSafeSearch<Spec extends z.ZodTypeAny>(spec: Spec) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const useSearch = React.useMemo(() => safeSearch(spec), [])
  return useSearch()
}

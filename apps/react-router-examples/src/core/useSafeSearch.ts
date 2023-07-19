import qs from 'query-string'
import { useSearchParams } from 'react-router-dom'

import { cast } from '@srtp/spec'
import type { z } from 'zod'
import React from 'react'

const defaultOptions: qs.StringifyOptions = {
  arrayFormat: 'index',
  skipNull: true,
  skipEmptyString: true,
}

const searchToObject = (search: URLSearchParams) =>
  Object.fromEntries(search.entries())

export function useSafeSearch<Spec extends z.ZodTypeAny>(
  spec: Spec,
  options?: qs.StringifyOptions,
): readonly [z.infer<Spec> | undefined, (values: z.infer<Spec>) => void] {
  const [search, set] = useSearchParams()

  const setSearch = React.useCallback(
    (values: z.infer<Spec>) => {
      set(qs.stringify(cast(spec, values), { ...defaultOptions, ...options }))
    },
    [options, set, spec],
  )

  const searchValue = React.useMemo(() => {
    const result = spec.safeParse(searchToObject(search))
    return result.success ? (result.data as z.infer<Spec>) : undefined
  }, [search, spec])

  return [searchValue, setSearch] as const
}

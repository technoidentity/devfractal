import { useActionData, useLoaderData, useSearchParams } from '@remix-run/react'
import type { Errors } from '@srtp/remix-core'
import qs from 'query-string'
import React from 'react'
import type { z } from 'zod'
import { createErrorsSpec } from './specs'

export function useLatest<T>(v: T) {
  const ref = React.useRef(v)
  React.useEffect(() => {
    ref.current = v
  }, [v])

  return ref
}

export function useSafeLoaderData<Spec extends z.ZodTypeAny>(
  spec: Spec,
): z.infer<Spec> {
  const s = useLatest(spec)
  const data = useLoaderData()

  return React.useMemo(() => s.current.parse(data), [data, s])
}

export function useSafeActionData<Spec extends z.ZodTypeAny>(
  spec: Spec,
): z.infer<Spec> {
  const s = useLatest(spec)
  const data = useActionData()

  return React.useMemo(() => s.current.parse(data), [data, s])
}

function isEmpty(data: object) {
  return data === null || data === undefined || Object.keys(data).length === 0
}

export function useServerErrors<Spec extends z.AnyZodObject>(
  spec: Spec,
): Errors<z.infer<Spec>> {
  const s = useLatest(createErrorsSpec(spec))
  const data = useActionData()

  return React.useMemo(() => {
    //@TODO: currently assuming empty object return from action on success
    if (isEmpty(data)) {
      return data
    }

    return s.current.parse(data)
  }, [data, s])
}

export function useSearch<Spec extends z.AnyZodObject>(
  spec: Spec,
  options?: qs.StringifyOptions,
) {
  const [search, set] = useSearchParams()

  const setSearch = React.useCallback(
    (values: Partial<z.infer<Spec>>) => {
      set(
        qs.stringify(values, {
          arrayFormat: 'index',
          skipNull: true,
          skipEmptyString: true,
          ...options,
        }),
      )
    },
    [options, set],
  )

  return [search, setSearch] as const
}

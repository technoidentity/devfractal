import { useActionData, useLoaderData, useSearchParams } from '@remix-run/react'
import { isEmpty, cast } from '@srtp/core'
import type { FormErrors } from '@srtp/remix-core'
import qs from 'query-string'
import React from 'react'
import type { z } from 'zod'
import { createErrorsSpec } from './errorsSpec'

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

  return React.useMemo(() => cast(s.current, data), [data, s])
}

export function useSafeActionData<Spec extends z.ZodTypeAny>(
  spec: Spec,
): z.infer<Spec> {
  const s = useLatest(spec)
  const data = useActionData()

  return React.useMemo(() => cast(s.current, data), [data, s])
}

export function useServerErrors<Spec extends z.AnyZodObject>(
  spec: Spec,
): FormErrors<z.infer<Spec>> {
  const errSpec = React.useMemo(() => createErrorsSpec(spec), [spec])
  const s = useLatest(errSpec)
  const data: any = useActionData()

  return React.useMemo(() => {
    //@TODO: currently assuming empty object return from action on success
    if (isEmpty(data)) {
      return data
    }

    return cast(s.current, data)
  }, [data, s])
}

const defaultOptions: qs.StringifyOptions = {
  arrayFormat: 'index',
  skipNull: true,
  skipEmptyString: true,
}

export const searchToObject = (search: URLSearchParams) =>
  Object.fromEntries(search.entries())

export function useSearch<Spec extends z.AnyZodObject>(
  spec: Spec,
  options?: qs.StringifyOptions,
): readonly [z.infer<Spec> | undefined, (values: z.infer<Spec>) => void] {
  const [search, set] = useSearchParams()

  const setSearch = React.useCallback(
    (values: z.infer<Spec>) =>
      set(
        qs.stringify(cast(spec, values), {
          ...defaultOptions,
          ...options,
        }),
      ),
    [options, set, spec],
  )

  const searchValue = React.useMemo(() => {
    const result = spec.safeParse(searchToObject(search))
    return result.success ? (result.data as z.infer<Spec>) : undefined
  }, [search, spec])

  return [searchValue, setSearch] as const
}

import { useLoaderData } from '@remix-run/react'
import type { TypedResponse } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import superjson from 'superjson'
import type { SuperJSONResult } from 'superjson/dist/types'

export function sjson<T>(data: T, init?: Parameters<typeof json>[1]) {
  const result = json(superjson.serialize(data), init)

  return result as TypedResponse<SuperJSONResult> & { __srtp__type?: T }
}

type RT<T extends (...args: any) => any> = T extends (...args: any) => infer R
  ? R
  : unknown

export function useGet<F extends (...args: any[]) => any>(): Required<
  Awaited<RT<F>>
>['__srtp__type'] {
  const data = useLoaderData()

  return superjson.deserialize(data)
}

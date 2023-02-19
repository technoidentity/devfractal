import { useLoaderData } from '@remix-run/react'
import type { TypedResponse } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import superjson from 'superjson'
import type { SuperJSONResult } from 'superjson/dist/types'

export function sjson<T>(data: T, init?: Parameters<typeof json>[1]) {
  const result = json(superjson.serialize(data), init)

  return result as TypedResponse<SuperJSONResult> & { __srtp__type?: T }
}

export function useGet<F extends (...args: any[]) => any>(): Required<
  ReturnType<F>
>['__srtp__type'] {
  const data = useLoaderData()

  return superjson.deserialize(data)
}

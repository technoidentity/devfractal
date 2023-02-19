import { useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/server-runtime'
import superjson from 'superjson'

export function sjson<T>(data: T, init?: Parameters<typeof json>[1]): T {
  const result = json(superjson.serialize(data), init)

  return result as T
}
export function useGet<T extends (...args: any[]) => any>(): Awaited<
  ReturnType<T>
> {
  const data = useLoaderData()
  return superjson.deserialize(data)
}

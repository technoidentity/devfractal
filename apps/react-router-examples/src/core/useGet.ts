import type { QueryFunctionContext } from '@tanstack/react-query'
import { QueryClient, useQuery } from '@tanstack/react-query'
import type { LoaderFunctionArgs } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'
import wretch from 'wretch'
import type { z } from 'zod'

type Stringable = string | number | Date | boolean

export type Query = Readonly<{
  key: Stringable[]
  fn?: (args: QueryFunctionContext<readonly Stringable[]>) => Promise<unknown>
}>

export const url = (keys: readonly Stringable[]) => `/api/${keys.join('/')}`

export const sget = (url: string) => wretch(url).get().json()

export function useLoader<Spec extends z.ZodType<any, any>>(q: Query) {
  return (spec: Spec): z.infer<Spec> => {
    const initialData = useLoaderData()

    const queryFn = q.fn ?? (q => sget(url(q.queryKey)))

    const { data } = useQuery({ queryKey: q.key, queryFn, initialData })

    return spec.parse(data)
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      suspense: true,
    },
  },
})

export const loader = (args: LoaderFunctionArgs) => {
  const pathname = new URL(args.request.url).pathname
  const paths = pathname.split('/').filter(Boolean)
  const queryKey =
    Object.keys(args.params).length !== 0 ? [...paths, args.params] : paths

  return queryClient.ensureQueryData({
    queryKey,
    queryFn: () => sget(`/api${pathname}`),
  })
}

// export function query(q: Query) {
//   return { loader(q), useLoader }
// }

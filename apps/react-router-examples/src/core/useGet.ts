import { QueryClient, useQuery } from '@tanstack/react-query'
import type { LoaderFunctionArgs } from 'react-router-dom'
import wretch from 'wretch'
import type { z } from 'zod'

type Stringable = string | number | Date | boolean

export type Query = {
  queryKey: Stringable[]
  queryFn: () => Promise<unknown>
}

export const url = (keys: Stringable[]) => `/ap/${keys.join('/')}}`
export const get = (url: string) => wretch(url).get().json()

export const useGet = <Spec extends z.ZodType<any, any>>(
  spec: Spec,
  queryKey: Stringable[],
): z.infer<Spec> => {
  const queryFn = () => get(url(queryKey))

  const { data } = useQuery({ queryKey, queryFn })

  return spec.parse(data)
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

// export const loader = (query: Query) => queryClient.ensureQueryData(query)

export const loader = (args: LoaderFunctionArgs) => {
  const pathname = new URL(args.request.url).pathname
  const paths = pathname.split('/').filter(Boolean)
  const queryKey =
    Object.keys(args.params).length !== 0 ? [...paths, args.params] : paths

  return queryClient.ensureQueryData({
    queryKey,
    queryFn: () => get(`/api${pathname}`),
  })
}

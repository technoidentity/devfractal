import type { QueryClientProviderProps } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import type { RouterProviderProps } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import invariant from 'tiny-invariant'
import type { ParamMap } from 'urlcat'
import urlcat, { join, query, subst } from 'urlcat'
import { isEmpty } from '@srtp/core'
import wretch from 'wretch'

//   export function useRouterQuery() {
//   const location = useLocation()
//   const pathname = location.pathname
//   const params = useParams()
//   const queryParams = new URLSearchParams(location.search)
//   const query = Object.fromEntries(queryParams.entries())
// }

type Args = {
  baseUrl: string
  routerPath: string
  params: Record<string, string>
  query: ParamMap
}

function defaultQueryKey(args: Omit<Args, 'baseUrl'>): readonly unknown[] {
  const url = subst(args.routerPath, args.params)

  const queryKey = url.split('/').filter(Boolean)

  return isEmpty(args.query) ? queryKey : [...queryKey, args.query]
}

function defaultFetch(url: string) {
  return wretch(url).get().json()
}

function defautlUrl(args: Args): string {
  return join(
    urlcat(args.baseUrl, args.routerPath, args.params),
    '?',
    // @TODO: use query-string instead
    query(args.query),
  )
}

type RouterQueryContext = {
  baseUrl: string
  toUrl(args: Args): string
  toQueryKey: (args: Omit<Args, 'baseUrl'>) => readonly unknown[]
  fetch: (url: string) => Promise<unknown>
}

const RouterQueryContext = React.createContext<RouterQueryContext | undefined>({
  baseUrl: '',
  toQueryKey: defaultQueryKey,
  toUrl: defautlUrl,
  fetch: defaultFetch,
})

export function useRouterContext(): RouterQueryContext {
  const ctx = React.useContext(RouterQueryContext)
  invariant(ctx, 'useRouterContext must be used within a RouterQueryProvider')
  return ctx
}

export type RouterQueryProviderProps = {
  queryProps: QueryClientProviderProps
  routerProps: RouterProviderProps
}

export function RouterQueryProvider(props: RouterQueryProviderProps) {
  return (
    <RouterQueryContext.Provider value={undefined}>
      <QueryClientProvider {...props.queryProps}>
        <RouterProvider {...props.routerProps} />
      </QueryClientProvider>
    </RouterQueryContext.Provider>
  )
}

// export const loader = (args: LoaderFunctionArgs) => {
//   const pathname = new URL(args.request.url).pathname
//   const paths = pathname.split('/').filter(Boolean)
//   const queryKey =
//     Object.keys(args.params).length !== 0 ? [...paths, args.params] : paths

//   return queryClient.ensureQueryData({
//     queryKey,
//     queryFn: () => sget(`/api${pathname}`),
//   })
// }

// export function route(r: RouteObject) {
//   return {
//     ...r,
//     loader:
//   }
// }

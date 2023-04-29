import type { QueryClientProviderProps } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import type { RouterProviderProps } from 'react-router-dom'
import { useParams, useLocation } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import invariant from 'tiny-invariant'
import type { ParamMap } from 'urlcat'
import wretch from 'wretch'

export function useRouterQuery() {
  const location = useLocation()
  const pathname = location.pathname
  const params = useParams()
  const queryParams = new URLSearchParams(location.search)
  const query = Object.fromEntries(queryParams.entries())
}

type Args = {
  params: Record<string, string>
  query: ParamMap
}

type RouterQueryContext = {
  toUrl(args: Args): string
  fetch: (url: string) => Promise<unknown>
}

function defaultFetch(url: string) {
  return wretch(url).get().json()
}

const RouterQueryContext = React.createContext<RouterQueryContext | undefined>(
  undefined,
)

export function useRouterContext(): RouterQueryContext {
  const ctx = React.useContext(RouterQueryContext)
  invariant(ctx, 'useRouterContext must be used within a RouterQueryProvider')
  return ctx
}

export type RouterQueryProviderProps = {
  queryProps: QueryClientProviderProps
  routerProps: RouterProviderProps
  toUrl: (args: Args) => string
  fetch?: (url: string) => Promise<unknown>
}

export function RouterQueryProvider(props: RouterQueryProviderProps) {
  const value = React.useMemo(
    () => ({ toUrl: props.toUrl, fetch: props.fetch ?? defaultFetch }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <RouterQueryContext.Provider value={value}>
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

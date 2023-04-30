import { bool, cast } from '@srtp/spec'
import type {
  QueryClient,
  QueryFunction,
  QueryFunctionContext,
} from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { LoaderFunctionArgs } from 'react-router-dom'
import {
  useLoaderData,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import wretch from 'wretch'
import type { z } from 'zod'

export type ToUrlFn = (qc: QueryFunctionContext) => string

export type QueryFunctionOptions =
  | { queryFn: QueryFunction }
  | { toUrl: ToUrlFn }
  | { base: string }

export type QueryResult = Readonly<{
  queryKey: readonly unknown[]
  queryFn: QueryFunction
}>

export const qfnFromBase = (base: string) =>
  qfnFromUrl(
    ({ queryKey }: QueryFunctionContext) => `${base}/${queryKey.join('/')}`,
  )

export const qfnFromUrl = (urlFn: ToUrlFn) => (qc: QueryFunctionContext) =>
  wretch(urlFn(qc)).get().json()

type Specs<
  Spec extends z.ZodTypeAny,
  ParamsSpec extends z.AnyZodObject,
  SearchSpec extends z.AnyZodObject,
> = Readonly<{
  response: Spec
  params?: ParamsSpec
  search?: SearchSpec
}>

export type QueryFn<Params extends object, Search extends object> = (
  params: Params,
  path: string,
  search: Search,
) => QueryResult
export function loaderQuery<
  ResponseSpec extends z.ZodTypeAny,
  ParamsSpec extends z.AnyZodObject,
  SearchSpec extends z.AnyZodObject,
>(
  queryClient: QueryClient,
  specs: Specs<ResponseSpec, ParamsSpec, SearchSpec>,
  query: QueryFn<z.infer<ParamsSpec>, z.infer<SearchSpec>>,
) {
  const loader = (args: LoaderFunctionArgs) => {
    const url = new URL(args.request.url)
    const searchObj = Object.fromEntries(url.searchParams.entries())

    const search = specs.search ? cast(specs.search, searchObj) : searchObj
    const params = specs.params ? cast(specs.params, args.params) : args.params

    const q = query(params, url.pathname, search)

    return queryClient.ensureQueryData(q)
  }

  function useLoader() {
    const paramsObj = useParams()
    const location = useLocation()
    const [searchObj] = useSearchParams()

    const params = specs.params ? cast(specs.params, paramsObj) : paramsObj
    const search = specs.search ? cast(specs.search, searchObj) : searchObj

    const options = query(params, location.pathname, search)

    const initialData = useLoaderData()
    const result = useQuery(options.queryKey, options.queryFn, { initialData })

    const data: z.infer<ResponseSpec> = cast(specs.response, result.data)
    return [data, result] as const
  }

  return [loader, useLoader] as const
}

function isArray(x: unknown): x is readonly unknown[] {
  return Array.isArray(x)
}

const getQueryFn = (options: QueryFunctionOptions) =>
  'queryFn' in options
    ? options.queryFn
    : 'toUrl' in options
    ? qfnFromUrl(options.toUrl)
    : qfnFromBase(options.base ?? '/api')

export function loaderQueryCreator(
  queryClient: QueryClient,
  options: QueryFunctionOptions,
) {
  const queryFn = getQueryFn(options)

  return function <
    Spec extends z.ZodTypeAny,
    ParamsSpec extends z.AnyZodObject,
    SearchSpec extends z.AnyZodObject,
  >(
    specs: Specs<Spec, ParamsSpec, SearchSpec>,
    query: (
      params: z.infer<ParamsSpec>,
      path: string,
    ) => readonly unknown[] | QueryResult,
  ) {
    return loaderQuery<Spec, ParamsSpec, SearchSpec>(
      queryClient,
      specs,
      (params: z.infer<ParamsSpec>, path: string) => {
        const queryKey = query(params, path)
        return isArray(queryKey) ? { queryFn, queryKey } : queryKey
      },
    )
  }
}

export function remixLoaderQuery<
  Spec extends z.ZodTypeAny,
  ParamsSpec extends z.AnyZodObject,
  SearchSpec extends z.AnyZodObject,
>(
  queryClient: QueryClient,
  specs: Specs<Spec, ParamsSpec, SearchSpec>,
  base: string = '/api',
) {
  const query = (_: z.infer<ParamsSpec>, path: string) => {
    const queryKey = [base, path.split('/').filter(bool)]
    const qfn = qfnFromBase(base)

    return { queryKey, queryFn: qfn }
  }

  return loaderQuery(queryClient, specs, query)
}

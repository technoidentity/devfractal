/* eslint-disable @typescript-eslint/naming-convention */
import { cast } from '@srtp/spec'
import type {
  QueryClient,
  QueryFunction,
  QueryFunctionContext,
} from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { LoaderFunctionArgs } from 'react-router-dom'
import { useLoaderData, useParams } from 'react-router-dom'
import type { z } from 'zod'
import wretch from 'wretch'
import invariant from 'tiny-invariant'

export type QueryFn<Params> = (params: Params) => QueryData | readonly unknown[]

export type UrlFunction = (qc: QueryFunctionContext) => string

export type QueryFunctionOptions = {
  toUrl?: UrlFunction
  base?: string
}

export type QueryData = {
  queryKey: readonly unknown[]
  queryFn?: QueryFunction
}

export const urlFromBase =
  (base: string) =>
  ({ queryKey }: QueryFunctionContext) =>
    `${base}/${queryKey.join('/')}`

export const queryFn = (urlFn: UrlFunction) => (qc: QueryFunctionContext) =>
  wretch(urlFn(qc)).get().json()

function isArray(x: unknown): x is readonly unknown[] {
  return Array.isArray(x)
}

export function loaderQuery<
  Spec extends z.ZodTypeAny,
  ParamsSpec extends z.AnyZodObject,
>(
  queryClient: QueryClient,
  { spec, paramsSpec }: { spec: Spec; paramsSpec?: ParamsSpec },
  query: QueryFn<z.infer<ParamsSpec>>,
) {
  const loader = (args: LoaderFunctionArgs) => {
    const q = query(args.params)
    const options: QueryData = isArray(q) ? { queryKey: q } : q
    return queryClient.ensureQueryData(options)
  }

  function useLoader() {
    const params = useParams()
    const p = paramsSpec ? cast(paramsSpec, params) : params
    const q = query(p)
    const options: QueryData = isArray(q) ? { queryKey: q } : q
    invariant(options.queryFn, 'queryFn is required')

    const result = useQuery(options.queryKey, options.queryFn, {
      initialData: useLoaderData(),
    })
    const data: z.infer<Spec> = cast(spec, result.data)

    return [data, result] as const
  }

  return [loader, useLoader] as const
}

export function loaderQueryCreator(
  queryClient: QueryClient,
  options: QueryFunctionOptions,
) {
  const qfn = options.toUrl
    ? queryFn(options.toUrl)
    : urlFromBase(options.base ?? '/api')

  return <Spec extends z.ZodTypeAny, ParamsSpec extends z.AnyZodObject>(
    specs: { spec: Spec; paramsSpec?: ParamsSpec },
    query: QueryFn<z.infer<ParamsSpec>>,
  ) =>
    loaderQuery<Spec, ParamsSpec>(queryClient, specs, params => ({
      queryFn: qfn,
      ...query(params),
    }))
}

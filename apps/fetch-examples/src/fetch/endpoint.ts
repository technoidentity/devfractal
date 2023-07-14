import type { UnionToIntersection } from '@srtp/core'
import { capitalize } from '@srtp/fn'
import { cast, isObject } from '@srtp/spec'
import {
  useMutation,
  useQuery,
  type UseQueryResult,
} from '@tanstack/react-query'
import qs from 'query-string'
import axios from 'redaxios'
import invariant from 'tiny-invariant'
import type { z } from 'zod'

export type ZodPrimitive = z.ZodString | z.ZodNumber | z.ZodBoolean | z.ZodDate

export type MutationMethod = 'post' | 'put' | 'delete' | 'patch'
export type Method = 'get' | MutationMethod

type Segments = ReadonlyArray<string | Record<string, ZodPrimitive>>

export function paths<const Paths extends Segments>(paths: Paths) {
  return paths
}

export type TypedEndpoint<
  Method extends string,
  Path extends Segments = Segments,
  Request extends z.ZodTypeAny | undefined = undefined,
  Response extends z.ZodTypeAny | undefined = undefined,
> = {
  path: Path
  method: Method
  request?: Request
  response?: Response
}

export type Endpoint<M extends Method = Method> = TypedEndpoint<
  M,
  Segments,
  z.ZodTypeAny,
  z.ZodTypeAny
>

type Endpoints = Record<string, Endpoint>

export function ep<const Ep extends Endpoint>(ep: Ep): Ep {
  return ep
}

export function endpoint<
  Method extends string,
  Path extends Segments,
  Request extends z.ZodTypeAny | undefined,
  Response extends z.ZodTypeAny | undefined,
>(
  path: Path,
  method: Method,
  res: Response,
  req: Request,
): TypedEndpoint<Method, Path, Request, Response> {
  return { path, method, request: req, response: res } as const
}

export function getEndpoint<
  Path extends Segments,
  Search extends z.ZodTypeAny | undefined,
  Response extends z.ZodTypeAny | undefined,
>(
  path: Path,
  res: Response,
  search?: Search,
): TypedEndpoint<'get', Path, Search, Response> {
  return { path, method: 'get', request: search, response: res } as const
}

export function postEndpoint<
  Path extends Segments,
  Body extends z.ZodTypeAny | undefined,
  Response extends z.ZodTypeAny | undefined,
>(
  path: Path,
  res: Response,
  body: Body,
): TypedEndpoint<'post', Path, Body, Response> {
  return { path, method: 'post', request: body, response: res } as const
}

export function putEndpoint<
  Path extends Segments,
  Body extends z.ZodTypeAny | undefined,
  Response extends z.ZodTypeAny | undefined,
>(
  path: Path,
  res: Response,
  body: Body,
): TypedEndpoint<'put', Path, Body, Response> {
  return { path, method: 'put', request: body, response: res } as const
}

export function deleteEndpoint<
  Path extends Segments,
  Response extends z.ZodTypeAny | undefined,
>(
  path: Path,
  res: Response,
): TypedEndpoint<'delete', Path, undefined, Response> {
  return { path, method: 'delete', response: res } as const
}

export function eps<const Eps extends Endpoints>(eps: Eps): Eps {
  return eps
}

export type ParamsFieldsSchema<Path extends Segments> = UnionToIntersection<
  {
    [K in keyof Path]: Path[K] extends string ? never : Path[K]
  }[number]
>

export type ParamsFromFieldSpecs<Paths extends ParamsFieldsSchema<any>> = {
  [K in keyof Paths]: z.infer<Paths[K]>
}

export type Params<Paths extends Segments> = ParamsFromFieldSpecs<
  ParamsFieldsSchema<Paths>
>

// return parameterized route like /users/:id/posts/:postId
export function route(paths: Segments): string {
  const segments = paths.map(e =>
    isObject(e) ? `:${Object.keys(e).join('/:')}` : `${e}`,
  )

  return `/${segments.join('/')}`
}

// return a function that takes params and returns a url
export function flink<const Paths extends Segments>(
  path: Paths,
): (params?: Params<Paths>) => string {
  return params => {
    let url = route(path)
    for (const [k, v] of Object.entries(params || {})) {
      const value = v as string
      url = url.replace(`:${k}`, `${value}`)
    }
    return url
  }
}

// const linkfn = flink([
//   'users',
//   { id: z.number() },
//   'posts',
//   { postId: z.number() },
// ])

// const r = route(['users', { id: z.number() }, 'posts', { postId: z.number() }])

// const url = linkfn({ id: 1, postId: 2 })

// type InferOneKey<
//   Key extends string,
//   Value extends z.ZodTypeAny | undefined = undefined,
// > = {
//   [K in Key as Value extends undefined ? never : K]: z.infer<Value & {}>
// }

export type QueryArgs<Ep extends Endpoint> = (Ep extends { request: unknown }
  ? { query: z.infer<Ep['request'] & object> }
  : { query?: undefined }) &
  (object extends Params<Ep['path']>
    ? { path?: undefined }
    : { path: Params<Ep['path']> })

export function createEndPointQuery<Ep extends Endpoint>(
  endpoint: Ep,
  baseUrl: string,
) {
  return (
    options: QueryArgs<Ep>,
  ): UseQueryResult<z.infer<Ep['response'] & object>> => {
    const path = flink<Ep['path']>(endpoint.path)(options.path)
    const query = options.query
    const url = query
      ? `${baseUrl}${path}?${qs.stringify(query)}`
      : `${baseUrl}${path}`

    const queryKey = query ? [path, query] : [path]

    const queryFn = () => axios.get(url).then(r => r.data)

    const result = useQuery({ queryKey, queryFn })

    invariant(endpoint.response, 'endpoint must have a response schema')

    const data = cast(endpoint.response, result.data)

    return { ...result, data }
  }
}

export type MutationArgs<Ep extends Endpoint> = (Ep extends { request: unknown }
  ? { body: z.infer<NonNullable<Ep['request']>> }
  : { body?: undefined }) &
  (keyof Params<Ep['path']> extends never
    ? { path?: undefined }
    : { path: Params<Ep['path']> })

export function createEndpointMutation<Ep extends Endpoint>(endpoint: Ep) {
  return (options: MutationArgs<Ep>) => {
    const key = flink<Ep['path']>(endpoint.path)(options.path)

    return useMutation({
      mutationFn: () => axios[endpoint.method](key, options.body),
    })
  }
}

export type QueryFn<Ep extends Endpoint> = (
  options: QueryArgs<Ep>,
) => ReturnType<typeof useQuery>

export type MutationFn<Ep extends Endpoint> = (
  options: MutationArgs<Ep>,
) => ReturnType<typeof useMutation>

export type Queries<Ep extends Endpoints> = {
  readonly [K in keyof Ep as Ep[K]['method'] extends 'get'
    ? K
    : never]: QueryFn<Ep[K]>
}

export type Mutations<Ep extends Endpoints> = {
  readonly [K in keyof Ep as Ep[K]['method'] extends 'get'
    ? never
    : K]: MutationFn<Ep[K]>
}

export type Hookify<R extends Record<string, unknown>> = {
  readonly [K in keyof R as `use${Capitalize<K & string>}`]: R[K]
}

export type EndpointApi<Ep extends Endpoints> = Hookify<Queries<Ep>> &
  Hookify<Mutations<Ep>>

export function createEndpointApi<Eps extends Endpoints>(
  endpoints: Eps,
  baseUrl: string = '/api',
): EndpointApi<Eps> {
  const queries: any = Object.fromEntries(
    Object.entries(endpoints)
      .filter(([, endpoint]) => endpoint.method === 'get')
      .map(([key, endpoint]) => [
        `use${capitalize(key)}`,
        createEndPointQuery(endpoint, baseUrl),
      ]),
  )

  const mutations: any = Object.fromEntries(
    Object.entries(endpoints)
      .filter(([, endpoint]) => endpoint.method !== 'get')
      .map(([key, endpoint]) => [
        `use${capitalize(key)}`,
        createEndpointMutation(endpoint),
      ]),
  )

  return { ...queries, ...mutations }
}

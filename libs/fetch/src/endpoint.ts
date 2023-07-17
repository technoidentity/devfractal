import type { UnionToIntersection } from '@srtp/core'
import { isObject } from '@srtp/spec'
import invariant from 'tiny-invariant'
import { z } from 'zod'

export type ZodPrimitive = z.ZodString | z.ZodNumber | z.ZodBoolean | z.ZodDate

export type MutationMethod = 'post' | 'put' | 'delete' | 'patch'
export type QueryMethod = 'get'
export type HttpMethod = QueryMethod | MutationMethod

export type QueryEndpointBase = EndpointBase<'get'>
export type PostEndpointBase = EndpointBase<'post'>
export type PutEndpointBase = EndpointBase<'put'>
export type DeleteEndpointBase = EndpointBase<'delete'>
export type PatchEndpointBase = EndpointBase<'patch'>

export type MutationEndpointBase =
  | PostEndpointBase
  | PutEndpointBase
  | DeleteEndpointBase
  | PatchEndpointBase

export type GetEpResponse<Ep extends EndpointBase> = z.infer<
  Ep['response'] & object
>
export type GetEpRequest<Ep extends EndpointBase> = z.infer<
  Ep['request'] & object
>

type Segments = ReadonlyArray<string | Record<string, ZodPrimitive>>

export function path<const Path extends Segments>(path: Path) {
  return path
}

export type Endpoint<
  Method extends HttpMethod,
  Path extends Segments,
  Request extends z.ZodTypeAny,
  Response extends z.ZodTypeAny,
> = {
  path: Path
  method: Method
  request?: Request
  response?: Response
}

export type EndpointBase<M extends HttpMethod = HttpMethod> = Endpoint<
  M,
  Segments,
  z.ZodTypeAny,
  z.ZodTypeAny
>

export function endpoint<const Ep extends EndpointBase>(ep: Ep): Ep {
  return ep
}

export type EndpointsBase<M extends HttpMethod = HttpMethod> = Record<
  string,
  EndpointBase<M>
>

export function ep<
  Method extends HttpMethod,
  Path extends Segments,
  Request extends z.ZodTypeAny,
  Response extends z.ZodTypeAny,
>(
  path: Path,
  method: Method,
  res: Response,
  req: Request,
): Endpoint<Method, Path, Request, Response> {
  return { path, method, request: req, response: res } as const
}

export function eps<const Eps extends EndpointsBase>(eps: Eps): Eps {
  return eps
}

export function epGet<
  Path extends Segments,
  Search extends z.ZodTypeAny,
  Response extends z.ZodTypeAny,
>(
  path: Path,
  res: Response,
  search: Search,
): Endpoint<'get', Path, Search, Response>

export function epGet<Path extends Segments, Response extends z.ZodTypeAny>(
  path: Path,
  res: Response,
): Endpoint<'get', Path, z.ZodUndefined, Response>

export function epGet<
  Path extends Segments,
  Search extends z.ZodTypeAny,
  Response extends z.ZodTypeAny,
>(
  path: Path,
  res: Response,
  search?: Search,
): Endpoint<'get', Path, Search, Response> {
  return {
    path,
    method: 'get',
    request: search ?? z.undefined(),
    response: res,
  } as const as any
}

export function epPost<
  Path extends Segments,
  Body extends z.ZodTypeAny,
  Response extends z.ZodTypeAny,
>(
  path: Path,
  res: Response,
  body: Body,
): Endpoint<'post', Path, Body, Response> {
  return { path, method: 'post', request: body, response: res } as const
}

export function epPut<
  Path extends Segments,
  Body extends z.ZodTypeAny,
  Response extends z.ZodTypeAny,
>(
  path: Path,
  res: Response,
  body: Body,
): Endpoint<'put', Path, Body, Response> {
  return { path, method: 'put', request: body, response: res } as const
}

export function epPatch<
  Path extends Segments,
  Body extends z.ZodTypeAny,
  Response extends z.ZodTypeAny,
>(
  path: Path,
  body: Body,
  res: Response,
): Endpoint<'patch', Path, Body, Response> {
  return { path, method: 'patch', request: body, response: res } as const
}

export function epDelete<Path extends Segments, Response extends z.ZodTypeAny>(
  path: Path,
  res: Response,
): Endpoint<'delete', Path, z.ZodUndefined, Response>

export function epDelete<Path extends Segments>(
  path: Path,
): Endpoint<'delete', Path, z.ZodUndefined, z.ZodUndefined>

export function epDelete<Path extends Segments, Response extends z.ZodTypeAny>(
  path: Path,
  res?: Response,
): Endpoint<'delete', Path, z.ZodUndefined, Response> {
  return {
    path,
    method: 'delete',
    request: z.undefined(),
    response: res ?? z.undefined(),
  } as const as any
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
export function route<Path extends Segments>(path: Path): string {
  const segments = path.map(e =>
    isObject(e) ? `:${Object.keys(e).join('/:')}` : `${e}`,
  )

  return `/${segments.join('/')}`
}

// return a function that takes params and returns a url
export function linkfn<const Paths extends Segments>(
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

export function pathsfn<const Paths extends Segments>(
  path: Paths,
): (params?: Params<Paths>) => string[] {
  return params => {
    const segments = path.flatMap(e =>
      isObject(e) ? Object.keys(e).map(e => `:${e}`) : e,
    )

    const paths = segments.map(e => {
      if (e.startsWith(':')) {
        const key = e.slice(1)
        invariant(params, `params does not contain ${key}`)

        const value = (params as any)[key]
        invariant(value, `params does not contain ${key}`)
        return value
      }
      return e
    })

    return paths
  }
}

export const keysfn =
  <const Paths extends Segments>(path: Paths) =>
  (params: Params<Paths>) =>
    linkfn(path)(params).split('/')

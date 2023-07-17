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

export type GetEpParams<Ep extends EndpointBase> = Params<Ep['path']>

export type PathBase = ReadonlyArray<string | Record<string, ZodPrimitive>>

export function path<const Path extends PathBase>(path: Path) {
  return path
}

export type GetPathArg<Ep extends EndpointBase> = object extends Params<
  Ep['path']
>
  ? { path?: undefined }
  : { path: Params<Ep['path']> }

export type GetRequestArg<Ep extends EndpointBase> = Ep extends Ep['request']
  ? { request?: undefined }
  : { request: z.infer<Ep['request'] & object> }

export type Endpoint<
  Method extends HttpMethod,
  Path extends PathBase,
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
  PathBase,
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
  Path extends PathBase,
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
  Path extends PathBase,
  Search extends z.ZodTypeAny,
  Response extends z.ZodTypeAny,
>(
  path: Path,
  res: Response,
  search: Search,
): Endpoint<'get', Path, Search, Response>

export function epGet<Path extends PathBase, Response extends z.ZodTypeAny>(
  path: Path,
  res: Response,
): Endpoint<'get', Path, z.ZodUndefined, Response>

export function epGet<
  Path extends PathBase,
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
  Path extends PathBase,
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
  Path extends PathBase,
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
  Path extends PathBase,
  Body extends z.ZodTypeAny,
  Response extends z.ZodTypeAny,
>(
  path: Path,
  body: Body,
  res: Response,
): Endpoint<'patch', Path, Body, Response> {
  return { path, method: 'patch', request: body, response: res } as const
}

export function epDelete<Path extends PathBase, Response extends z.ZodTypeAny>(
  path: Path,
  res: Response,
): Endpoint<'delete', Path, z.ZodUndefined, Response>

export function epDelete<Path extends PathBase>(
  path: Path,
): Endpoint<'delete', Path, z.ZodUndefined, z.ZodUndefined>

export function epDelete<Path extends PathBase, Response extends z.ZodTypeAny>(
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

export type ParamsFieldsSchema<Path extends PathBase> = UnionToIntersection<
  {
    [K in keyof Path]: Path[K] extends string ? never : Path[K]
  }[number]
>

export type ParamsFromFieldSpecs<Paths extends ParamsFieldsSchema<any>> = {
  [K in keyof Paths]: z.infer<Paths[K]>
}

export type Params<Paths extends PathBase> = ParamsFromFieldSpecs<
  ParamsFieldsSchema<Paths>
>

const orderedEntries = <T extends object>(obj: T) =>
  Object.entries(obj).sort(([a], [b]) => a.localeCompare(b))

const orderedKeys = <T extends object>(obj: T) =>
  orderedEntries(obj).map(([k]) => k)

// return parameterized route like /users/:id/posts/:postId
export function route<Path extends PathBase>(path: Path): string {
  const segments = path.map(e =>
    isObject(e) ? `:${orderedKeys(e).join('/:')}` : `${e}`,
  )

  return `/${segments.join('/')}`
}

// return a function that takes params and returns a url
export function linkfn<const Paths extends PathBase>(
  path: Paths,
): (params?: Params<Paths>) => string {
  return params => {
    let url = route(path)
    for (const [k, v] of Object.entries(params || {})) {
      const value = v as string
      url = url.replace(`:${k}`, `${value}`)
    }
    invariant(!url.includes(':'), `url ${url} still contains :`)
    return url
  }
}

export const keysfn = <const Path extends PathBase>(
  path: Path,
  params: Params<Path>,
) => {
  const keys: string[] = []
  for (const segment of path) {
    if (isObject(segment)) {
      const values = orderedEntries(segment).map(([key, value]) => {
        const r = value.parse((params as any)[key])
        return r != null ? r.toString() : ''
      })
      keys.push(...values)
    } else {
      keys.push(segment)
    }
  }

  return keys.filter(k => k !== '')
}

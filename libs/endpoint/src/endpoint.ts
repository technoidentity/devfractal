import type { Prettify, UnionToIntersection } from '@srtp/core'
import { ZodFundamental } from '@srtp/spec'
import { z } from 'zod'

export const HttpMethod = z.enum(['get', 'post', 'put', 'delete', 'patch'])
export type HttpMethod = z.infer<typeof HttpMethod>

export type PathBase = ReadonlyArray<string | Record<string, ZodFundamental>>

export const Endpoint = <
  ReqSpec extends z.ZodTypeAny,
  ResSpec extends z.ZodTypeAny,
>(
  request: ReqSpec,
  response: ResSpec,
) =>
  z.object({
    path: z.array(z.union([z.string(), z.record(z.string(), ZodFundamental)])),
    method: HttpMethod,
    request,
    response,
  })

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

export type EndpointRecordBase<M extends HttpMethod = HttpMethod> = Record<
  string,
  EndpointBase<M>
>

// @TODO: handle undefined differently
export type GetEpRequest<Ep extends EndpointBase> = z.infer<
  Ep['request'] & object
>

export type GetEpResponse<Ep extends EndpointBase> = z.infer<
  Ep['response'] & object
>

export type GetEpPath<Ep extends EndpointBase> = Params<Ep['path']>

export type GetParamsArg<Ep extends EndpointBase> = object extends Params<
  Ep['path']
>
  ? { params?: undefined }
  : { params: Params<Ep['path']> }

export type GetRequestArg<Ep extends EndpointBase> = Ep extends Ep['request']
  ? { request?: undefined }
  : { request: z.infer<Ep['request'] & object> }

export type ParamsRawSchema<Path extends PathBase> = UnionToIntersection<
  {
    [K in keyof Path]: Path[K] extends string ? never : Path[K]
  }[number]
>

export type ParamsFromFieldSpecs<Paths extends ParamsRawSchema<any>> =
  Prettify<{ [K in keyof Paths]: z.infer<Paths[K]> }>

export type Params<Paths extends PathBase> = ParamsFromFieldSpecs<
  ParamsRawSchema<Paths>
>

export function path<const Path extends PathBase>(path: Path) {
  return path
}

export function endpoint<const Ep extends EndpointBase>(ep: Ep): Ep {
  return ep
}

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

export function eps<const Eps extends EndpointRecordBase>(eps: Eps): Eps {
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

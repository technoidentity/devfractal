import { z } from 'zod'
import { ZodPrimitive } from '../spec'
import type { UnionToIntersection } from '../types'

export const HttpMethod = z.enum(['get', 'post', 'put', 'delete', 'patch'])
export type HttpMethod = z.infer<typeof HttpMethod>

type ZodPath = Record<string, ZodPrimitive>
export type PathBase = ReadonlyArray<string | ZodPath>

export const PathSpec = z.array(
  z.union([z.string(), z.record(z.string(), ZodPrimitive)]),
)
export type PathSpec = z.infer<typeof PathSpec>

export const endpointSpec = <
  ReqSpec extends z.ZodTypeAny,
  ResSpec extends z.ZodTypeAny,
>(
  request: ReqSpec,
  response: ResSpec,
) =>
  z.object({
    path: PathSpec,
    method: HttpMethod,
    request,
    response,
  })

export type Endpoint<
  Method extends HttpMethod,
  Path extends PathBase,
  Request extends z.ZodTypeAny,
  Response extends z.ZodTypeAny,
> = Readonly<{
  path: Path
  method: Method
  request: Request
  response: Response
}>

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

// export type ParamsRawSchema<Path extends PathBase> = UnionToIntersection<
//   {
//     [K in keyof Path]: Path[K] extends string ? never : Path[K]
//   }[number]
// >

export type ParamsRawSpec<Path extends PathBase> = UnionToIntersection<
  Exclude<Path[number], string>
>

type ParamsFromRawSpec<Paths extends ParamsRawSpec<any>> = {
  readonly [K in keyof Paths]: z.infer<Paths[K]>
}

export type Params<Paths extends PathBase> = ParamsFromRawSpec<
  ParamsRawSpec<Paths>
>

// export type GetEpRequestSpec<Ep extends EndpointBase> =
//   Ep['request'] extends object ? NonNullable<Ep['request']> : z.ZodUndefined

// export type GetEpRequest<Ep extends EndpointBase> = z.infer<
//   GetEpRequestSpec<Ep>
// >

// export type GetEpResponseSpec<Ep extends EndpointBase> =
//   Ep['response'] extends object ? NonNullable<Ep['response']> : z.ZodUndefined

// export type GetEpResponse<Ep extends EndpointBase> = z.infer<
//   GetEpResponseSpec<Ep>
// >

export type GetEpRequest<Ep extends EndpointBase> = z.infer<Ep['request']>
export type GetEpResponse<Ep extends EndpointBase> = z.infer<Ep['response']>

export type GetRequestArg<Ep extends EndpointBase> =
  Ep['request'] extends z.ZodUndefined
    ? { request?: undefined }
    : { request: z.infer<Ep['request']> }

export type GetParamsArg<Ep extends EndpointBase> = keyof Params<
  Ep['path']
> extends never
  ? Readonly<{ params?: undefined }>
  : Readonly<{ params: Params<Ep['path']> }>

export function path<const Path extends PathBase>(path: Path) {
  return path
}

export function endpoint<const Ep extends EndpointBase>(ep: Ep): Ep {
  return ep
}

export function ep<
  Method extends HttpMethod,
  const Path extends PathBase,
  Request extends z.ZodTypeAny,
  Response extends z.ZodTypeAny,
>(
  path: Path,
  method: Method,
  req: Request,
  res: Response,
): Endpoint<Method, Path, Request, Response> {
  return { path, method, request: req, response: res } as const
}

export function eps<const Eps extends EndpointRecordBase>(eps: Eps): Eps {
  return eps
}

export function epGet<
  const Path extends PathBase,
  Search extends z.ZodTypeAny,
  Response extends z.ZodTypeAny,
>(
  path: Path,
  res: Response,
  search: Search,
): Endpoint<'get', Path, Search, Response>

export function epGet<
  const Path extends PathBase,
  Response extends z.ZodTypeAny,
>(path: Path, res: Response): Endpoint<'get', Path, z.ZodUndefined, Response>

/**
 * Creates an endpoint for a GET request.
 *
 * @template Path - The path of the endpoint.
 * @template Search - The search parameters of the endpoint.
 * @template Response - The response of the endpoint.
 * @param {Path} path - The path of the endpoint.
 * @param {Response} res - The response of the endpoint.
 * @param {Search} [search] - The search parameters of the endpoint.
 * @returns {Endpoint<'get', Path, Search, Response>} - The endpoint for a GET request.
 */
export function epGet<
  const Path extends PathBase,
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

/**
 * Creates an endpoint for a POST request.
 *
 * @template Path - The path of the endpoint.
 * @template Body - The body of the endpoint.
 * @template Response - The response of the endpoint.
 * @param {Path} path - The path of the endpoint.
 * @param {Response} res - The response of the endpoint.
 * @param {Body} body - The body of the endpoint.
 * @returns {Endpoint<'post', Path, Body, Response>} - The endpoint for a POST request.
 */
export function epPost<
  const Path extends PathBase,
  Body extends z.ZodTypeAny,
  Response extends z.ZodTypeAny,
>(
  path: Path,
  body: Body,
  res: Response,
): Endpoint<'post', Path, Body, Response> {
  return { path, method: 'post', request: body, response: res } as const
}

/**
 * Creates an endpoint for a PUT request.
 *
 * @template Path - The path of the endpoint.
 * @template Body - The body of the endpoint.
 * @template Response - The response of the endpoint.
 * @param {Path} path - The path of the endpoint.
 * @param {Response} res - The response of the endpoint.
 * @param {Body} body - The body of the endpoint.
 * @returns {Endpoint<'put', Path, Body, Response>} - The endpoint for a PUT request.
 */

// export const emptyResponse = nullish()

export function epPut<
  const Path extends PathBase,
  Body extends z.ZodTypeAny,
  Response extends z.ZodTypeAny,
>(path: Path, body: Body, res: Response): Endpoint<'put', Path, Body, Response>

export function epPut<const Path extends PathBase, Body extends z.ZodTypeAny>(
  path: Path,
  body: Body,
): Endpoint<'put', Path, Body, z.ZodUnknown>

export function epPut<
  const Path extends PathBase,
  Body extends z.ZodTypeAny,
  Response extends z.ZodTypeAny,
>(
  path: Path,
  body: Body,
  res?: Response,
): Endpoint<'put', Path, Body, Response> {
  return {
    path,
    method: 'put',
    request: body,
    response: res ?? z.unknown,
  } as const as any
}

export function epPatch<
  const Path extends PathBase,
  Body extends z.ZodTypeAny,
  Response extends z.ZodTypeAny,
>(
  path: Path,
  body: Body,
  res: Response,
): Endpoint<'patch', Path, Body, Response>

export function epPatch<const Path extends PathBase, Body extends z.ZodTypeAny>(
  path: Path,
  body: Body,
): Endpoint<'patch', Path, Body, z.ZodUnknown>

/**
 * Creates an endpoint for a PATCH request.
 *
 * @template Path - The path of the endpoint.
 * @template Body - The body of the endpoint.
 * @template Response - The response of the endpoint.
 * @param {Path} path - The path of the endpoint.
 * @param {Body} body - The body of the endpoint.
 * @param {Response} res - The response of the endpoint.
 * @returns {Endpoint<'patch', Path, Body, Response>} - The endpoint for a PATCH request.
 */
export function epPatch<
  const Path extends PathBase,
  Body extends z.ZodTypeAny,
  Response extends z.ZodTypeAny,
>(
  path: Path,
  body: Body,
  res?: Response,
): Endpoint<'patch', Path, Body, Response> {
  return {
    path,
    method: 'patch',
    request: body,
    response: res ?? z.unknown(),
  } as const as any
}

export function epDelete<
  const Path extends PathBase,
  Response extends z.ZodTypeAny,
>(path: Path, res: Response): Endpoint<'delete', Path, z.ZodUndefined, Response>

export function epDelete<const Path extends PathBase>(
  path: Path,
): Endpoint<'delete', Path, z.ZodUndefined, z.ZodUnknown>

/**
 * Creates an endpoint for a DELETE request.
 *
 * @template Path - The path of the endpoint.
 * @template Response - The response of the endpoint.
 * @param {Path} path - The path of the endpoint.
 * @param {Response} [res] - The response of the endpoint.
 * @returns {Endpoint<'delete', Path, z.ZodUndefined, Response>} - The endpoint for a DELETE request.
 */
export function epDelete<
  const Path extends PathBase,
  Response extends z.ZodTypeAny,
>(
  path: Path,
  res?: Response,
): Endpoint<'delete', Path, z.ZodUndefined, Response> {
  return {
    path,
    method: 'delete',
    request: z.undefined(),
    response: res ?? z.unknown(),
  } as const as any
}

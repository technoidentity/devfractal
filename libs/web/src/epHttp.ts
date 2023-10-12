import type {
  EndpointBase,
  EndpointRecordBase,
  GetEpResponse,
  If,
  IsNonEmptyObject,
  Params,
} from '@srtp/core'
import { cast, isNotNilSpec, paramsSpec, route } from '@srtp/core'
import invariant from 'tiny-invariant'
import type { z } from 'zod'

import {
  axios,
  createAxios,
  type BaseFetchOptions,
  type BaseUrlOrAxios,
  type FetchResult,
} from './axios'
import { toPath } from './url'

// @TODO: can this be safer?
export type EpHttpArgsBase = {
  options?: BaseFetchOptions
  params?: unknown
  request?: unknown
}

export type ApiCallsArgs<Ep extends EndpointBase> = EpHttpArgsBase & {
  ep: Ep
  baseUrlOrAxios?: BaseUrlOrAxios
}

export async function epAxios<Ep extends EndpointBase>({
  ep,
  baseUrlOrAxios,
  params,
  request,
  options,
}: ApiCallsArgs<Ep>): FetchResult<GetEpResponse<Ep>> {
  const fetch = createAxios(baseUrlOrAxios)
  const path = route(ep.path)

  const url = params ? toPath(path, cast(paramsSpec(ep.path), params)) : path

  const reqBody = isNotNilSpec(ep.request)
    ? { body: cast(ep.request, request) }
    : request
    ? { body: request }
    : {}

  const method = ep.method

  const { data: resBody, response } = await fetch({
    url,
    ...options,
    method,
    ...reqBody,
  })

  const data = ep.response ? cast(ep.response, resBody) : resBody

  return { data, response } as const
}

export type EpHttpArgs<Ep extends EndpointBase> = {
  options?: BaseFetchOptions
} & If<IsNonEmptyObject<Params<Ep['path']>>, { params: unknown }, object> &
  If<IsNonEmptyObject<z.infer<Ep['request']>>, { request: unknown }, object>

export type EpHttpResult<Eps extends EndpointRecordBase> = {
  [K in keyof Eps]: (
    args: EpHttpArgs<Eps[K]>,
  ) => FetchResult<GetEpResponse<Eps[K]>>
}

export function createEpHttp<Eps extends EndpointRecordBase>(
  eps: Eps,
  baseUrlOrAxios: BaseUrlOrAxios = axios,
): EpHttpResult<Eps> {
  const api = {} as any

  for (const [key, ep] of Object.entries(eps)) {
    api[key] = (args: EpHttpArgsBase) => {
      return epAxios({ ...args, ep, baseUrlOrAxios } as ApiCallsArgs<any>)
    }
  }

  return api
}

export type EpsGetAllResult<Eps extends EndpointRecordBase> = {
  data: { [K in keyof Eps]: GetEpResponse<Eps[K]> }
  response: { [K in keyof Eps]: Response }
}

// no scheduling here, just a simple Promise.all
export async function epsGetAll<Eps extends EndpointRecordBase>(
  eps: Eps,
  args: EpHttpArgsBase, // same args for all calls, both params and request
  baseUrlOrAxios: BaseUrlOrAxios = axios,
): Promise<EpsGetAllResult<Eps>> {
  const api = {} as any

  const fetch = createAxios(baseUrlOrAxios)

  for (const [key, ep] of Object.entries(eps)) {
    invariant(ep.method === 'get', 'epsGetAll only supports GET endpoints')
    api[key] = epAxios({ ...args, ep, baseUrlOrAxios: fetch })
  }

  const all = await Promise.all(Object.values(api))

  const data = Object.fromEntries(
    Object.keys(eps).map((key, i) => [key, (all as any)[i].data]),
  )

  const responses = Object.fromEntries(
    Object.keys(eps).map((key, i) => [key, (all as any)[i].response]),
  )

  return { data, responses } as any
}

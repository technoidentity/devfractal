import type {
  EndpointBase,
  EndpointRecordBase,
  GetEpResponse,
  Iff,
  IsNonEmptyObject,
  Params,
} from '@srtp/core'
import { cast, isNotNilSpec, paramsSpec, route } from '@srtp/core'

import invariant from 'tiny-invariant'
import type { z } from 'zod'
import {
  createFetch,
  fetch$,
  type BaseFetchOptions,
  type BaseUrlOrFetch,
} from './fetch$'
import { toPath } from './url'

// @TODO: can this be safer?
export type EpHttpArgsBase = {
  options?: BaseFetchOptions
  params?: unknown
  request?: unknown
}

export type ApiCallsArgs<Ep extends EndpointBase> = EpHttpArgsBase & {
  ep: Ep
  baseUrlOrFetch?: BaseUrlOrFetch
}

export async function epAxios<Ep extends EndpointBase>({
  ep,
  baseUrlOrFetch,
  params,
  request,
  options,
}: ApiCallsArgs<Ep>): Promise<readonly [GetEpResponse<Ep>, Response]> {
  const fetch = createFetch(baseUrlOrFetch)
  const path = route(ep.path)

  const url = params ? toPath(path, cast(paramsSpec(ep.path), params)) : path

  const reqBody = isNotNilSpec(ep.request)
    ? { body: cast(ep.request, request) }
    : request
    ? { body: request }
    : {}

  const method = ep.method

  const [resBody, response] = await fetch(url, {
    ...options,
    method,
    ...reqBody,
  })

  const responseData = ep.response ? cast(ep.response, resBody) : resBody

  return [responseData, response] as const
}

export type EpHttpArgs<Ep extends EndpointBase> = {
  options?: BaseFetchOptions
} & Iff<IsNonEmptyObject<Params<Ep['path']>>, { params: unknown }> &
  Iff<IsNonEmptyObject<z.infer<Ep['request']>>, { request: unknown }>

export type EpHttpResult<Eps extends EndpointRecordBase> = {
  [K in keyof Eps]: (
    args: EpHttpArgs<Eps[K]>,
  ) => Promise<readonly [GetEpResponse<Eps[K]>, Response]>
}

export function createEpHttp<Eps extends EndpointRecordBase>(
  eps: Eps,
  baseUrlOrFetch: BaseUrlOrFetch = fetch$,
): EpHttpResult<Eps> {
  const api = {} as any

  for (const [key, ep] of Object.entries(eps)) {
    api[key] = (args: EpHttpArgsBase) => {
      return epAxios({ ...args, ep, baseUrlOrFetch } as ApiCallsArgs<any>)
    }
  }

  return api
}

export type EpsGetAllResult<Eps extends EndpointRecordBase> = [
  { [K in keyof Eps]: GetEpResponse<Eps[K]> },
  { [K in keyof Eps]: Response },
]

// no scheduling here, just a simple Promise.all
export async function epsGetAll<Eps extends EndpointRecordBase>(
  eps: Eps,
  args: EpHttpArgsBase, // same args for all calls, both params and request
  baseUrlOrFetch: BaseUrlOrFetch = fetch$,
): Promise<EpsGetAllResult<Eps>> {
  const api = {} as any

  const fetch = createFetch(baseUrlOrFetch)

  for (const [key, ep] of Object.entries(eps)) {
    invariant(ep.method === 'get', 'epsGetAll only supports GET endpoints')
    api[key] = epAxios({ ...args, ep, baseUrlOrFetch: fetch })
  }

  const all = await Promise.all(Object.values(api))

  const data = Object.fromEntries(
    Object.keys(eps).map((key, i) => [key, (all as any)[i][0]]),
  )

  const responses = Object.fromEntries(
    Object.keys(eps).map((key, i) => [key, (all as any)[i][1]]),
  )

  return [data, responses] as any
}

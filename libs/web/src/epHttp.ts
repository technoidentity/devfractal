import type {
  EndpointBase,
  EndpointRecordBase,
  GetEpResponse,
  GetParamsArg,
  GetRequestArg,
} from '@srtp/core'
import { route } from '@srtp/core'
import { cast } from '@srtp/core'

import { fetch$, type BaseFetchOptions } from './fetch$'
import { toPath } from './url'

type EpHttpArgs<Ep extends EndpointBase> = GetParamsArg<Ep> &
  GetRequestArg<Ep> & { options?: BaseFetchOptions }

type ApiCallsArgs<Ep extends EndpointBase> = EpHttpArgs<Ep> & {
  ep: Ep
  axios: typeof fetch$
}

async function epAxios<Ep extends EndpointBase>({
  ep,
  axios,
  params,
  request,
  options,
}: ApiCallsArgs<Ep>): Promise<readonly [GetEpResponse<Ep>, Response]> {
  const path = route(ep.path)
  const ps = params ?? {}
  const url = params ? toPath(path, ps) : path
  const reqBody = ep.request ? cast(ep.request, request) : request
  const method = ep.method

  const [resBody, response] = await axios(url, {
    ...options,
    method,
    body: reqBody,
  })

  const responseData = ep.response ? cast(ep.response, resBody) : resBody

  return [responseData, response] as const
}

export type EpHttpResult<Eps extends EndpointRecordBase> = {
  [K in keyof Eps]: (
    args: EpHttpArgs<Eps[K]>,
  ) => Promise<readonly [GetEpResponse<Eps[K]>, Response]>
}

export function createEpHttp<Eps extends EndpointRecordBase>(
  eps: Eps,
  axios: typeof fetch$ = fetch$,
): EpHttpResult<Eps> {
  const api = {} as any

  for (const [key, ep] of Object.entries(eps)) {
    api[key] = (args: EpHttpArgs<any>) => {
      return epAxios({ ...args, ep, axios } as ApiCallsArgs<any>)
    }
  }

  return api
}

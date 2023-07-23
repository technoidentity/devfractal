import type {
  EndpointBase,
  EndpointRecordBase,
  GetEpResponse,
  GetParamsArg,
  GetRequestArg,
} from '@srtp/endpoint'
import { route } from '@srtp/endpoint'
import { cast } from '@srtp/spec'
import { baseFetch, type BaseFetchOptions } from './baseFetch'
import { toPath } from './url'

type EpHttpArgs<Ep extends EndpointBase> = GetParamsArg<Ep> &
  GetRequestArg<Ep> & { options?: BaseFetchOptions }

type ApiCallsArgs<Ep extends EndpointBase> = EpHttpArgs<Ep> & {
  ep: Ep
  axios: typeof baseFetch
}

async function apiCall<Ep extends EndpointBase>({
  ep,
  axios,
  params,
  request,
  options,
}: ApiCallsArgs<Ep>): Promise<readonly [GetEpResponse<Ep>, Response]> {
  const path = route(ep.path)
  const ps = params ?? {}
  const url = params ? toPath(path, ps) : path
  const reqBody = ep.request ? (ep.request, request) : request
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

export function createEpApi<Eps extends EndpointRecordBase>(
  eps: Eps,
  axios: typeof baseFetch = baseFetch,
): EpHttpResult<Eps> {
  const api = {} as any

  for (const [key, ep] of Object.entries(eps)) {
    api[key] = (args: EpHttpArgs<any>) => {
      return apiCall({ ...args, ep, axios } as ApiCallsArgs<any>)
    }
  }

  return api
}

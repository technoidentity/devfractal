import { cast } from '@srtp/spec'
import axios, { type Options as RedaxiosOptions, type Response } from 'redaxios'
import { subst } from 'urlcat'
import type {
  EndpointBase,
  EndpointRecordBase,
  GetEpResponse,
  GetPathArg,
  GetRequestArg,
} from './endpoint'
import { route } from './epFn'

type AxiosInstance = ReturnType<typeof axios.create>

type EpHttpArgs<Ep extends EndpointBase> = GetPathArg<Ep> &
  GetRequestArg<Ep> & { options?: Omit<RedaxiosOptions, 'url'> }

type ApiCallsArgs<Ep extends EndpointBase> = EpHttpArgs<Ep> & {
  ep: Ep
  axios: AxiosInstance
}

async function apiCall<Ep extends EndpointBase>({
  ep,
  axios,
  path: params,
  request,
  options,
}: ApiCallsArgs<Ep>): Promise<
  readonly [GetEpResponse<Ep>, Response<GetEpResponse<Ep>>]
> {
  const path = route(ep.path)
  const url = params ? subst(path, params) : path
  const data = ep.request ? (ep.request, request) : request
  const method = ep.method

  const response = await axios({ ...options, method, url, data })

  const responseData = ep.response
    ? cast(ep.response, response.data)
    : response.data

  return [responseData, response as Response<GetEpResponse<Ep>>] as const
}

export type EpHttpResult<Eps extends EndpointRecordBase> = {
  [K in keyof Eps]: (
    args: EpHttpArgs<Eps[K]>,
  ) => Promise<
    readonly [GetEpResponse<Eps[K]>, Response<GetEpResponse<Eps[K]>>]
  >
}

const defaultAxios = axios.create()

export function epHttp<Eps extends EndpointRecordBase>(
  eps: Eps,
  axios: AxiosInstance = defaultAxios,
): EpHttpResult<Eps> {
  const api = {} as any

  for (const [key, ep] of Object.entries(eps)) {
    api[key] = (args: EpHttpArgs<any>) => {
      return apiCall({ ...args, ep, axios } as ApiCallsArgs<any>)
    }
  }

  return api
}

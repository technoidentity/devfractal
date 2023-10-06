import {
  cast,
  devInvariant,
  isDefined,
  isNotNilSpec,
  isUndefined,
  paramsSpec,
  route,
  type EndpointBase,
  type EndpointRecordBase,
  type GetEpResponse,
  type GetParamsArg,
  type GetRequestArg,
} from '@srtp/core'
import { fromSearchParams } from '@srtp/web'
import { StatusCodes } from 'http-status-codes'
import type { RestHandler } from 'msw'
import {
  rest,
  type ResponseComposition,
  type RestContext,
  type RestRequest,
} from 'msw'
import type { MockContext } from './types'

type MockEpsHandlerArgs<Ep extends EndpointBase> = GetParamsArg<Ep> &
  GetRequestArg<Ep> & { c: MockContext }

type MockEpHandler<Ep extends EndpointBase> = (
  args: MockEpsHandlerArgs<Ep>,
) => GetEpResponse<Ep>

export type MockEpsHandlers<Eps extends EndpointRecordBase> = {
  [K in keyof Eps]: MockEpHandler<Eps[K]>
}

export type MockSEpsHandlers<Eps extends EndpointRecordBase> = Partial<
  MockEpsHandlers<Eps>
>

function getQuery(req: RestRequest): object {
  devInvariant(req.method === 'get', 'request must be a get request')

  return fromSearchParams(req.url.searchParams)
}

function epHandler<Ep extends EndpointBase>(ep: Ep, fn: MockEpHandler<Ep>) {
  return async (
    req: RestRequest,
    res: ResponseComposition,
    ctx: RestContext,
  ) => {
    const ps = paramsSpec(ep.path)

    const params: any = isDefined(ps)
      ? cast(ps, req.params)
      : { params: undefined }

    const request: GetEpResponse<Ep> =
      isDefined(ep.request) && isNotNilSpec(ep.request)
        ? cast(
            ep.request,
            // @TODO: form-url-encoded support when fetch msw version releases
            ep.method === 'get' ? getQuery(req) : await req.json(),
          )
        : undefined

    const args: MockEpsHandlerArgs<Ep> = {
      request,
      params,
      c: { req, res, ctx },
    }

    const response = fn(args)

    if (isUndefined(response)) {
      return res(ctx.status(StatusCodes.NO_CONTENT))
    } else {
      return res(ctx.json(cast(ep.response, response)))
    }
  }
}

export function epRouter<Eps extends EndpointRecordBase>(
  eps: Eps,
  handlers: MockEpsHandlers<Eps>,
): RestHandler[] {
  const result: RestHandler[] = []

  for (const [name, ep] of Object.entries(eps)) {
    const path = route(ep.path)
    const method = rest[ep.method] as any
    result.push(method(path, epHandler(ep, handlers[name] as any)))
  }

  return result
}

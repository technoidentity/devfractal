import {
  paramsSpec,
  route,
  type EndpointBase,
  type EndpointRecordBase,
  type GetEpResponse,
  type GetParamsArg,
  type GetRequestArg,
} from '@srtp/core'
import { cast, isNotNilSpec, isUndefined } from '@srtp/core'
import { Hono, type Context } from 'hono'
import { logger } from 'hono/logger'
import { StatusCodes } from 'http-status-codes'

type EpsHandlerArgs<Ep extends EndpointBase> = GetParamsArg<Ep> &
  GetRequestArg<Ep> & { c: Context }

type EpHandler<Ep extends EndpointBase> = (
  args: EpsHandlerArgs<Ep>,
) => GetEpResponse<Ep>

export type EpsHandlers<Eps extends EndpointRecordBase> = {
  [K in keyof Eps]: EpHandler<Eps[K]>
}

export type SEpsHandlers<Eps extends EndpointRecordBase> = Partial<
  EpsHandlers<Eps>
>

function epHandler<Ep extends EndpointBase>(ep: Ep, fn: EpHandler<Ep>) {
  return async (c: Context) => {
    const args = { c } as any

    const ps = paramsSpec(ep.path)
    if (ps) {
      args.params = cast(ps, c.req.param())
    }

    if (ep.request && isNotNilSpec(ep.request)) {
      const req = ep.method === 'get' ? c.req.query() : await c.req.json()
      args.request = cast(ep.request, req)
    }

    const response = fn(args)
    if (ep.method === 'delete') {
      console.log({ response })
    }

    if (isUndefined(response)) {
      c.status(StatusCodes.NO_CONTENT)
      return c.body(null)
    } else {
      return c.json(cast(ep.response, response))
    }
  }
}

export function epRouter<Eps extends EndpointRecordBase>(
  eps: Eps,
  handlers: EpsHandlers<Eps>,
) {
  const app = new Hono()
  app.use('*', logger())

  for (const [name, ep] of Object.entries(eps)) {
    const path = route(ep.path)
    const method = app[ep.method] as any
    method(path, epHandler(ep, handlers[name] as any))
  }

  return app
}

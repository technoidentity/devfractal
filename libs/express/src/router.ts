import {
  cast,
  isNotNilSpec,
  isUndefined,
  paramsSpec,
  route,
  type EndpointBase,
  type EndpointRecordBase,
  type GetEpResponse,
  type GetParamsArg,
  type GetRequestArg,
  isDefined,
} from '@srtp/core'
import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express'
import { StatusCodes } from 'http-status-codes'

export type Context = {
  req: Request
  res: Response
  next: NextFunction
}

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
  return async (req: Request, res: Response, next: NextFunction) => {
    const ps = paramsSpec(ep.path)

    const params: any = isDefined(ps)
      ? cast(ps, req.params)
      : { params: undefined }

    const request: GetEpResponse<Ep> =
      isDefined(ep.request) && isNotNilSpec(ep.request)
        ? cast(ep.request, ep.method === 'get' ? req.query : await req.body)
        : undefined

    const args: EpsHandlerArgs<Ep> = { request, params, c: { req, res, next } }

    const response = fn(args)

    if (isUndefined(response)) {
      res.status(StatusCodes.NO_CONTENT).end()
    } else {
      res.json(cast(ep.response, response))
    }
  }
}

export function epRouter<Eps extends EndpointRecordBase>(
  eps: Eps,
  handlers: EpsHandlers<Eps>,
): express.Router {
  const app = express.Router()

  for (const [name, ep] of Object.entries(eps)) {
    const path = route(ep.path)
    const method = app[ep.method] as any
    method(path, epHandler(ep, handlers[name] as any))
  }

  return app
}

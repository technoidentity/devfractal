import type { EndpointBase, GetEpRequest, GetEpResponse } from '@srtp/core'
import {
  cast,
  isFunction,
  isNotNilSpec,
  paramsSpec,
  type Params,
} from '@srtp/core'
import { axios, epAxios, type BaseUrlOrAxios } from '@srtp/web'
import {
  redirect as redirectFn,
  type ActionFunction,
  type ActionFunctionArgs,
} from 'react-router-dom'
import { z } from 'zod'

import { safeActionData } from './safeHooks'
import { formData } from './utils'

export type EpActionResult<Ep extends EndpointBase> = {
  useActionData: () => GetEpResponse<Ep>
  action: ActionFunction
}

export type EpActionHandlerFn<Ep extends EndpointBase> = (
  args: Readonly<{
    request: GetEpRequest<Ep>
    params: Params<Ep['path']>
    args: ActionFunctionArgs
  }>,
) => Promise<Response | NonNullable<unknown> | null>

export type RedirectFn<Ep extends EndpointBase> = Readonly<{
  params: Params<Ep['path']>
  request: Request
  response: Response
}>

export type ErrorRedirectFn<Ep extends EndpointBase> = (
  args: Readonly<{
    params: Params<Ep['path']>
    request: GetEpRequest<Ep>
    error: Error
  }>,
) => string

export type EpActionArgs<Ep extends EndpointBase> = Readonly<{
  endpoint: Ep
  baseUrlOrAxios?: BaseUrlOrAxios
  // similar to ActionFunction
  actionHandler?: EpActionHandlerFn<Ep>
  redirect?: RedirectFn<Ep>
}>

export function epAction<const Ep extends EndpointBase>(
  args: EpActionArgs<Ep>,
): EpActionResult<Ep> {
  const { endpoint } = args
  const baseUrlOrAxios = args.baseUrlOrAxios ?? axios

  const useActionData = safeActionData(endpoint.response ?? z.undefined())

  const action: ActionFunction = async actionArgs => {
    const params: any = cast(paramsSpec(endpoint.path), actionArgs.params)
    const request: any = isNotNilSpec(endpoint.request)
      ? { body: cast(endpoint.request, actionArgs.request) }
      : actionArgs.request

    const { data } = await epAxios({
      ep: endpoint,
      baseUrlOrAxios,
      request: await formData(actionArgs.request),
      params: actionArgs.params,
    })

    if (args.redirect) {
      const redirectUrl = isFunction(args.redirect)
        ? args.redirect({
            params,
            request,
            response: data,
          })
        : args.redirect

      return redirectFn(redirectUrl)
    }

    return data
  }

  return { useActionData, action }
}

// @TODO: epActions, taking multiple endpoints and returning a single action

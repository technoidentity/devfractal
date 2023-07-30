import type {
  EndpointBase,
  GetEpResponse,
  Params,
  PathBase,
} from '@srtp/endpoint'
import { linkfn, paramsSpec, route } from '@srtp/endpoint'

import type { IfFnArg, Iff, IsDefined, IsNonEmpty } from '@srtp/core'
import { buildObject$ } from '@srtp/fn'
import { cast } from '@srtp/spec'
import { http, toPath } from '@srtp/web'
import {
  type ActionFunction,
  type LoaderFunction,
  type RouteObject,
} from 'react-router-dom'
import invariant from 'tiny-invariant'
import { z } from 'zod'
import {
  safeActionData,
  safeLoaderData,
  safeNavigate,
  safeParams,
} from './hooks'

const api = http

export type NavigateResult<Path extends PathBase> = IfFnArg<
  IsNonEmpty<Params<Path>>,
  Params<Path>,
  void
>

export type EpPathResult<Path extends PathBase> = {
  path: string
  useNavigate: () => NavigateResult<Path>
} & Iff<
  IsNonEmpty<Params<Path>>,
  {
    link: (params: Params<Path>) => string
    useParams: () => Params<Path>
  }
>

export function routerPath<Path extends PathBase>(
  pathDef: Path,
): EpPathResult<Path> {
  const spec = paramsSpec(pathDef)

  return {
    path: route(pathDef),
    link: linkfn(pathDef),
    useParams: safeParams(spec) as () => Params<Path>,
    useNavigate: safeNavigate(pathDef) as () => NavigateResult<Path>,
  }
}

export type EpLoaderResult<Ep extends EndpointBase> = {
  useLoaderData: () => GetEpResponse<Ep>
  loader: LoaderFunction
}

export function epLoader<Ep extends EndpointBase>(ep: Ep): EpLoaderResult<Ep> {
  const responseSpec = ep.response
  invariant(responseSpec, 'epLoader requires an endpoint with a response spec')

  const loader: LoaderFunction = args => {
    const params: any = ep.path
      ? cast(paramsSpec(ep.path), args.params)
      : args.params

    const path = toPath(route(ep.path), params)

    const query = Object.fromEntries(new URL(args.request.url).searchParams)
    const result = api.get(path, query)

    return cast(responseSpec, result)
  }

  return {
    loader,
    useLoaderData: safeLoaderData(responseSpec),
  }
}

export type EpActionResult<Ep extends EndpointBase> = {
  useActionData: () => GetEpResponse<Ep>
  action: ActionFunction
}

export function epAction<Ep extends EndpointBase>(ep: Ep): EpActionResult<Ep> {
  const useActionData = safeActionData(ep.response ?? z.undefined())

  const action: ActionFunction = async args => {
    const pspec = paramsSpec(ep.path) ?? z.undefined()
    const params = cast(pspec, args.params)

    const path = toPath(route(ep.path), params)

    const result = api.post(
      path,
      Object.fromEntries(await args.request.formData()),
    )

    return ep.response ? cast(ep.response, result) : result
  }

  return { useActionData, action }
}

// @TODO: epActions, taking multiple endpoints and returning a single action

type EpRouterArgs<
  Path extends PathBase,
  LoaderEp extends EndpointBase,
  ActionEp extends EndpointBase,
> = {
  path: Path
  loader?: LoaderEp
  action?: ActionEp
}

export type EpRouteObject<
  Path extends PathBase,
  LoaderEp extends EndpointBase,
  ActionEp extends EndpointBase,
> = RouteObject & EpRouterArgs<Path, LoaderEp, ActionEp>

type EpRouteResult<
  Path extends PathBase,
  LoaderEp extends EndpointBase | undefined,
  ActionEp extends EndpointBase | undefined,
> = {
  route: RouteObject
} & Omit<EpPathResult<Path>, 'path'> &
  Iff<
    IsDefined<LoaderEp>,
    { useLoaderData: () => GetEpResponse<LoaderEp & object> }
  > &
  Iff<
    IsDefined<ActionEp>,
    { useActionData: () => GetEpResponse<ActionEp & object> }
  >

export function epRouteUtils<
  Path extends PathBase,
  LoaderEp extends EndpointBase,
  ActionEp extends EndpointBase,
>(
  args: EpRouteObject<Path, LoaderEp, ActionEp>,
): EpRouteResult<Path, (typeof args)['loader'], (typeof args)['action']> {
  const { path: pathDef, loader: epl, action: epa, ...routeArgs } = args

  const { path, ...utils } = routerPath(pathDef)
  const loaderUtils = epl ? epLoader(epl) : undefined
  const actionUtils = epa ? epAction(epa) : undefined

  const routeObject = {
    ...routeArgs,
    path,
    loader: loaderUtils?.loader,
    action: actionUtils?.action,
  }

  return {
    route: routeObject,
    ...utils,
    useLoaderData: loaderUtils?.useLoaderData,
    useActionData: actionUtils?.useActionData,
  }
}

export type EpRouteRecordBase = Record<string, EpRouteObject<any, any, any>>

export type EpRouterResult<EpRoute extends EpRouteRecordBase> = {
  [K in keyof EpRoute]: EpRouteResult<
    EpRoute[K]['path'],
    EpRoute[K]['loader'],
    EpRoute[K]['action']
  >
}

export function epRouter<EpRoute extends EpRouteRecordBase>(
  routes: EpRoute,
): EpRouterResult<EpRoute> {
  return buildObject$(routes, value => epRouteUtils(value)) as any
}

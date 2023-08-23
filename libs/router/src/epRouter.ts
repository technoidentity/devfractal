import type { EndpointBase, GetEpResponse, PathBase } from '@srtp/core'
import { paramsSpec, route } from '@srtp/core'

import type { Iff, IsDefined } from '@srtp/core'
import { omap$ } from '@srtp/fn'
import { cast } from '@srtp/core'
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
  safeSearch,
  type UseSearchResult,
} from './hooks'
import { routerPath, type EpPathResult } from './routerPath'

const api = http

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
    const result = api.get$(path, query)

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

    const result = api.post$(
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
  SearchSpec extends z.ZodTypeAny | undefined,
  LoaderEp extends EndpointBase,
  ActionEp extends EndpointBase,
> = {
  path: Path
  search?: SearchSpec
  loader?: LoaderEp
  action?: ActionEp
}

export type EpRouteObject<
  Path extends PathBase,
  SearchSpec extends z.ZodTypeAny | undefined,
  LoaderEp extends EndpointBase,
  ActionEp extends EndpointBase,
> = RouteObject & EpRouterArgs<Path, SearchSpec, LoaderEp, ActionEp>

type EpRouteResult<
  Path extends PathBase,
  SearchSpec extends z.ZodTypeAny | undefined,
  LoaderEp extends EndpointBase | undefined,
  ActionEp extends EndpointBase | undefined,
> = {
  route: RouteObject
} & Omit<EpPathResult<Path>, 'path'> &
  Iff<
    IsDefined<SearchSpec>,
    { useSearch: () => UseSearchResult<NonNullable<SearchSpec>> }
  > &
  Iff<
    IsDefined<LoaderEp>,
    { useLoaderData: () => GetEpResponse<NonNullable<LoaderEp>> }
  > &
  Iff<
    IsDefined<ActionEp>,
    { useActionData: () => GetEpResponse<NonNullable<ActionEp>> }
  >

export function epRouteUtils<
  Path extends PathBase,
  SearchSpec extends z.ZodTypeAny | undefined,
  LoaderEp extends EndpointBase,
  ActionEp extends EndpointBase,
>(
  args: EpRouteObject<Path, SearchSpec, LoaderEp, ActionEp>,
): EpRouteResult<
  Path,
  SearchSpec,
  (typeof args)['loader'],
  (typeof args)['action']
> {
  const { path: pathDef, search, loader: epl, action: epa, ...routeArgs } = args

  const { path, ...utils } = routerPath(pathDef)
  const loaderUtils = epl ? epLoader(epl) : undefined
  const actionUtils = epa ? epAction(epa) : undefined

  const useSearch: any = search ? safeSearch(search) : undefined

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
    useSearch,
  }
}

export type EpRouteRecordBase = Record<
  string,
  EpRouteObject<any, any, any, any>
>

export type EpRouterResult<EpRoutes extends EpRouteRecordBase> = {
  [K in keyof EpRoutes]: EpRouteResult<
    EpRoutes[K]['path'],
    EpRoutes[K]['search'],
    EpRoutes[K]['loader'],
    EpRoutes[K]['action']
  >
} & { routes: RouteObject[] }

export function epRouter<EpRoutes extends EpRouteRecordBase>(
  routes: EpRoutes,
): EpRouterResult<EpRoutes> {
  const utils = omap$(routes, value => epRouteUtils(value))
  return { ...(utils as any), routes: Object.values(utils).map(t => t.route) }
}

import type {
  EndpointBase,
  EndpointRecordBase,
  Iff,
  IsDefined,
  PathBase,
} from '@srtp/core'
import { omap$ } from '@srtp/fn'
import { type BaseUrlOrFetch } from '@srtp/web'
import { type LoaderFunctionArgs, type RouteObject } from 'react-router-dom'
import type { z } from 'zod'

import { epAction, type EpActionArgs, type EpActionResult } from './action'
import { epsLoader, type EpsLoaderResult } from './loader'
import { routerPath, type RouterPathResult, type SearchFns } from './routes'
import { safeSearch } from './safeHooks'
import { castSearch } from './utils'

type EpRouteArgs<
  Path extends PathBase,
  Search extends z.ZodTypeAny | undefined,
  LoaderEps extends EndpointRecordBase | undefined,
  ActionEp extends EndpointBase | undefined,
> = Readonly<{
  path: Path
  search?: Search
  loader?: LoaderEps
  action?: EpActionArgs<NonNullable<ActionEp>>
}>

type EpRouteBase = EpRouteArgs<any, any, any, any>

type EpRouteResult<
  Path extends PathBase,
  Search extends z.ZodTypeAny | undefined,
  LoaderEps extends EndpointRecordBase | undefined,
  ActionEp extends EndpointBase | undefined,
> = RouterPathResult<Path> &
  SearchFns<Search> &
  Iff<IsDefined<LoaderEps>, EpsLoaderResult<NonNullable<LoaderEps>>> &
  Iff<IsDefined<ActionEp>, EpActionResult<NonNullable<ActionEp>>>

export function epRouteUtils<
  const Path extends PathBase,
  const SearchSpec extends z.ZodTypeAny | undefined,
  const LoaderEps extends EndpointRecordBase,
  const ActionEp extends EndpointBase,
>(
  args: EpRouteArgs<Path, SearchSpec, LoaderEps, ActionEp>,
  baseUrlOrFetch?: BaseUrlOrFetch,
): EpRouteResult<Path, SearchSpec, LoaderEps, ActionEp> {
  const { path, search, loader, action } = args

  const routerUtils = routerPath(path)

  const loaderUtils = loader ? epsLoader(loader, baseUrlOrFetch) : undefined

  const actionUtils = action ? epAction(action) : undefined
  const searchUtils = search
    ? {
        useSearch: safeSearch(search),
        search: (args: LoaderFunctionArgs) => castSearch(search, args.request),
      }
    : undefined

  return {
    ...routerUtils,
    ...loaderUtils!, // this is okay  ;-)
    ...actionUtils!,
    ...searchUtils!,
  }
}

export type EpRouterRecordBase = Record<string, EpRouteBase>

export type EpRouterResult<Eps extends EpRouterRecordBase> = {
  [K in keyof Eps]: EpRouteResult<
    Eps[K]['path'],
    Eps[K]['search'],
    Eps[K]['loader'],
    NonNullable<Eps[K]['action']>['endpoint']
  >
}

export function epRoutes<EpRoutes extends EpRouterRecordBase>(
  eps: EpRoutes,
  baseUrlOrFetch?: BaseUrlOrFetch,
): EpRouterResult<EpRoutes> {
  return omap$(eps, value => epRouteUtils(value, baseUrlOrFetch)) as any
}

export type RouteObjects<Eps extends EpRouterRecordBase> = {
  [K in keyof Eps]: Omit<RouteObject, 'path' | 'loader' | 'action'>
}

export function epReactRoutes<const Eps extends EpRouterRecordBase>(
  args: EpRouterResult<Eps>,
  routes: RouteObjects<Eps>,
): RouteObject[] {
  const result: RouteObject[] = []

  for (const [key, value] of Object.entries(args)) {
    const { path, loader, action } = value
    result.push({ ...routes[key], path, loader, action } as RouteObject)
  }

  return result
}

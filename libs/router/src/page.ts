/* eslint-disable @typescript-eslint/ban-types */
import type { Iff, IsNonEmpty } from '@srtp/core'
import { type EndpointBase } from '@srtp/endpoint'
import { buildObject$ } from '@srtp/fn'
import { routerPath, type EpPathResult } from './epRouter'
import { safeSearch, type UseSearchResult } from './hooks'
import type { RouteObject } from 'react-router-dom'

export type PageBase = Omit<RouteObject, 'path'> &
  Pick<EndpointBase, 'path' | 'request'>

export type PageResult<Page extends PageBase> = { route: RouteObject } & (Omit<
  EpPathResult<Page['path']>,
  'path'
> &
  Iff<
    IsNonEmpty<Page['request']>,
    { useSearch: () => UseSearchResult<Page['request'] & object> }
  >)

export function page<Page extends PageBase>(page: Page): PageResult<Page> {
  const { path, request, ...routeArgs } = page

  const { path: routePath, ...pathUtils } = routerPath<Page['path']>(path)

  const useSearch: any = request ? safeSearch(request) : undefined

  const route: RouteObject = { path: routePath, ...(routeArgs as RouteObject) }

  return { route, ...pathUtils, useSearch }
}

export type PageRecordBase = Record<string, PageBase>

export type PagesResult<Pages extends PageRecordBase> = Readonly<{
  [K in keyof Pages]: PageResult<Pages[K]>
}> & { routes: RouteObject[] }

export function pages<Pages extends PageRecordBase>(
  ps: Pages,
): PagesResult<Pages> {
  const utils = buildObject$(ps, v => page(v))

  return { ...utils, routes: Object.values(utils).map(t => t.route) }
}

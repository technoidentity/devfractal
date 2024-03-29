/* eslint-disable @typescript-eslint/ban-types */
import type { If, IsNonEmptyObject } from '@srtp/core'
import { type EndpointBase } from '@srtp/core'
import { omap$ } from '@srtp/fn'
import type { RouteObject } from 'react-router-dom'

import { routerPath, type RouterPathResult } from './routes'
import { safeSearch, type UseSearchResult } from './safeHooks'

/**  @deprecated this should be avoided, use routes or epRoutes instead.
 */

export type PageBase = Omit<RouteObject, 'path'> &
  Pick<EndpointBase, 'path'> &
  Partial<Pick<EndpointBase, 'request'>>

export type PageResult<Page extends PageBase> = { route: RouteObject } & (Omit<
  RouterPathResult<Page['path']>,
  'path'
> &
  If<
    IsNonEmptyObject<Page['request']>,
    { useSearch: () => UseSearchResult<NonNullable<Page['request']>> },
    object
  >)

export function page<const Page extends PageBase>(
  page: Page,
): PageResult<Page> {
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

export function pages<const Pages extends PageRecordBase>(
  ps: Pages,
): PagesResult<Pages> {
  const utils = omap$(ps, v => page(v))

  return { ...utils, routes: Object.values(utils).map(t => t.route) }
}

import { type EndpointBase } from '@srtp/endpoint'
import { buildObject$ } from '@srtp/fn'
import { z } from 'zod'
import { epPath, type EpPathResult } from './epRouter'
import { safeSearch, type UseSearchResult } from './hooks'

export type PageBase = Pick<EndpointBase, 'path' | 'request'>

export type PageResult<Page extends PageBase> = EpPathResult<Page['path']> &
  Readonly<{ useSearch: () => UseSearchResult<Page['request'] & object> }>

export function page<Page extends PageBase>(
  path: Page['path'],
  request?: Page['request'],
): PageResult<Page> {
  const pathUtils = epPath(path)
  const useSearch = safeSearch(
    request || z.object({}),
  ) as () => UseSearchResult<Page['request'] & object>

  return { ...pathUtils, useSearch }
}

export type PageRecordBase = Record<string, PageBase>

export type PagesResult<Pages extends PageRecordBase> = Readonly<{
  [K in keyof Pages]: PageResult<Pages[K]>
}>

export function pages<Pages extends PageRecordBase>(
  ps: Pages,
): PagesResult<Pages> {
  const result: PagesResult<Pages> = buildObject$(ps, v =>
    page(v.path, v.request),
  )
  return result
}

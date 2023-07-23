import type { z } from 'zod'

import { restEndpoints } from '@srtp/endpoint'
import type { ZodFundamental } from '@srtp/spec'
import { createEpApi } from './ep/epApi'

export function restQueries<
  Spec extends z.ZodRawShape & { id: ZodFundamental },
  Search extends z.ZodRawShape | z.AnyZodObject,
>(rawSpec: Spec, search: Search, segment: string, baseUrl: string) {
  const endpoints = restEndpoints(rawSpec, search, segment)

  return createEpApi(endpoints, baseUrl)
}

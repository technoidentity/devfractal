import type { z } from 'zod'
import { type ZodPrimitive } from './endpoint'
import { restEndpoints } from './restEndpoints'
import { createEpApi } from './epApi'

export function restQueries<
  Spec extends z.ZodRawShape & { id: ZodPrimitive },
  Search extends z.ZodRawShape | z.AnyZodObject,
>(rawSpec: Spec, search: Search, segment: string, baseUrl: string) {
  const endpoints = restEndpoints(rawSpec, search, segment)

  return createEpApi(endpoints, baseUrl)
}

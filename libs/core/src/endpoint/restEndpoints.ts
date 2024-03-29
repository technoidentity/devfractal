import { z } from 'zod'

import type { ZodPrimitive } from '../spec'

export function restEndpoints<
  Spec extends z.ZodRawShape & { id: ZodPrimitive },
  Search extends z.ZodRawShape | z.AnyZodObject,
>(rawSpec: Spec, search: Search, segment: string) {
  const spec = z.object(rawSpec)
  const request = search instanceof z.ZodObject ? search : z.object(search)

  return {
    many: {
      path: [segment],
      method: 'get',
      response: z.array(spec),
      request,
    },

    one: {
      path: [segment, { id: z.number() }],
      method: 'get',
      response: spec,
      request: z.undefined().optional(),
    },

    add: {
      path: [segment],
      method: 'post',
      response: spec,
      request: spec.omit({ id: true }),
    },

    update: {
      path: [segment, { id: rawSpec['id'] }],
      method: 'put',
      response: spec,
      request: spec.partial(),
    },

    remove: {
      path: [segment, { id: z.number() }],
      method: 'delete',
      request: z.undefined(),
      response: z.undefined(),
    },
  } as const
}

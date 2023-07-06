import type { ZodEnum } from 'zod'
import { z } from 'zod'
import { createEndpointApi, type ZodPrimitive } from './endpoint'

export function restEndpoints<
  Spec extends z.ZodRawShape & { id: ZodPrimitive },
  Query extends z.ZodRawShape | z.AnyZodObject,
>(rawSpec: Spec, options: { name: string; query: Query }) {
  const spec = z.object(rawSpec)
  const request =
    options.query instanceof z.ZodObject
      ? options.query
      : z.object(options.query)

  return {
    many: {
      path: [options.name],
      method: 'get',
      response: z.array(spec),
      request,
    },

    one: {
      path: [options.name, { id: z.number() }],
      method: 'get',
      response: spec,
    },

    create: {
      path: [options.name],
      method: 'post',
      response: spec,
      request: spec.omit({ id: true }),
    },

    update: {
      path: [options.name, { id: rawSpec['id'] }],
      method: 'put',
      response: spec,
      request: spec.partial().omit({ id: true }),
    },

    remove: {
      path: [options.name, { id: z.number() }],
      method: 'delete',
    },
  } as const
}

export function restQueries<
  Spec extends z.ZodRawShape & { id: ZodPrimitive },
  Query extends z.ZodRawShape | z.AnyZodObject,
>(rawSpec: Spec, options: { name: string; query: Query }) {
  const endpoints = restEndpoints(rawSpec, options)
  return createEndpointApi(endpoints)
}

const SortOrder = z.enum(['asc', 'desc'])
type SortOrder = z.infer<typeof SortOrder>

type DefaultSearch<T> = {
  select?: ReadonlyArray<keyof T>
  search?: Partial<T>
  q?: string
  page?: number
  limit?: number
  sort?: keyof T
  order?: SortOrder
}

export function defaultSearch<Spec extends z.AnyZodObject>(
  spec: Spec,
  defaultLimit: number = 10,
): z.Schema<DefaultSearch<z.infer<Spec>>> {
  const keys = spec.keyof() as ZodEnum<any>

  return z.object({
    select: z.array(keys).optional(),
    search: spec.partial().optional(),
    q: z.string().optional(),
    page: z.number().default(1),
    limit: z.number().default(defaultLimit),
    sort: keys.optional(),
    order: SortOrder.optional(),
  })
}

import { z } from 'zod'

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
  const keys = spec.keyof() as z.ZodEnum<any>

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

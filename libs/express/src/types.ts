import { z } from 'zod'

export const ResponseError = z.object({
  error: z.string().optional(),
  errors: z.record(z.string()).optional(),
})

export type ResponseError = z.infer<typeof ResponseError>

import type { ResponseComposition, RestContext, RestRequest } from 'msw'
import { z } from 'zod'

export type MockContext = {
  req: RestRequest
  res: ResponseComposition
  ctx: RestContext
}

export const MockResponseError = z.object({
  error: z.string().optional(),
  errors: z.record(z.string()).optional(),
})

export type MockResponseError = z.infer<typeof MockResponseError>

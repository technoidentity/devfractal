// @TODO: use query-string to support arrays etc
import { cast } from '@srtp/core'
import qs from 'query-string'
import type { z } from 'zod'

// Unfortunately query-string is esm only because of which this function
// can't be moved to @srtp/remix-node
export function safeQuery<Spec extends z.ZodTypeAny>(
  spec: Spec,
  request: Request,
  options?: qs.ParseOptions,
): z.infer<Spec> {
  const obj = qs.parse(new URL(request.url).searchParams.toString(), {
    arrayFormat: 'index',
    ...options,
  })
  return cast(spec, obj)
}

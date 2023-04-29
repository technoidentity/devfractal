import { cast } from '@srtp/spec'
import { useParams } from 'react-router-dom'
import type { z } from 'zod'

export function useSafeParams<Spec extends z.AnyZodObject>(spec: Spec) {
  return cast(spec, useParams())
}

// @TODO: THIS IS TEMPORARY! REMOVE THIS FILE
import type { FormErrors } from '@srtp/core'
import { formatErrors, pparse } from '@srtp/core'
import { pipe } from '@srtp/fn'

import type { z } from 'zod'
import { useUpdate } from './local-state'
import { useEvent } from './useEvent'

export type UseClientFormState<Spec extends z.ZodTypeAny> = Readonly<{
  state?: z.infer<Spec>
  errors?: FormErrors<Spec>
}>

export type UseClientFormResult<Spec extends z.ZodTypeAny> = {
  onSubmit(event: React.FormEvent<HTMLFormElement>): void
} & UseClientFormState<Spec>

export function useClientForm<Spec extends z.ZodTypeAny>(spec: Spec) {
  const [{ state, errors }, { update }] = useUpdate<UseClientFormState<Spec>>({
    state: undefined,
    errors: undefined,
  })

  const onSubmit = useEvent((event: React.FormEvent<HTMLFormElement>) => {
    const result = pipe(
      new FormData(event.currentTarget),
      Object.fromEntries,
      pparse(spec),
    )

    if (result.success) {
      update(_ => ({ state: result.data, errors: undefined }))
    } else {
      update(_ => ({ state: undefined, errors: formatErrors(result.error) }))
    }
  })

  return { onSubmit, state, errors }
}

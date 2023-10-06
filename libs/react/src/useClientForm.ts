// @TODO: THIS IS TEMPORARY! REMOVE THIS FILE
import type { FormErrors } from '@srtp/core'
import { formatErrors, isPromise, pparse } from '@srtp/core'
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

export function useClientForm<Spec extends z.ZodTypeAny>(
  spec: Spec,
  onSubmit?: (values: z.infer<Spec>) => void | Promise<void>,
) {
  const [{ state, errors }, { update }] = useUpdate<UseClientFormState<Spec>>({
    state: undefined,
    errors: undefined,
  })

  const handleSubmit = useEvent((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = pipe(
      new FormData(event.currentTarget),
      Object.fromEntries,
      pparse(spec),
    )

    if (result.success) {
      const submitResult = onSubmit?.(result.data)
      if (isPromise(submitResult)) {
        // @TODO: should handle server side errors?
        submitResult
          .then(serverValue => ({
            serverValue,
          }))
          .catch(console.error)
      }
      update(_ => ({ state: result.data, errors: undefined }))
    } else {
      update(_ => ({ state: undefined, errors: formatErrors(result.error) }))
    }
  })

  return { onSubmit: handleSubmit, state, errors }
}

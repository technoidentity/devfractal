import type { UseFormReturnType } from '@mantine/form'
import { context } from '@srtp/react'
import type { FormErrors } from '@srtp/remix-core'
import type { GetRawShape , FormSpec } from '@srtp/core'
import type { z } from 'zod'

export type FormContext<Spec extends FormSpec> = {
  form: UseFormReturnType<
    z.infer<Spec>,
    (values: z.infer<Spec>) => z.infer<Spec>
  >
  useContext: () => UseFormReturnType<
    z.infer<Spec>,
    (values: z.infer<Spec>) => z.infer<Spec>
  >
  spec: GetRawShape<Spec>
  serverErrors?: FormErrors<z.infer<Spec>>
  errMsg?: (key: keyof z.infer<Spec>) => string | undefined
}

export const [FormContext, useFormContext] = context<FormContext<any>>({
  errorMessage: 'use FormContext Provider',
})

import type { UseFormReturnType } from '@mantine/form'
import type { Errors } from '@srtp/remix-core'
import type { FormSchema, GetRawShape } from '@srtp/validator'
import React from 'react'
import invariant from 'tiny-invariant'
import type { z } from 'zod'

export type FormContext<Spec extends FormSchema> = {
  form: UseFormReturnType<
    z.infer<Spec>,
    (values: z.infer<Spec>) => z.infer<Spec>
  >
  useContext: () => UseFormReturnType<
    z.infer<Spec>,
    (values: z.infer<Spec>) => z.infer<Spec>
  >
  serverErrors?: Errors<z.infer<Spec>>
  errMsg: (key: keyof z.infer<Spec>) => string | undefined
  spec: GetRawShape<Spec>
}

export const FormContext = React.createContext<FormContext<any> | undefined>(
  undefined,
)

function useSafeContext<T>(context: React.Context<T | undefined>): T {
  const ctx = React.useContext(context)
  invariant(ctx, 'use FormProvider')
  return ctx
}

export const useFormContext = <Spec extends FormSchema>(): FormContext<Spec> =>
  useSafeContext(FormContext)

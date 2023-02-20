import type { UseFormReturnType } from '@mantine/form'
import type { Errors } from '@srtp/remix-core'
import type { FormSpec, GetRawShape } from '@srtp/validator'
import React from 'react'
import type { z } from 'zod'
import { useSafeContext } from './useSafeContext'

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
  serverErrors?: Errors<z.infer<Spec>>
  errMsg?: (key: keyof z.infer<Spec>) => string | undefined
}

export const FormContext = React.createContext<FormContext<any> | undefined>(
  undefined,
)

export const useFormContext = <Spec extends FormSpec>(): FormContext<Spec> =>
  useSafeContext(FormContext, 'use FormContext')

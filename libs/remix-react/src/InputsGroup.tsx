/* eslint-disable @typescript-eslint/naming-convention */
import { createFormContext, useForm, zodResolver } from '@mantine/form'
import type { UseFormInput } from '@mantine/form/lib/types'
import type { FormSchema } from '@srtp/validator'
import { getRawShape } from '@srtp/validator'
import React from 'react'
import type { z } from 'zod'
import { FormContext } from './FormContext'
import type { InputsType } from './Inputs'
import { Inputs } from './Inputs'

type MyInputsGroupProps<Spec extends FormSchema> = Readonly<{
  onChange?: (values: z.infer<Spec>) => void
  children: React.ReactNode
}>

type InputsGroupProps<Spec extends FormSchema> = MyInputsGroupProps<Spec> &
  Omit<UseFormInput<z.infer<Spec>>, 'validate'>

export function createInputsGroup<Spec extends FormSchema>(spec: Spec) {
  type T = z.infer<Spec>
  const [MantineProvider, useMantineFormContext] = createFormContext<T>()

  const InputsGroup = ({
    children,
    onChange,
    ...props
  }: InputsGroupProps<Spec>) => {
    const form = useForm({
      validateInputOnBlur: true,
      ...props,
      validate: zodResolver(spec),
    })

    React.useEffect(() => {
      onChange?.(form.values)
    }, [form.values, onChange])

    const value = {
      form,
      useContext: useMantineFormContext,
      spec: getRawShape(spec),
    } as const

    return (
      <MantineProvider form={form}>
        <FormContext.Provider value={value}>
          <form>{children}</form>
        </FormContext.Provider>
      </MantineProvider>
    )
  }

  return {
    InputsGroup,
    useInputsGroup: useForm,
    Inputs: Inputs as InputsType<Spec>,
  }
}

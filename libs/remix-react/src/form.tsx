/* eslint-disable @typescript-eslint/naming-convention */
import type { UseFormReturnType } from '@mantine/form'
import { createFormContext, useForm, zodResolver } from '@mantine/form'
import type { UseFormInput } from '@mantine/form/lib/types'

import type { FormProps as RemixFormProps } from '@remix-run/react'
import { Form as RemixForm, useSubmit } from '@remix-run/react'
import type { Errors } from '@srtp/remix-core'
import type { FormSchema } from '@srtp/validator'
import { getRawShape } from '@srtp/validator'
import React from 'react'
import invariant from 'tiny-invariant'
import type { z } from 'zod'
import { FormContext } from './FormContext'
import type { InputsType } from './Inputs'
import { Inputs } from './Inputs'
import { useSuccessfulSubmit } from './useSuccessfulSubmit'
import { getFieldError } from './utils'

type FormProps<Spec extends FormSchema> = Readonly<{
  onSubmit?: (values: z.infer<Spec>) => void
  children: React.ReactNode
  serverErrors?: Errors<z.infer<Spec>>
}> &
  Omit<RemixFormProps, 'onSubmit'> &
  Omit<UseFormInput<z.infer<Spec>>, 'validate'>

type MyRemixFormProps<Spec extends FormSchema> = RemixFormProps &
  Readonly<{
    onSubmit?: (values: z.infer<Spec>) => void
    form: UseFormReturnType<
      z.TypeOf<Spec>,
      (values: z.TypeOf<Spec>) => z.TypeOf<Spec>
    >
  }>

function MyRemixForm<Spec extends FormSchema>({
  form,
  children,
  onSubmit,
  ...props
}: MyRemixFormProps<Spec>) {
  const submit = useSubmit()

  const success = useSuccessfulSubmit()

  React.useEffect(() => {
    if (success) {
      onSubmit?.(form.values)
    }
  }, [form.values, onSubmit, success])

  return (
    <RemixForm
      {...props}
      onSubmit={form.onSubmit((_, event) => {
        submit(event.currentTarget, { replace: true, method: props.method })
      })}
    >
      {children}
    </RemixForm>
  )
}

export function createForm<Spec extends FormSchema>(
  spec: Spec,
  initial?: z.infer<Spec>,
) {
  type T = z.infer<Spec>
  const [Provider, useContext] = createFormContext<T>()

  const Form = ({
    initialValues,
    onSubmit,
    children,
    serverErrors,
    ...props
  }: FormProps<Spec>) => {
    invariant(
      initialValues !== undefined || initial !== undefined,
      'You must provide initialValues to form',
    )
    const form = useForm({
      initialValues: initialValues || initial,
      validateInputOnBlur: true,
      ...props,
      validate: zodResolver(spec),
    })

    // @TODO: use form.setErrors or initialErrors instead?
    // Unfortunately globally available FormContext can't be typesafe. So any
    const errMsg = getFieldError(serverErrors, form) as any

    const value = {
      form,
      useContext,
      serverErrors,
      errMsg,
      spec: getRawShape(spec),
    } as const

    return (
      <Provider form={form}>
        <FormContext.Provider value={value}>
          <MyRemixForm {...props} onSubmit={onSubmit} form={form}>
            {children}
          </MyRemixForm>
        </FormContext.Provider>
      </Provider>
    )
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  return { Form, useFormContext: useForm, Inputs: Inputs as InputsType<Spec> }
}

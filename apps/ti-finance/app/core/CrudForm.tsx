import { Box } from '@mantine/core'
import type { FormMethod } from '@remix-run/react'
import type { Errors } from '@srtp/remix-core'
import type { InputsType } from '@srtp/remix-react'
import { createForm } from '@srtp/remix-react'
import type { FormSpec } from '@srtp/validator'
import React from 'react'
import type { z } from 'zod'
import { FormErrors, FormTitle, SubmitButton } from '~/core'

export type CrudFormProps<Spec extends FormSpec> = Readonly<{
  spec: Spec
  serverErrors?: Errors<z.infer<Spec>>
  initialValues: z.infer<Spec>
  onSubmit?: (values: z.infer<Spec>) => void
  title: string
  method?: FormMethod
  children: (props: { Inputs: InputsType<Spec> }) => JSX.Element
}>

export function CrudForm<Spec extends FormSpec>({
  initialValues,
  serverErrors,
  spec,
  onSubmit,
  method,
  title,
  children,
}: CrudFormProps<Spec>) {
  const { Form, Inputs } = React.useMemo(
    () => createForm(spec, initialValues),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
  const Comp = children

  return (
    <Box>
      <FormTitle>{title}</FormTitle>
      <FormErrors error={serverErrors?.error} />
      <Form
        initialValues={initialValues}
        serverErrors={serverErrors}
        method={method}
        onSubmit={onSubmit}
      >
        {method === 'put' && <Inputs.Hidden name="id" />}
        <Comp Inputs={Inputs} />
        <SubmitButton />
      </Form>
    </Box>
  )
}

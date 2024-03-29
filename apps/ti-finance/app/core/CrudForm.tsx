import { Box } from '@mantine/core'
import type { FormMethod } from '@remix-run/react'
import type { FormErrors as Errors, ValidatorSpec } from '@srtp/core'
import type { InputsType } from '@srtp/remix-react'
import { createForm } from '@srtp/remix-react'
import React from 'react'
import type { z } from 'zod'
import { FormErrors, FormTitle, SubmitButton } from '~/core'

export type CrudFormProps<Spec extends ValidatorSpec> = Readonly<{
  spec: Spec
  serverErrors?: Errors<z.infer<Spec>>
  initialValues: z.infer<Spec>
  onSubmit?: (values: z.infer<Spec>) => void
  title: string
  method?: FormMethod
  children: (props: { Inputs: InputsType<Spec> }) => JSX.Element
}>

export function CrudForm<Spec extends ValidatorSpec>({
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
      <FormErrors error={serverErrors?.formError} />
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

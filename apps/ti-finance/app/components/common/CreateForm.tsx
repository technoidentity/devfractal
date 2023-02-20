import { Box, Paper } from '@mantine/core'
import type { Errors } from '@srtp/remix-core'
import type { InputsType } from '@srtp/remix-react'
import { createForm } from '@srtp/remix-react'
import type { FormSpec } from '@srtp/validator'
import React from 'react'
import type { z } from 'zod'
import { FormErrors, FormTitle, SubmitButton } from '../common'

export type FormFieldsProps<T extends FormSpec> = Readonly<{
  Inputs: InputsType<T>
}>

export type CreateFormProps<Spec extends FormSpec> = {
  spec: Spec
  serverErrors?: Errors<z.infer<Spec>>
  initialValues: z.infer<Spec>
  title: string
  FormFields: (props: FormFieldsProps<Spec>) => JSX.Element
}

export type FormProps<Spec extends FormSpec> = Errors<Spec>

export function CreateForm<Spec extends FormSpec>({
  spec,
  serverErrors,
  initialValues,
  title,
  FormFields,
}: CreateFormProps<Spec>) {
  const { Form, Inputs } = React.useMemo(
    () => createForm(spec, initialValues),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <Paper shadow={'lg'} p="lg" sx={{ maxWidth: 450 }} mt="xl" mx="auto">
      <FormTitle>{title}</FormTitle>

      <Box>
        <FormErrors error={serverErrors} />

        <Form
          initialValues={initialValues}
          method="post"
          serverErrors={serverErrors}
        >
          <FormFields Inputs={Inputs} />

          <SubmitButton />
        </Form>
      </Box>
    </Paper>
  )
}

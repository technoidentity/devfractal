import { Box, Button, Group, Modal, Paper } from '@mantine/core'
import type { Errors } from '@srtp/remix-core'
import { createForm } from '@srtp/remix-react'
import type { FormSchema } from '@srtp/validator'
import React from 'react'
import type { z } from 'zod'
import type { FormFieldsProps } from '../common'
import { FormErrors, SubmitButton } from '../common'

export type EditFormProps<Spec extends FormSchema> = Readonly<{
  spec: Spec
  serverErrors?: Errors<z.infer<Spec>>
  initialValues: z.infer<Spec>
  title: string
  FormFields: (props: FormFieldsProps<Spec>) => JSX.Element
}>

export function EditForm<Spec extends FormSchema>({
  initialValues,
  serverErrors,
  spec,
  FormFields,
}: EditFormProps<Spec>) {
  const [opened, setOpened] = React.useState(false)

  const { Form, Inputs } = React.useMemo(
    () => createForm(spec, initialValues),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Update CTC"
      >
        <Paper shadow={'lg'} p="lg" sx={{ maxWidth: 450 }} mt="xl" mx="auto">
          <Box>
            <FormErrors error={serverErrors?.error} />

            <Form
              initialValues={initialValues}
              serverErrors={serverErrors}
              method="put"
              onSubmit={() => setOpened(false)}
            >
              <Inputs.Hidden name="id" />
              <FormFields Inputs={Inputs} />

              <SubmitButton />
            </Form>
          </Box>
          <Group position="center">
            <Button onClick={() => setOpened(true)}>Edit</Button>
          </Group>
        </Paper>
      </Modal>
      <Group position="center">
        <Button onClick={() => setOpened(true)}>Edit</Button>
      </Group>
    </>
  )
}

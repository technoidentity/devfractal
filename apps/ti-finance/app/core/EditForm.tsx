import { Button, Group, Modal, Paper } from '@mantine/core'
import type { FormSpec } from '@srtp/validator'
import React from 'react'
import type { FormFieldsProps } from '~/core'
import type { CrudFormProps } from './CrudForm'
import { CrudForm } from './CrudForm'

export interface EditFormProps<Spec extends FormSpec>
  extends Omit<CrudFormProps<Spec>, 'children' | 'onSubmit' | 'method'> {
  FormFields: (props: FormFieldsProps<Spec>) => JSX.Element
}

export function EditForm<Spec extends FormSpec>({
  initialValues,
  serverErrors,
  spec,
  FormFields,
}: EditFormProps<Spec>) {
  const [opened, setOpened] = React.useState(false)

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Update CTC"
      >
        <Paper shadow={'lg'} p="lg" sx={{ maxWidth: 450 }} mt="xl" mx="auto">
          <CrudForm
            spec={spec}
            title="Update CTC"
            initialValues={initialValues}
            serverErrors={serverErrors}
            method="put"
            onSubmit={() => {
              console.log('edit onSubmit')
              setOpened(false)
            }}
          >
            {FormFields}
          </CrudForm>
        </Paper>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Edit</Button>
      </Group>
    </>
  )
}

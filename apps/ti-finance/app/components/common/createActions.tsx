import { Group } from '@mantine/core'
import type { FormSchema } from '@srtp/validator'
import React from 'react'
import type { z } from 'zod'
import { DeleteForm } from './DeleteForm'
import type { EditFormProps } from './EditForm'
import { EditForm } from './EditForm'
import { useServerErrors } from './hooks'

function createActions$<Spec extends FormSchema & z.AnyZodObject>(
  spec: Spec,
  FormFields: EditFormProps<Spec>['FormFields'],
  editTitle: string,
) {
  return function Actions({ row }: { row: z.infer<Spec> }) {
    const serverErrors = useServerErrors(spec)

    return (
      <Group>
        <DeleteForm id={row.id} />
        <EditForm
          FormFields={FormFields}
          title={editTitle}
          initialValues={row}
          spec={spec}
          serverErrors={serverErrors}
        />
      </Group>
    )
  }
}

export function useActions<Spec extends FormSchema & z.AnyZodObject>(
  spec: Spec,
  FormFields: EditFormProps<Spec>['FormFields'],
  editTitle: string,
) {
  return React.useMemo(() => createActions$(spec, FormFields, editTitle), [])
}

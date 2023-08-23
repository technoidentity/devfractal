import { Group } from '@mantine/core'
import type { FormSpec } from '@srtp/core'
import React from 'react'
import type { z } from 'zod'
import { DeleteForm } from './DeleteForm'
import type { EditFormProps } from './EditForm'
import { EditForm } from './EditForm'
import { useServerErrors } from './hooks'

function createActions$<Spec extends FormSpec & z.AnyZodObject>(
  spec: Spec,
  FormFields: EditFormProps<Spec>['FormFields'],
  editTitle: string,
) {
  return function Actions({ row }: { row: z.infer<Spec> }) {
    const serverErrors = useServerErrors(spec)

    return (
      <Group noWrap>
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

export function useActions<Spec extends FormSpec & z.AnyZodObject>(
  spec: Spec,
  FormFields: EditFormProps<Spec>['FormFields'],
  editTitle: string,
) {
  return React.useMemo(
    () => createActions$(spec, FormFields, editTitle),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
}

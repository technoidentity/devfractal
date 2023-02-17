// @TODO: implement useInputs? or export useFormContext?

import type { InputsType } from '@srtp/remix-react'
import type { FormSchema } from '@srtp/validator'
import React from 'react'
import { useDepartments } from '~/common/context'
import { capitalizeFirstLetter } from '~/common/stringUtil'

export type DepartmentSelectProps<T extends FormSchema = FormSchema> = {
  Inputs: InputsType<T>
  name?: string
}

export function DepartmentSelect<T extends FormSchema = FormSchema>({
  Inputs,
  name,
}: DepartmentSelectProps<T>) {
  const { departments } = useDepartments()

  const data = React.useMemo(
    () =>
      departments.map(u => ({
        value: u.id.toString(),
        label: capitalizeFirstLetter(u.name),
      })),
    [departments],
  )

  return (
    <Inputs.DynamicSelect
      data={data}
      name={name as any}
      label="Department"
      mt="xs"
    />
  )
}

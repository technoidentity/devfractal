// @TODO: implement useInputs? or export useFormContext?

import type { InputsType } from '@srtp/remix-react'
import type { FormSpec } from '@srtp/validator'
import { useDepartmentsSelect } from '~/common'

export type SelectDepartmentProps<T extends FormSpec = FormSpec> = {
  Inputs: InputsType<T>
  name: string
}

export function SelectDepartment<T extends FormSpec = FormSpec>({
  Inputs,
  name,
}: SelectDepartmentProps<T>) {
  const departments = useDepartmentsSelect()

  return (
    <Inputs.DynamicSelect
      data={departments}
      name={name}
      label="Department"
      mt="xs"
    />
  )
}

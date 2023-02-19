// @TODO: implement useInputs? or export useFormContext?

import type { InputsType } from '@srtp/remix-react'
import type { FormSchema } from '@srtp/validator'
import { useDepartmentsSelect } from '~/common/context'

export type SelectDepartmentProps<T extends FormSchema = FormSchema> = {
  Inputs: InputsType<T>
  name: string
}

export function SelectDepartment<T extends FormSchema = FormSchema>({
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

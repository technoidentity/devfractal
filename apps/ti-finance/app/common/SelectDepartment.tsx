// @TODO: implement useInputs? or export useFormContext?

import type { SelectProps } from '@mantine/core'
import type { InputsType } from '@srtp/remix-react'
import type { FormSpec } from '@srtp/validator'
import { useDepartmentsSelect } from '~/common'

export type SelectDepartmentProps<T extends FormSpec = FormSpec> = Omit<
  SelectProps,
  'name' | 'data'
> & {
  Inputs: InputsType<T>
  name?: string
}

export function SelectDepartment<T extends FormSpec = FormSpec>({
  Inputs,
  ...props
}: SelectDepartmentProps<T>) {
  const departments = useDepartmentsSelect()

  return (
    <Inputs.DynamicSelect
      searchable
      clearable
      allowDeselect
      data={departments}
      name={'departmentId'}
      placeholder="Select Department"
      label={props.label || 'Department'}
      {...props}
    />
  )
}

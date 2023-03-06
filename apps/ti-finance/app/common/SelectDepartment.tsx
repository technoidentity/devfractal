// @TODO: implement useInputs? or export useFormContext?

import type { SelectProps } from '@mantine/core'
import { Inputs } from '@srtp/remix-react'
import { useDepartmentsSelect } from '~/common'

export type SelectDepartmentProps = Omit<SelectProps, 'data'>
export function SelectDepartment(props: SelectDepartmentProps) {
  const departments = useDepartmentsSelect()

  return (
    <Inputs.DynamicSelect
      searchable
      clearable
      allowDeselect
      data={departments}
      name="departmentId"
      placeholder="Select Department"
      label="Department"
      size="xs"
      {...props}
    />
  )
}

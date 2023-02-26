// @TODO: implement useInputs? or export useFormContext?

import { SelectProps } from '@mantine/core'
import type { InputsType } from '@srtp/remix-react'
import type { FormSpec } from '@srtp/validator'
import { useUsersSelect } from '~/common'

export type SelectUserProps<T extends FormSpec = FormSpec> = Omit<
  SelectProps,
  'data' | 'name'
> & {
  Inputs: InputsType<T>
  name?: string
}

export function SelectUser<T extends FormSpec = FormSpec>({
  Inputs,
  ...props
}: SelectUserProps<T>) {
  const users = useUsersSelect()

  return (
    <Inputs.DynamicSelect
      searchable
      clearable
      data={users}
      label="User"
      name="tiId"
      placeholder="Select User"
      {...props}
    />
  )
}

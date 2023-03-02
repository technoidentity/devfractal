// @TODO: implement useInputs? or export useFormContext?

import type { SelectProps } from '@mantine/core'
import { Inputs } from '@srtp/remix-react'
import { useUsersSelect } from '~/common'

export type SelectUserProps = Omit<SelectProps, 'data'>

export function SelectUser(props: SelectUserProps) {
  const users = useUsersSelect()

  return (
    <Inputs.DynamicSelect
      searchable
      clearable
      data={users}
      label="User"
      placeholder="Select User"
      name="tiId"
      {...props}
    />
  )
}

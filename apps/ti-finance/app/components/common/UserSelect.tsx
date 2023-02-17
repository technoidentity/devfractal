// @TODO: implement useInputs? or export useFormContext?

import type { InputsType } from '@srtp/remix-react'
import type { FormSchema } from '@srtp/validator'
import React from 'react'
import { useUsers } from '~/common/context'
import { capitalizeFirstLetter } from '~/common/stringUtil'

export type UserSelectProps<T extends FormSchema = FormSchema> = {
  Inputs: InputsType<T>
  name?: string
}

export function UserSelect<T extends FormSchema = FormSchema>({
  Inputs,
  name,
}: UserSelectProps<T>) {
  const { users } = useUsers()

  const data = React.useMemo(
    () =>
      users.map(u => ({
        value: u.id,
        label: capitalizeFirstLetter(u.username),
      })),
    [users],
  )

  return (
    <Inputs.DynamicSelect data={data} name={name as any} label="User" mt="xs" />
  )
}

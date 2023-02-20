// @TODO: implement useInputs? or export useFormContext?

import type { InputsType } from '@srtp/remix-react'
import type { FormSpec } from '@srtp/validator'
import { useUsersSelect } from '~/common'

export type SelectUserProps<T extends FormSpec = FormSpec> = {
  Inputs: InputsType<T>
  name: string
}

export function SelectUser<T extends FormSpec = FormSpec>({
  Inputs,
  name,
}: SelectUserProps<T>) {
  const users = useUsersSelect()

  return <Inputs.DynamicSelect data={users} name={name} label="User" mt="xs" />
}

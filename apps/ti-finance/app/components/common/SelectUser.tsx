// @TODO: implement useInputs? or export useFormContext?

import type { InputsType } from '@srtp/remix-react'
import type { FormSchema } from '@srtp/validator'
import { useUsersSelect } from '~/common/context'

export type SelectUserProps<T extends FormSchema = FormSchema> = {
  Inputs: InputsType<T>
  name: string
}

export function SelectUser<T extends FormSchema = FormSchema>({
  Inputs,
  name,
}: SelectUserProps<T>) {
  const users = useUsersSelect()

  return <Inputs.DynamicSelect data={users} name={name} label="User" mt="xs" />
}

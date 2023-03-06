import type { CreateAccessSpec } from '~/common'
import { SelectDepartment, useUsersSelect } from '~/common'
import type { FormFieldsProps } from '~/core'

export function FormFields({
  Inputs,
}: FormFieldsProps<typeof CreateAccessSpec>) {
  const data = useUsersSelect()
  return (
    <>
      <SelectDepartment />
      <Inputs.DynamicEnumList
        data={data}
        label="access users"
        name="accessTiIds"
        mt="xs"
      />
    </>
  )
}

import { Radio } from '@mantine/core'
import type { Department } from '@prisma/client'
import type { InputsType } from '@srtp/remix-react'
import type { FormSchema } from '@srtp/validator'
import { capitalizeFirstLetter } from '~/common/stringUtil'

export type FormFieldsProps<T extends FormSchema> = Readonly<{
  Inputs: InputsType<T>
  departments: ReadonlyArray<Pick<Department, 'id' | 'name'>>
}>

export function FormFields<T extends FormSchema>({
  Inputs,
  departments,
}: FormFieldsProps<T>) {
  const data = departments.map(d => ({
    value: d.id.toString(),
    label: capitalizeFirstLetter(d.name),
  }))

  return (
    <>
      <Inputs.DynamicSelect
        data={data}
        name="departmentId"
        label="Department"
        mt="xs"
      />

      <Inputs.Number label="Amount" name="amount" mt="xs" />

      <Inputs.DatePicker
        placeholder="Pick date"
        name="date"
        label="Date"
        mt="xs"
      />
      <Inputs.Enum name="category">
        <Radio value="billable" label="Billable" />
        <Radio value="nonBillable" label="Non Billable" />
      </Inputs.Enum>

      <Inputs.Content label="Remarks" name="remarks" mt="xs" />
    </>
  )
}

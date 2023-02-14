import { Radio } from '@mantine/core'
import type { Department } from '@prisma/client'
import type { InputsType } from '@srtp/remix-react'
import { capitalizeFirstLetter } from '~/common/stringUtil'
import type { ExpenditureSchema } from '~/common/validators'

export type FormFieldsProps = Readonly<{
  Inputs: InputsType<typeof ExpenditureSchema>
  departments: ReadonlyArray<Pick<Department, 'id' | 'department'>>
}>

export const FormFields = ({ Inputs, departments }: FormFieldsProps) => {
  const data = departments.map(d => ({
    value: d.id.toString(),
    label: capitalizeFirstLetter(d.department),
  }))

  return (
    <>
      <Inputs.Hidden name="id" />
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
      <Inputs.Enum name="category" values={['billable', 'nonBillable']}>
        <Radio value="billable" label="Billable" />
        <Radio value="nonBillable" label="Non Billable" />
      </Inputs.Enum>

      <Inputs.Content label="Remarks" name="remarks" mt="xs" />
    </>
  )
}

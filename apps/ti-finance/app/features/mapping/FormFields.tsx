import { Radio } from '@mantine/core'
import type { CreateMappingSpec, MappingSpec } from '~/common'
import { SelectDepartment, SelectUser } from '~/common'
import type { FormFieldsProps } from '~/core'

export function FormFields({
  Inputs,
}:
  | FormFieldsProps<typeof MappingSpec>
  | FormFieldsProps<typeof CreateMappingSpec>) {
  return (
    <>
      <SelectUser />
      <SelectDepartment name="departmentId" />

      <Inputs.Number
        label="CTC"
        name="ctc"
        placeholder="CTC if billable"
        mt="xs"
      />

      <Inputs.DatePicker
        placeholder="Pick date"
        name="fromDate"
        label="From date"
        mt="xs"
      />

      <Inputs.DatePicker
        placeholder="Pick date"
        name="toDate"
        label="To date"
        mt="xs"
      />

      <Inputs.Enum name="category">
        <Radio value="billable" label="Billable" />
        <Radio value="nonBillable" label="Non Billable" />
      </Inputs.Enum>
    </>
  )
}

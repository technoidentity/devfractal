import { Radio } from '@mantine/core'
import type { FormSpec } from '@srtp/validator'
import { useDepartmentsSelect } from '~/common'
import type { FormFieldsProps } from '../common'

export function FormFields<T extends FormSpec>({ Inputs }: FormFieldsProps<T>) {
  const data = useDepartmentsSelect()

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

import { Radio } from '@mantine/core'
import type { CreateExpenditureSpec, ExpenditureSpec } from '~/common'
import { SelectDepartment } from '~/common'
import type { FormFieldsProps } from '~/core'

export function FormFields<
  T extends typeof ExpenditureSpec | typeof CreateExpenditureSpec,
>({ Inputs }: FormFieldsProps<T>) {
  return (
    <>
      <SelectDepartment mt="xs" />
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

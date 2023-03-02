import type { CreateCtcSpec, CtcSpec } from '~/common'
import { SelectUser } from '~/common'
import type { FormFieldsProps } from '~/core'

export function FormFields({
  Inputs,
}: FormFieldsProps<typeof CtcSpec> | FormFieldsProps<typeof CreateCtcSpec>) {
  return (
    <>
      <SelectUser />

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
    </>
  )
}

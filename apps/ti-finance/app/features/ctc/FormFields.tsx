import type { CreateCtcSpec, CtcSpec } from '~/common'
import { SelectUser } from '~/common'
import type { FormFieldsProps } from '~/core'

// @TODO: 'name' typesafety not working
export function FormFields<T extends typeof CtcSpec | typeof CreateCtcSpec>({
  Inputs,
}: FormFieldsProps<T>) {
  return (
    <>
      <SelectUser Inputs={Inputs} name="tiId" />

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

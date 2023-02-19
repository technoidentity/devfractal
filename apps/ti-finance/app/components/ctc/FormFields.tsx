import type { FormSchema } from '@srtp/validator'
import type { FormFieldsProps } from '../common'
import { SelectUser } from '../common'

export function FormFields<T extends FormSchema>({
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

import type { InputsType } from '@srtp/remix-react'
import type { FormSchema } from '@srtp/validator'
import { UserSelect } from '../common'

export type FormFieldsProps<T extends FormSchema> = Readonly<{
  Inputs: InputsType<T>
}>

export function FormFields<T extends FormSchema>({
  Inputs,
}: FormFieldsProps<T>) {
  return (
    <>
      <UserSelect Inputs={Inputs} name="tiId" />

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

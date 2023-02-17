import { Radio } from '@mantine/core'
import type { InputsType } from '@srtp/remix-react'
import type { FormSchema } from '@srtp/validator'
import { DepartmentSelect, UserSelect } from '../common'

export type CreateFormFieldsProps<T extends FormSchema> = Readonly<{
  Inputs: InputsType<T>
}>

export function FormFields<T extends FormSchema>({
  Inputs,
}: CreateFormFieldsProps<T>) {
  return (
    <>
      <UserSelect Inputs={Inputs} name="tiId" />
      <DepartmentSelect Inputs={Inputs} name="departmentId" />

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

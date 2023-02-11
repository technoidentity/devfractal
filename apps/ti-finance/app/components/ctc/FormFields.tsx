import type { Inputs } from '@srtp/remix-react'
import type { CtcSchema } from '~/common/validators'

export type FormFieldsProps = Readonly<{
  Inputs: Inputs<typeof CtcSchema>
}>

export const FormFields = ({ Inputs }: FormFieldsProps) => (
  <>
    <Inputs.Str label="TI_ID" name="id" placeholder="Employee ID" mt="xs" />

    <Inputs.Str
      label="Username"
      name="name"
      placeholder="Employee Fullname"
      mt="xs"
    />

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

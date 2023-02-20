import { Group } from '@mantine/core'
import { createInputsGroup } from '@srtp/remix-react'
import { z } from 'zod'
import { useDepartmentsSelect } from '~/common'

const FiltersSchema = z.object({
  fromDate: z.date(),
  toDate: z.date(),
  department: z.string(),
})

const { Inputs, InputsGroup } = createInputsGroup(FiltersSchema)

export const CostFilters = () => {
  const departments = useDepartmentsSelect()

  return (
    <InputsGroup onChange={console.log}>
      <Group position="left" m="md">
        <Inputs.DatePicker name="fromDate" size="xs" label="From Date" />
        <Inputs.DatePicker name="toDate" size="xs" label="To Date" />
        <Inputs.DynamicSelect
          name="department"
          label="Department"
          data={departments}
          size="xs"
        />
      </Group>
    </InputsGroup>
  )
}

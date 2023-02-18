import { Group } from '@mantine/core'
import { Billable } from '@prisma/client'
import { createInputsGroup } from '@srtp/remix-react'
import { z } from 'zod'
import { useDepartmentsSelect } from '~/common/context'

const FiltersSchema = z.object({
  fromDate: z.date(),
  toDate: z.date(),
  category: z.nativeEnum(Billable),
  department: z.string(),
  financialYear: z.date(),
})

const { Inputs, InputsGroup } = createInputsGroup(FiltersSchema)

const categories = [
  { value: 'billable', label: 'Billable' },
  { value: 'nonBillable', label: 'Non_Billable' },
]

export const Filters = () => {
  const departments = useDepartmentsSelect()

  return (
    <InputsGroup onChange={console.log}>
      <Group>
        <Inputs.DatePicker name="fromDate" size="xs" label="From Date" />
        <Inputs.DatePicker name="toDate" size="xs" label="To Date" />
        <Inputs.Select
          name="category"
          label="Category"
          size="xs"
          data={categories}
        />

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

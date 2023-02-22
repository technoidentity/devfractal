import { Group } from '@mantine/core'
import { Billable } from '@prisma/client'
import { z } from 'zod'
import { useDepartmentsSelect } from '~/common'
import type { SearchInputsProps } from '~/core'
import { SearchForm } from '~/core'

export const ExpenditureSearchSpec = z.object({
  dateRange: z.array(z.coerce.date()),
  category: z.nativeEnum(Billable),
  departmentId: z.coerce.number(),
})

export type ExpenditureSearchSpec = z.infer<typeof ExpenditureSearchSpec>

const categories = [
  { value: 'billable', label: 'Billable' },
  { value: 'nonBillable', label: 'Non_Billable' },
]

export function ExpenditureInputs({
  Inputs,
}: SearchInputsProps<typeof ExpenditureSearchSpec>) {
  const departments = useDepartmentsSelect()

  return (
    <Group>
      <Inputs.DateRangePicker
        name="dateRange"
        size="xs"
        label="From and To Date"
      />

      <Inputs.Select
        allowDeselect
        name="category"
        label="Category"
        size="xs"
        data={categories}
      />

      <Inputs.DynamicSelect
        allowDeselect
        name="departmentId"
        label="Department"
        data={departments}
        size="xs"
      />
    </Group>
  )
}

export function ExpenditureSearchForm() {
  return (
    <SearchForm spec={ExpenditureSearchSpec} SearchFields={ExpenditureInputs} />
  )
}

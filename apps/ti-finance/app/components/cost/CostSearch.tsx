import { Group } from '@mantine/core'
import { z } from 'zod'
import { useDepartmentsSelect } from '~/common'
import type { SearchInputsProps } from '../common'
import { SearchForm } from '../common'

export const CostSearchSpec = z.object({
  dateRange: z.array(z.coerce.date()),

  departmentId: z.coerce.number(),
})

export type CostSearchSpec = z.infer<typeof CostSearchSpec>

export function CostInputs({
  Inputs,
}: SearchInputsProps<typeof CostSearchSpec>) {
  const departments = useDepartmentsSelect()

  return (
    <Group position="left" m="md">
      <Inputs.DateRangePicker
        name="dateRange"
        size="xs"
        label="From and To Date"
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

export function CostSearchForm() {
  return <SearchForm spec={CostSearchSpec} SearchFields={CostInputs} />
}

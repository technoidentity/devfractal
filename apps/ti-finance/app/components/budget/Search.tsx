import { Group } from '@mantine/core'
import { getYearsRange } from '@mantine/dates'
import { z } from 'zod'
import { useDepartmentsSelect } from '~/common'
import type { SearchInputsProps } from '../common'
import { SearchForm } from '../common'

export const BudgetSearchSpec = z.object({
  departmentId: z.coerce.number(),
  financialYear: z.coerce.number(),
})

export type BudgetSearchSpec = z.infer<typeof BudgetSearchSpec>
export type FiltersValues = Partial<BudgetSearchSpec>

const years = getYearsRange({ from: 2015, to: 2030 }).map(year =>
  year.toString(),
)

export function BudgetInputs({
  Inputs,
}: SearchInputsProps<typeof BudgetSearchSpec>) {
  const departments = useDepartmentsSelect()

  return (
    <Group mt="xl" mb="lg" ml="sm">
      <Inputs.DynamicSelect
        allowDeselect
        name="departmentId"
        label="Department"
        data={departments}
        size="xs"
      />
      <Inputs.DynamicSelect
        allowDeselect
        name="financialYear"
        label="Financial year"
        data={years}
        size="xs"
      />
    </Group>
  )
}

export function BudgetSearchForm() {
  return <SearchForm spec={BudgetSearchSpec} SearchFields={BudgetInputs} />
}

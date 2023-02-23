import { Group } from '@mantine/core'
import { getYearsRange } from '@mantine/dates'
import { BudgetSearchSpec, useDepartmentsSelect } from '~/common'
import type { SearchInputsProps } from '~/core'
import { SearchForm } from '~/core'

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

import { Group } from '@mantine/core'
import { getYearsRange } from '@mantine/dates'
import { BudgetSearchSpec, SelectDepartment } from '~/common'
import type { SearchInputsProps } from '~/core'
import { SearchForm } from '~/core'

const years = getYearsRange({ from: 2015, to: 2030 }).map(year =>
  year.toString(),
)

export function BudgetInputs({
  Inputs,
}: SearchInputsProps<typeof BudgetSearchSpec>) {
  return (
    <Group mt="xl" mb="lg" ml="sm">
      <SelectDepartment Inputs={Inputs} size="xs" />
      <Inputs.DynamicSelect
        clearable
        searchable
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

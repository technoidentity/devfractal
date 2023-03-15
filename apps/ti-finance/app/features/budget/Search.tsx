import { Group } from '@mantine/core'
import { range } from '@srtp/core'
import { BudgetSearchSpec, SelectDepartment } from '~/common'
import type { SearchInputsProps } from '~/core'
import { SearchForm } from '~/core'

const years = range(2015, 2030).map(year => year.toString())

export function BudgetInputs({
  Inputs,
}: SearchInputsProps<typeof BudgetSearchSpec>) {
  return (
    <Group mt="xl" mb="lg" ml="sm">
      <SelectDepartment />
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

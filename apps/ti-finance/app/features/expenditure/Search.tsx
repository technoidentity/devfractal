import { Group } from '@mantine/core'
import { ExpenditureSearchSpec, useDepartmentsSelect } from '~/common'
import type { SearchInputsProps } from '~/core'
import { SearchForm } from '~/core'

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

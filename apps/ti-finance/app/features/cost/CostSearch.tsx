import { Group } from '@mantine/core'
import { CostSearchSpec, useDepartmentsSelect } from '~/common'
import type { SearchInputsProps } from '~/core'
import { SearchForm } from '~/core'

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

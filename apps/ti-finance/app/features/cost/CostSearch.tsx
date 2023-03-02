import { Group } from '@mantine/core'
import { CostSearchSpec, SelectDepartment } from '~/common'
import type { SearchInputsProps } from '~/core'
import { SearchForm } from '~/core'

export function CostInputs({
  Inputs,
}: SearchInputsProps<typeof CostSearchSpec>) {
  return (
    <Group position="left" m="md">
      <Inputs.DateRangePicker
        name="dateRange"
        size="xs"
        label="From and To Date"
      />
      <SelectDepartment size="xs" />
    </Group>
  )
}

export function CostSearchForm() {
  return <SearchForm spec={CostSearchSpec} SearchFields={CostInputs} />
}

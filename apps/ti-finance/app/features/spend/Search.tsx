import { Group } from '@mantine/core'
import { SelectUser, SpendSearchSpec } from '~/common'
import type { SearchInputsProps } from '~/core'
import { SearchForm } from '~/core'

export function SpendInputs({
  Inputs,
}: SearchInputsProps<typeof SpendSearchSpec>) {
  return (
    <Group position="left" m="md">
      <Inputs.DateRangePicker
        name="dateRange"
        placeholder="Pick from and to date"
        label="Date range"
        size="xs"
      />
      <SelectUser />
    </Group>
  )
}

export function SpendSearchForm() {
  return <SearchForm spec={SpendSearchSpec} SearchFields={SpendInputs} />
}

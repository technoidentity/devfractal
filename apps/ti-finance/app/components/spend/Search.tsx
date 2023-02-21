import { Group } from '@mantine/core'
import { z } from 'zod'
import { useUsersSelect } from '~/common'
import type { SearchInputsProps } from '../common'
import { SearchForm } from '../common'

export const SpendSearchSpec = z.object({
  dateRange: z.array(z.coerce.date()),
  tiId: z.string(),
})

export type SpendSearchSpec = z.infer<typeof SpendSearchSpec>

export function SpendInputs<T extends z.AnyZodObject>({
  Inputs,
}: SearchInputsProps<T>) {
  const userData = useUsersSelect()

  return (
    <Group position="left" m="md">
      <Inputs.DateRangePicker
        amountOfMonths={2}
        name="dateRange"
        placeholder="Pick from and to date"
        label="Date range"
        size="xs"
      />
      <Inputs.DynamicSelect
        allowDeselect
        name="tiId"
        size="xs"
        label="Person"
        data={userData}
      />
    </Group>
  )
}

export function SpendSearchForm() {
  return <SearchForm spec={SpendSearchSpec} SearchFields={SpendInputs} />
}

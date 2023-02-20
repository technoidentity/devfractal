import { Group } from '@mantine/core'
import { createInputsGroup } from '@srtp/remix-react'
import { z } from 'zod'
import { useUsersSelect } from '~/common'

export const SpendFiltersSpec = z.object({
  dateRange: z.array(z.coerce.date()),
  tiId: z.string(),
})

export type SpendFiltersSpec = z.infer<typeof SpendFiltersSpec>
export type FiltersValues = Partial<SpendFiltersSpec>

const { Inputs, InputsGroup } = createInputsGroup(SpendFiltersSpec)

export type SpendFiltersProps = Readonly<{
  onFilterChange: (values: FiltersValues) => void
}>

export const Filters = ({ onFilterChange }: SpendFiltersProps) => {
  const userData = useUsersSelect()

  return (
    <InputsGroup onChange={onFilterChange}>
      <Group position="left" m="md">
        <Inputs.DateRangePicker
          amountOfMonths={2}
          name="dateRange"
          placeholder="Pick from and to date"
          label="Date range"
          size="xs"
        />
        <Inputs.DynamicSelect
          name="tiId"
          size="xs"
          label="Person"
          data={userData}
        />
      </Group>
    </InputsGroup>
  )
}

import { Group } from '@mantine/core'
import { createInputsGroup } from '@srtp/remix-react'
import { z } from 'zod'
import { useDepartmentsSelect } from '~/common'
import { getYearsRange } from '@mantine/dates'

export const BudgetFiltersSpec = z.object({
  departmentId: z.coerce.number(),
  financialYear: z.coerce.number(),
})

export type BudgetFiltersSpec = z.infer<typeof BudgetFiltersSpec>
export type FiltersValues = Partial<BudgetFiltersSpec>

const { Inputs, InputsGroup } = createInputsGroup(BudgetFiltersSpec)

const years = getYearsRange({ from: 2015, to: 2030 }).map(year =>
  year.toString(),
)

export type BudgetFiltersProps = Readonly<{
  onFilterChange(filters: Partial<FiltersValues>): void
}>

export const BudgetFilters = ({ onFilterChange }: BudgetFiltersProps) => {
  const departments = useDepartmentsSelect()

  return (
    <InputsGroup onChange={onFilterChange}>
      <Group mt="xl" mb="lg" ml="sm">
        <Inputs.DynamicSelect
          name="departmentId"
          label="Department"
          data={departments}
          size="xs"
        />
        <Inputs.DynamicSelect
          name="financialYear"
          label="Financial year"
          data={years}
          size="xs"
        />
      </Group>
    </InputsGroup>
  )
}

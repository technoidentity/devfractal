import { Group, Text } from '@mantine/core'
import { createInputsGroup } from '@srtp/remix-react'
import { z } from 'zod'
import { useDepartmentsSelect, useUsersSelect } from '~/common'

export const MappingFiltersSpec = z.object({
  departmentId: z.coerce.number().int(),
  tiId: z.string(),
})

export type MappingFiltersSpec = z.infer<typeof MappingFiltersSpec>
export type FiltersValues = Partial<MappingFiltersSpec>

const { Inputs, InputsGroup } = createInputsGroup(MappingFiltersSpec)

export type MappingFiltersProps = Readonly<{
  onFilterChange(filters: Partial<FiltersValues>): void
}>

export const MappingFilters = ({ onFilterChange }: MappingFiltersProps) => {
  const departmentsData = useDepartmentsSelect()
  const usersData = useUsersSelect()

  return (
    <InputsGroup onChange={onFilterChange}>
      <Group>
        <Text mt="md" fw="bold" size="sm">
          Filter by:{' '}
        </Text>
        <Inputs.DynamicSelect
          name="departmentId"
          label="Department"
          data={departmentsData}
          size="xs"
        />
        <Inputs.DynamicSelect
          name="tiId"
          label="Name"
          data={usersData}
          size="xs"
        />
      </Group>
    </InputsGroup>
  )
}

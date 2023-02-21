import { Group, Text } from '@mantine/core'
import { z } from 'zod'
import { useDepartmentsSelect, useUsersSelect } from '~/common'
import type { SearchInputsProps } from '../common'
import { SearchForm } from '../common'

export const MappingSearchSpec = z.object({
  departmentId: z.coerce.number().int(),
  tiId: z.string(),
})

export type MappingSearchSpec = z.infer<typeof MappingSearchSpec>

export function MappingInputs({
  Inputs,
}: SearchInputsProps<typeof MappingSearchSpec>) {
  const departmentsData = useDepartmentsSelect()
  const usersData = useUsersSelect()

  return (
    <Group>
      <Text mt="md" fw="bold" size="sm">
        Filter by:{' '}
      </Text>
      <Inputs.DynamicSelect
        allowDeselect
        name="departmentId"
        label="Department"
        data={departmentsData}
        size="xs"
      />
      <Inputs.DynamicSelect
        allowDeselect
        name="tiId"
        label="Name"
        data={usersData}
        size="xs"
      />
    </Group>
  )
}

export function MappingSearchForm() {
  return <SearchForm spec={MappingSearchSpec} SearchFields={MappingInputs} />
}

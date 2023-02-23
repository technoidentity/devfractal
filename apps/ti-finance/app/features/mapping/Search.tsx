import { Group, Text } from '@mantine/core'
import {
  MappingSearchSpec,
  useDepartmentsSelect,
  useUsersSelect,
} from '~/common'
import type { SearchInputsProps } from '~/core'
import { SearchForm } from '~/core'

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

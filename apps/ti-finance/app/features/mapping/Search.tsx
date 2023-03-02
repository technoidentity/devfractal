import { Group, Text } from '@mantine/core'
import { MappingSearchSpec, SelectDepartment, SelectUser } from '~/common'
import type { SearchInputsProps } from '~/core'
import { SearchForm } from '~/core'

export function MappingInputs({
  Inputs,
}: SearchInputsProps<typeof MappingSearchSpec>) {
  return (
    <Group>
      <Text mt="md" fw="bold" size="sm">
        Filter by:{' '}
      </Text>
      <SelectDepartment />
      <SelectUser />
    </Group>
  )
}

export function MappingSearchForm() {
  return <SearchForm spec={MappingSearchSpec} SearchFields={MappingInputs} />
}

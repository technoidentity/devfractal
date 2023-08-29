import { Radio, RadioGroup, Stack } from '@chakra-ui/react'

import type { Filter } from '../types'

export type FilterViewProps = Readonly<{
  value: Filter
  onFilterChange(filter: Filter): void
}>

export const FilterView = ({ value, onFilterChange }: FilterViewProps) => {
  return (
    <RadioGroup
      onChange={onFilterChange}
      value={value}
      m="2"
      colorScheme="green"
    >
      <Stack direction="row">
        <Radio value="All">All</Radio>
        <Radio value="Active">Active</Radio>
        <Radio value="Completed">Completed</Radio>
      </Stack>
    </RadioGroup>
  )
}

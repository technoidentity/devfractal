import { Flex, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import type { TaskFilter } from '@srtp/fake-tasks'

export type FilterViewProps = Readonly<{
  filter: TaskFilter
  limit?: number
  onLimitChange?(limit: number): void
  onFilterChange(filter: TaskFilter): void
}>

export const FilterView = ({
  filter,
  onFilterChange,
  limit,
  onLimitChange,
}: FilterViewProps) => (
  <Flex direction="row">
    <RadioGroup onChange={onFilterChange} value={filter} p="2">
      <Stack direction="row">
        <Radio value="All">All</Radio>
        <Radio value="Completed">Completed</Radio>
        <Radio value="Incomplete">Incomplete</Radio>
      </Stack>
    </RadioGroup>
    {limit && onLimitChange && (
      <Input
        value={limit}
        onChange={evt =>
          onLimitChange(
            Number.isInteger(evt.target.value) ? Number(evt.target.value) : 0,
          )
        }
        placeholder="limit"
        flexGrow={0}
        width="auto"
      />
    )}
  </Flex>
)

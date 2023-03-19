import React from 'react'
import { map, pipe, range, toArray } from '@srtp/fn'
import { HStack, Select } from '@chakra-ui/react'

const dates = pipe(
  range(1, 30),
  map(v => v),
  toArray,
)

const months = pipe(
  range(1, 12),
  map(v => v),
  toArray,
)

const years = pipe(
  range(2000, 2030),
  map(v => v),
  toArray,
)

export const DatePickerView = () => {
  return (
    <HStack>
      <Select>
        {dates.map(d => (
          <option value={d} key={d}>
            {d}
          </option>
        ))}
      </Select>
      <Select>
        {months.map(d => (
          <option value={d} key={d}>
            {d}
          </option>
        ))}
      </Select>
      <Select>
        {years.map(d => (
          <option value={d} key={d}>
            {d}
          </option>
        ))}
      </Select>
    </HStack>
  )
}

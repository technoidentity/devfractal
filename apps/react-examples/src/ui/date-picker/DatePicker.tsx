import React from 'react'

import { HStack, Select } from '@chakra-ui/react'
import { range } from '@srtp/core'

const dates = range(1, 30).map(v => v)
const months = range(1, 12).map(v => v)
const years = range(2000, 2030).map(v => v)

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

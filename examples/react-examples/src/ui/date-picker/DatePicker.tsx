import { HStack, Select } from '@chakra-ui/react'
import { toInt } from '@srtp/core'
import { chain, map, range } from '@srtp/fn'
import { useUpdate } from '@srtp/react'

const dates = chain(
  range(1, 30),
  map(v => v),
)

const months = chain(
  range(1, 12),
  map(v => v),
)

const years = chain(
  range(2000, 2030),
  map(v => v),
)

const currentDate = new Date()

export const DatePickerView = () => {
  const [{ day, month, year }, { setDay, setMonth, setYear }] = useUpdate({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    day: currentDate.getDate(),
  })

  return (
    <HStack>
      <Select value={day} onChange={evt => setDay(toInt(evt.target.value))}>
        {dates.map(d => (
          <option value={d} key={d}>
            {d}
          </option>
        ))}
      </Select>
      <Select value={month} onChange={evt => setMonth(toInt(evt.target.value))}>
        {months.map(d => (
          <option value={d} key={d}>
            {d}
          </option>
        ))}
      </Select>
      <Select value={year} onChange={evt => setYear(toInt(evt.target.value))}>
        {years.map(d => (
          <option value={d} key={d}>
            {d}
          </option>
        ))}
      </Select>
    </HStack>
  )
}

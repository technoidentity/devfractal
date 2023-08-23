import { HStack, Select } from '@chakra-ui/react'
import { map, pipe, range, toArray } from '@srtp/fn'
import { useUpdate } from '@srtp/react'
import { toInt } from '@srtp/core'

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

const currentDate = new Date()

export const DatePickerView = () => {
  const [{ day, month, year }, { setDay, setMonth, setYear }] = useUpdate({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    day: currentDate.getDate(),
  })

  console.log({ day, month, year })

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

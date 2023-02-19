import { Group } from '@mantine/core'
import { createInputsGroup } from '@srtp/remix-react'
import { z } from 'zod'
import { useUsersSelect } from '~/common'

const FiltersSchema = z.object({
  fromDate: z.date(),
  toDate: z.date(),
  name: z.string(),
})

const { Inputs, InputsGroup } = createInputsGroup(FiltersSchema)

export const Filters = () => {
  const userData = useUsersSelect()

  return (
    <InputsGroup onChange={console.log}>
      <Group position="left" m="md">
        <Inputs.DatePicker
          name="fromDate"
          placeholder="Pick date"
          label="From date"
          size="xs"
        />
        <Inputs.DatePicker
          name="toDate"
          placeholder="Pick date"
          label="To date"
          size="xs"
        />
        <Inputs.DynamicSelect
          name="name"
          size="xs"
          label="Person"
          data={userData}
        />
      </Group>
    </InputsGroup>
  )
}

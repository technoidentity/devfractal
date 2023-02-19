import { Group } from '@mantine/core'
import { createInputsGroup } from '@srtp/remix-react'
import { z } from 'zod'
import { useDepartmentsSelect } from '~/common'

const FiltersSchema = z.object({
  department: z.string(),
  financialYear: z.date(),
})

const { Inputs, InputsGroup } = createInputsGroup(FiltersSchema)

export const Filters = () => {
  const departments = useDepartmentsSelect()

  return (
    <InputsGroup onChange={console.log}>
      <Group mt="xl" mb="lg" ml="sm">
        <Inputs.DynamicSelect
          name="department"
          label="Department"
          data={departments}
          size="xs"
        />
        <Inputs.DatePicker
          name="financialYear"
          size="xs"
          label="Financial year"
        />
      </Group>
    </InputsGroup>
  )
}

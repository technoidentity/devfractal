import { Group, Text } from '@mantine/core'
import { createInputsGroup } from '@srtp/remix-react'
import { z } from 'zod'
import { useDepartmentsSelect, useUsersSelect } from '~/common'

const FiltersSchema = z.object({
  department: z.string(),
  name: z.string(),
})

const { Inputs, InputsGroup } = createInputsGroup(FiltersSchema)

export const Filters = () => {
  const departmentsData = useDepartmentsSelect()
  const usersData = useUsersSelect()

  return (
    <InputsGroup onChange={console.log}>
      <Group>
        <Text mt="md" fw="bold" size="sm">
          Filter by:{' '}
        </Text>
        <Inputs.DynamicSelect
          name="department"
          label="Department"
          data={departmentsData}
          size="xs"
        />
        <Inputs.DynamicSelect
          name="name"
          label="Name"
          data={usersData}
          size="xs"
        />
      </Group>
    </InputsGroup>
  )
}

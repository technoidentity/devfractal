import { Button, Group, Select, Text } from '@mantine/core'
import { useLoaderData } from '@remix-run/react'
import type { ActionArgs, LoaderArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import { isFail, notNil } from '@srtp/core'
import { badRequest, methods, safeAction } from '@srtp/remix-node'
import { number } from '@srtp/validator'
import React from 'react'
import { z } from 'zod'
import {
  useDepartmentsSelect,
  useUsers,
  useUsersSelect,
} from '~/common/context'

import { DepartmentMappingSchema } from '~/common/validators'
import { DepartmentList } from '~/components/department'
import {
  deleteDepartmentMapping,
  getDepartmentMappingsList,
  updateDepartmentMapping,
} from '~/models/departmentMapping.server'

export async function loader(_: LoaderArgs) {
  const mappings = await getDepartmentMappingsList()

  return json({ mappings })
}

export const action = (args: ActionArgs) =>
  methods(args, {
    PUT: async args => {
      console.log('PUT', await args.request.clone().formData())
      return safeAction(DepartmentMappingSchema, args, async values => {
        const result = await updateDepartmentMapping(values)
        return isFail(result) ? badRequest({ error: result.fail }) : json({})
      })
    },

    DELETE: args =>
      safeAction(z.object({ id: number }), args, async values => {
        const result = await deleteDepartmentMapping(values.id)
        return isFail(result) ? badRequest({ error: result.fail }) : json({})
      }),
  })

const DepartmentsPage = () => {
  const { mappings } = useLoaderData<typeof loader>()
  const { usersMap } = useUsers()

  const mappingsList = React.useMemo(
    () =>
      z
        .array(DepartmentMappingSchema)
        .parse(mappings)
        .map(d => ({ ...d, username: notNil(usersMap.get(d.tiId)?.username) })),
    [mappings, usersMap],
  )

  const departmentsData = useDepartmentsSelect()
  const usersData = useUsersSelect()

  return (
    <>
      <Group position="apart" m="md">
        <Button component="a" href="/department/new">
          Add
        </Button>
        <Group>
          <Text mt="md" fw="bold" size="sm">
            Filter by:{' '}
          </Text>
          <Select
            label="Department"
            data={departmentsData}
            size="xs"
            defaultValue={departmentsData[0].value}
          />
          <Select
            label="Name"
            data={usersData}
            size="xs"
            defaultValue={usersData[0].value}
          />
        </Group>
      </Group>
      <DepartmentList departmentList={mappingsList} />
    </>
  )
}

export default DepartmentsPage

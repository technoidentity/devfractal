import { Button, Group, Select, Text } from '@mantine/core'
import { useLoaderData } from '@remix-run/react'
import type { ActionArgs, LoaderArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import { isFail } from '@srtp/core'
import { badRequest, methods, safeAction } from '@srtp/remix-node'
import { number } from '@srtp/validator'
import React from 'react'
import { z } from 'zod'
import { capitalizeFirstLetter } from '~/common/stringUtil'

import { DepartmentMappingSchema } from '~/common/validators'
import { DepartmentList } from '~/components/department'
import {
  deleteDepartment,
  getDepartmentMappingsList,
  updateDepartment,
} from '~/models/department.server'

export async function loader(_: LoaderArgs) {
  const departments = await getDepartmentMappingsList()

  return json({ departments })
}

export const action = (args: ActionArgs) =>
  methods(args, {
    PUT: async args => {
      console.log('PUT', await args.request.clone().formData())
      return safeAction(DepartmentMappingSchema, args, async values => {
        const result = await updateDepartment(values)
        return isFail(result) ? badRequest({ error: result.fail }) : json({})
      })
    },

    DELETE: args =>
      safeAction(z.object({ id: number }), args, async values => {
        const result = await deleteDepartment(values.id)
        return isFail(result) ? badRequest({ error: result.fail }) : json({})
      }),
  })

const DepartmentsPage = () => {
  const { departments } = useLoaderData<typeof loader>()

  const names = departments.map(d => ({
    label: capitalizeFirstLetter(d.username),
    value: d.username,
  }))

  const departmentsData = [...new Set(departments.map(d => d.department))]

  const departmentData = departmentsData.map(d => ({
    label: d.toUpperCase(),
    value: d,
  }))

  const departmentList = React.useMemo(
    () => z.array(DepartmentMappingSchema).parse(departments),
    [departments],
  )

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
          <Select label="Department" data={departmentData} size="xs" />
          <Select label="Name" data={names} size="xs" />
        </Group>
      </Group>
      <DepartmentList departmentList={departmentList} />
    </>
  )
}

export default DepartmentsPage

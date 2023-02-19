import { Button, Group } from '@mantine/core'
import type { ActionArgs, LoaderArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import { get, isFail } from '@srtp/core'
import { badRequest, methods, safeAction } from '@srtp/remix-node'
import React from 'react'
import { z } from 'zod'
import { sjson, useGet, useUsers } from '~/common'

import { DepartmentMappingSchema, IntId } from '~/common/validators'
import { DepartmentList, Filters } from '~/components/department'
import {
  deleteDepartmentMapping,
  getDepartmentMappingsList,
  updateDepartmentMapping,
} from '~/models/departmentMapping.server'

export async function loader(_: LoaderArgs) {
  const mappings = await getDepartmentMappingsList()

  return sjson({ mappings })
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
      safeAction(IntId, args, async ({ id }) => {
        const result = await deleteDepartmentMapping(id)
        return isFail(result) ? badRequest({ error: result.fail }) : json({})
      }),
  })

const DepartmentsPage = () => {
  const { mappings } = useGet<typeof loader>()
  const { usersMap } = useUsers()

  const mappingsList = React.useMemo(
    () =>
      z
        .array(DepartmentMappingSchema)
        .parse(mappings)
        .map(d => ({ ...d, username: get(usersMap, d.tiId).username })),
    [mappings, usersMap],
  )

  return (
    <>
      <Group position="apart" m="md">
        <Button component="a" href="/department/new">
          Add
        </Button>
        <Filters />
      </Group>

      <DepartmentList departmentList={mappingsList} />
    </>
  )
}

export default DepartmentsPage

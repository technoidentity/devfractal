import { Button, Group } from '@mantine/core'
import { useSearchParams } from '@remix-run/react'
import type { ActionArgs, LoaderArgs } from '@remix-run/server-runtime'
import { get, isEmpty } from '@srtp/core'
import { actionResult, methods, safeAction, safeQuery } from '@srtp/remix-node'
import qs from 'query-string'
import React from 'react'
import { z } from 'zod'
import { IntId, MappingSpec, sjson, useGet, useUsers } from '~/common'
import { useSearch } from '~/components/common'
import type { FiltersValues } from '~/components/mapping'
import {
  MappingFilters,
  MappingFiltersSpec,
  MappingList,
} from '~/components/mapping'
import {
  deleteDepartmentMapping,
  getDepartmentMappingsList,
  updateDepartmentMapping,
} from '~/models'

export async function loader(args: LoaderArgs) {
  const where = safeQuery(MappingFiltersSpec.partial(), args.request)
  const mappings = await getDepartmentMappingsList(where)
  return sjson({ mappings })
}

export const action = (args: ActionArgs) =>
  methods(args, {
    PUT: async args =>
      safeAction(MappingSpec, args, async values => {
        const result = await updateDepartmentMapping(values)
        return actionResult(result)
      }),

    DELETE: args =>
      safeAction(IntId, args, async ({ id }) => {
        const result = await deleteDepartmentMapping(id)
        return actionResult(result)
      }),
  })

const DepartmentsPage = () => {
  const { mappings } = useGet<typeof loader>()
  const { usersMap } = useUsers()

  const mappingsList = React.useMemo(
    () =>
      z
        .array(MappingSpec)
        .parse(mappings)
        .map(d => ({ ...d, username: get(usersMap, d.tiId).username })),
    [mappings, usersMap],
  )

  const [, set] = useSearch(MappingFiltersSpec)

  const handleFilterChange = React.useCallback(
    (values: FiltersValues) => {
      console.dir(values)
      if (!isEmpty(values)) {
        set(values)
      }
    },
    [set],
  )

  return (
    <>
      <Group position="apart" m="md">
        <Button component="a" href="/department/new">
          Add
        </Button>

        <MappingFilters onFilterChange={handleFilterChange} />
      </Group>

      <MappingList departmentList={mappingsList} />
    </>
  )
}

export default DepartmentsPage

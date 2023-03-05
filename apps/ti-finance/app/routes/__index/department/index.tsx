import { Button, Group, Title } from '@mantine/core'
import type { ActionArgs, LoaderArgs } from '@remix-run/server-runtime'
import { method, methods, sjson } from '@srtp/remix-node'
import { useGet } from '@srtp/remix-react'
import { IntId, MappingSearchSpec, MappingSpec } from '~/common'
import { safeQuery } from '~/core'
import { MappingList, MappingSearchForm } from '~/features/mapping'
import {
  deleteDepartmentMapping,
  getDepartmentMappingsList,
  updateDepartmentMapping,
} from '~/models'

export async function loader(args: LoaderArgs) {
  const where = safeQuery(MappingSearchSpec, args.request)
  const mappings = await getDepartmentMappingsList(where)

  return sjson({ mappings })
}

export const action = (args: ActionArgs) =>
  methods(args, {
    PUT: method(MappingSpec, updateDepartmentMapping),
    DELETE: method(IntId, ({ id }) => deleteDepartmentMapping(id)),
  })

const DepartmentsPage = () => {
  const { mappings } = useGet<typeof loader>()

  return (
    <>
      <Title order={3} mb="xl">
        Department Person Mapping
      </Title>
      <Group position="apart" m="md">
        <Button component="a" href="/department/new">
          Add
        </Button>

        <MappingSearchForm />
      </Group>

      <MappingList departmentList={mappings} />
    </>
  )
}

export default DepartmentsPage

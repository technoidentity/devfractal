import { Button, Group } from '@mantine/core'
import type { ActionArgs, LoaderArgs } from '@remix-run/server-runtime'
import { method, methods } from '@srtp/remix-node'
import { IntId, MappingSpec } from '~/common'
import {
  MappingList,
  MappingSearchForm,
  MappingSearchSpec,
} from '~/features/mapping'
import { safeQuery, sjson, useGet } from '~/core'
import {
  deleteDepartmentMapping,
  getDepartmentMappingsList,
  updateDepartmentMapping,
} from '~/models'

export async function loader(args: LoaderArgs) {
  const where = safeQuery(MappingSearchSpec.partial(), args.request)
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

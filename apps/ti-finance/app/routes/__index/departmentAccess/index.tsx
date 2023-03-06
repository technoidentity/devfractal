import { Title } from '@mantine/core'
import type { ActionArgs, LoaderArgs } from '@remix-run/server-runtime'
import { method, methods, sjson } from '@srtp/remix-node'
import { useGet } from '@srtp/remix-react'
import { CreateAccessSpec, IntId } from '~/common'
import { AddLink } from '~/core'
import { DepartmentAccess } from '~/features/department/List'
import {
  getAccessList,
  deleteDepartmentAccess,
  updateDepartmentAccess,
} from '~/models/department.server'

export async function loader(args: LoaderArgs) {
  const accessList = await getAccessList()

  return sjson({ accessList: accessList })
}

export const action = (args: ActionArgs) =>
  methods(args, {
    PUT: method(CreateAccessSpec, updateDepartmentAccess),
    DELETE: method(IntId, ({ id }) => deleteDepartmentAccess(id)),
  })

const DepartmentAccessPage = () => {
  const { accessList } = useGet<typeof loader>()

  return (
    <>
      <Title order={3} mb="xl">
        Department Table
      </Title>
      {/* <Group position="apart" m="md">
        <Button component="a" href="/department/new">
          Add
        </Button>

        <MappingSearchForm />
      </Group> */}
      <AddLink link="/departmentAccess/new" />
      <DepartmentAccess departmentAccessList={accessList} />
    </>
  )
}

export default DepartmentAccessPage

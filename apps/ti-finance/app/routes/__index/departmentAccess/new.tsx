import type { ActionArgs } from '@remix-run/server-runtime'
import { onlyMethod } from '@srtp/remix-node'
import { CreateAccessSpec } from '~/common'
import { useServerErrors } from '~/core'
import { CreateDepartmentAccessForm } from '~/features/department/Create'
import { createDepartment } from '~/models/department.server'

export const action = async (args: ActionArgs) =>
  onlyMethod(args, CreateAccessSpec, createDepartment, {
    redirectUrl: '/departmentAccess',
  })

export const DepartmentAccessPage = () => {
  const actionData = useServerErrors(CreateAccessSpec)
  console.log({ actionData })
  return <CreateDepartmentAccessForm {...actionData} />
}

export default DepartmentAccessPage

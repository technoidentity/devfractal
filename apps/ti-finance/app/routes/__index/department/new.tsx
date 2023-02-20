import type { ActionArgs } from '@remix-run/server-runtime'
import { handleResult, safeAction } from '@srtp/remix-node'
import { CreateMappingSpec } from '~/common'
import { useServerErrors } from '~/components/common'
import { CreateDepartmentForm } from '~/components/department'
import { createDepartmentMapping } from '~/models'

export const action = (args: ActionArgs) =>
  safeAction(CreateMappingSpec, args, async values => {
    const departmentResult = await createDepartmentMapping(values)

    return handleResult(departmentResult, { redirectUrl: '/department' })
  })

export const DepartmentPage = () => {
  const actionData = useServerErrors(CreateMappingSpec)

  return <CreateDepartmentForm {...actionData} />
}

export default DepartmentPage

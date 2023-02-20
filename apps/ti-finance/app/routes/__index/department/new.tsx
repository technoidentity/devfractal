import type { ActionArgs } from '@remix-run/server-runtime'
import { actionResult, safeAction } from '@srtp/remix-node'
import { CreateMappingSpec } from '~/common'
import { useServerErrors } from '~/components/common'
import { CreateDepartmentForm } from '~/components/mapping'
import { createDepartmentMapping } from '~/models'

export const action = (args: ActionArgs) =>
  safeAction(CreateMappingSpec, args, async values => {
    const departmentResult = await createDepartmentMapping(values)

    return actionResult(departmentResult, { redirectUrl: '/department' })
  })

export const DepartmentPage = () => {
  const actionData = useServerErrors(CreateMappingSpec)

  return <CreateDepartmentForm {...actionData} />
}

export default DepartmentPage

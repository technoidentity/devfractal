import type { ActionArgs } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import { isFail } from '@srtp/core'
import { badRequest, safeAction } from '@srtp/remix-node'
import { useServerErrors } from '~/components/common'
import {
  CreateDepartmentForm,
  CreateMappingSchema,
} from '~/components/department'
import { createDepartmentMapping } from '~/models/departmentMapping.server'

export const action = (args: ActionArgs) =>
  safeAction(CreateMappingSchema, args, async values => {
    const departmentResult = await createDepartmentMapping(values)

    return isFail(departmentResult)
      ? badRequest<CreateMappingSchema>({ error: departmentResult.fail })
      : redirect('/department')
  })

export const DepartmentPage = () => {
  const actionData = useServerErrors(CreateMappingSchema)

  return <CreateDepartmentForm {...actionData} />
}

export default DepartmentPage

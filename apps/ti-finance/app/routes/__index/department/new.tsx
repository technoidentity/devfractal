import type { ActionArgs } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import { isOk } from '@srtp/core'
import { formErrors, fromFormData } from '@srtp/remix-core'
import { badRequest } from '@srtp/remix-node'
import { useServerErrors } from '~/components/common'
import { CreateDepartmentForm } from '~/components/department/Create'
import { CreateMappingSchema } from '~/components/department/specs'
import { createDepartmentMapping } from '~/models/departmentMapping.server'

export async function action({ request }: ActionArgs) {
  const result = await fromFormData(CreateMappingSchema, request)

  if (!result.success) {
    return badRequest({ fieldErrors: formErrors(result.error) })
  }

  const departmentResult = await createDepartmentMapping(result.data)

  return isOk(departmentResult)
    ? redirect('/department')
    : badRequest<CreateMappingSchema>({ error: departmentResult.fail })
}

export const DepartmentPage = () => {
  const actionData = useServerErrors(CreateMappingSchema)

  return <CreateDepartmentForm {...actionData} />
}

export default DepartmentPage

import { useActionData } from '@remix-run/react'
import type { ActionArgs } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import { isOk } from '@srtp/core'
import { badRequest, formErrors, fromFormData } from '~/common/utils'
import { DepartmentSchema } from '~/common/validators'
import { UserDepartment } from '~/components/department'
import { createDepartment } from '~/models/department.server'

export async function action({ request }: ActionArgs) {
  const result = await fromFormData(DepartmentSchema, request)

  if (!result.success) {
    return badRequest({ fieldErrors: formErrors(result.error) })
  }

  const departmentResult = await createDepartment(result.data)

  return isOk(departmentResult)
    ? redirect('/department')
    : badRequest<DepartmentSchema>({ error: departmentResult.fail })
}

export const DepartmentPage = () => {
  const actionData = useActionData()

  return <UserDepartment {...actionData} />
}

export default DepartmentPage

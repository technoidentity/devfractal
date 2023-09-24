import type { LoaderFunctionArgs } from '@remix-run/server-runtime'
import { onlyMethod } from '@srtp/remix-node'
import { CreateMappingSpec } from '~/common'
import { useServerErrors } from '~/core'
import { CreateDepartmentForm } from '~/features/mapping'
import { createDepartmentMapping } from '~/models'

export const action = (args: LoaderFunctionArgs) =>
  onlyMethod(args, CreateMappingSpec, createDepartmentMapping, {
    redirectUrl: '/department',
  })

export const DepartmentPage = () => {
  const actionData = useServerErrors(CreateMappingSpec)

  return <CreateDepartmentForm {...actionData} />
}

export default DepartmentPage

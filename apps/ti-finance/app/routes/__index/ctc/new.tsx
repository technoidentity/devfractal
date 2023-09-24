import type { LoaderFunctionArgs } from '@remix-run/server-runtime'
import { onlyMethod } from '@srtp/remix-node'
import { CreateCtcSpec } from '~/common'
import { CreateCtcForm } from '~/features/ctc'
import { useServerErrors } from '~/core'
import { createCtc } from '~/models'

export const action = (args: LoaderFunctionArgs) =>
  onlyMethod(args, CreateCtcSpec, createCtc, { redirectUrl: '/ctc' })

const AddCtcPage = () => {
  const actionData = useServerErrors(CreateCtcSpec)

  return <CreateCtcForm {...actionData} />
}

export default AddCtcPage

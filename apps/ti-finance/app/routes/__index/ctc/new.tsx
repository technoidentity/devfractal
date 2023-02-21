import type { ActionArgs } from '@remix-run/server-runtime'
import { onlyMethod } from '@srtp/remix-node'
import { CreateCtcSpec } from '~/common'
import { useServerErrors } from '~/components/common'
import { CreateCtcForm } from '~/components/ctc'
import { createCtc } from '~/models'

export const action = (args: ActionArgs) =>
  onlyMethod(args, CreateCtcSpec, createCtc, { redirectUrl: '/ctc' })

const AddCtcPage = () => {
  const actionData = useServerErrors(CreateCtcSpec)

  return <CreateCtcForm {...actionData} />
}

export default AddCtcPage

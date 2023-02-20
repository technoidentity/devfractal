import type { ActionArgs } from '@remix-run/server-runtime'
import { handleResult, safeAction } from '@srtp/remix-node'
import { CreateCtcSpec } from '~/common'
import { useServerErrors } from '~/components/common'
import { CreateCtcForm } from '~/components/ctc'
import { createCtc } from '~/models'

export const action = (args: ActionArgs) =>
  safeAction(CreateCtcSpec, args, async values => {
    const userResult = await createCtc(values)

    return handleResult(userResult, { redirectUrl: '/ctc' })
  })

const AddCtcPage = () => {
  const actionData = useServerErrors(CreateCtcSpec)

  return <CreateCtcForm {...actionData} />
}

export default AddCtcPage

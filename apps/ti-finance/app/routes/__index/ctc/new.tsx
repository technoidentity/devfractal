import type { ActionArgs } from '@remix-run/server-runtime'
import { handleResult, safeAction } from '@srtp/remix-node'
import { CreateCtcSchema } from '~/common'
import { useServerErrors } from '~/components/common'
import { CreateCtcForm } from '~/components/ctc'
import { createCtc } from '~/models'

export const action = (args: ActionArgs) =>
  safeAction(CreateCtcSchema, args, async values => {
    const userResult = await createCtc(values)

    return handleResult(userResult, { redirectUrl: '/ctc' })
  })

const AddCtcPage = () => {
  const actionData = useServerErrors(CreateCtcSchema)

  return <CreateCtcForm {...actionData} />
}

export default AddCtcPage

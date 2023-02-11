import { useActionData } from '@remix-run/react'
import type { ActionArgs } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import { isFail } from '@srtp/core'
import { badRequest, safeAction } from '@srtp/remix-node'
import { CtcSchema } from '~/common/validators'
import { CreateCtcForm } from '~/components/ctc'
import { createCtc } from '~/models/ctc.server'

export const action = (args: ActionArgs) =>
  safeAction(CtcSchema, args, async values => {
    const userResult = await createCtc(values)

    return isFail(userResult)
      ? badRequest<CtcSchema>({ error: userResult.fail })
      : redirect('/ctc')
  })

const AddUserCtcPage = () => {
  const actionData = useActionData<typeof action>()

  return <CreateCtcForm {...actionData} />
}

export default AddUserCtcPage

import { useActionData } from '@remix-run/react'
import type { ActionArgs } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import { isFail } from '@srtp/core'
import { badRequest, safeAction } from '@srtp/remix-node'
import { CtcSchema } from '~/common/validators'
import { AddUserCtc } from '~/components/ctc'
import { createUserCtc } from '~/models/ctc.server'

export const action = ({ request }: ActionArgs) =>
  safeAction(CtcSchema, request, async values => {
    const userResult = await createUserCtc(values)

    if (isFail(userResult)) {
      return badRequest<CtcSchema>({ error: userResult.fail })
    }

    return redirect('/ctc')
  })

const AddUserCtcPage = () => {
  const actionData = useActionData<typeof action>()

  return <AddUserCtc {...actionData} />
}

export default AddUserCtcPage

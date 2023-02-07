import { useActionData } from '@remix-run/react'
import type { ActionArgs } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import { isOk } from '@srtp/core'
import { badRequest, formErrors, fromFormData } from '~/common/utils'
import { CtcSchema } from '~/common/validators'
import { AddUserCtc } from '~/components/AddUserCtc'
import { createUserCtc } from '~/models/ctc.server'

export async function action({ request }: ActionArgs) {
  const result = await fromFormData(CtcSchema, request)

  if (!result.success) {
    return badRequest({ fieldErrors: formErrors(result.error) })
  }

  const userResult = await createUserCtc(result.data)

  return isOk(userResult)
    ? redirect('/ctc')
    : badRequest<CtcSchema>({ error: userResult.fail })
}

const AddUserCtcPage = () => {
  const actionData = useActionData<typeof action>()

  return <AddUserCtc {...actionData} />
}

export default AddUserCtcPage

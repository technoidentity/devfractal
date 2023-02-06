import { useActionData } from '@remix-run/react'
import type { ActionArgs } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import { toInt } from '@srtp/core'
import { _CtcModel } from 'prisma/zod'
import type { ZodError } from 'zod'
import { UserCtc } from '~/components/UserCtc'
import { createUserCtc } from '~/models/ctc.server'
import { badRequest } from '~/models/request.server'

export const zodErrors = <T extends object>(
  error: ZodError<T>,
): Record<keyof T, string> => {
  const results: any = {}
  error.errors.forEach(error => {
    results[error.path.join('.')] = error.message
  })
  return results
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  console.log({ formData }, 'formData')
  const id = formData.get('id')
  const name = formData.get('name')
  const ctc = toInt(formData.get('ctc'))
  const fromDate = formData.get('fromDate')
  const toDate = formData.get('toDate')
  const result = _CtcModel.safeParse({ id, name, ctc, fromDate, toDate })

  console.log({ result })

  if (result.success) {
    const user = await createUserCtc(result.data)
    if (user.type === 'success') {
      return redirect('/ctc')
    } else {
      if (user.type === 'failure')
        return badRequest({
          fieldErrors: null,
          fields: null,
          formError: user?.error,
        })
    }
  } else {
    const fieldErrors = result.success ? {} : zodErrors(result.error)

    const fields = { name, ctc }

    console.log({ fieldErrors, fields })
    if (Object.values(fieldErrors).some(Boolean)) {
      return badRequest({
        fieldErrors,
        fields,
        formError: null,
      })
    }
  }
}

export const UserCtcPage = () => {
  const actionData = useActionData()
  console.log({ actionData })
  return (
    <UserCtc
      fieldErrors={actionData?.fieldErrors}
      fields={actionData?.fields}
      formError={actionData?.formError}
    />
  )
}

export default UserCtcPage

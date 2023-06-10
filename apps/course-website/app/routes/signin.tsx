import type { ActionArgs } from '@remix-run/node'
import { useActionData, useSearchParams } from '@remix-run/react'
import { Signin } from '~/components/Signin'
import { createUserSession } from '~/services/session.server'
import { login } from '~/services/user.server'
import { badRequest } from '~/utils/validate.server'
import { validateUrl } from './signup'

export async function action({ request }: ActionArgs) {
  const data = await request.formData()
  const username = data.get('username')
  const password = data.get('password')
  const redirectTo = validateUrl(data.get('redirectTo') || '/courses')

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof redirectTo !== 'string'
  ) {
    return badRequest({ formError: 'Form not submitted correctly' })
  }

  const fields = { username, password }

  const user = await login({ username, password })

  if (!user) {
    return badRequest({
      fields,
      formError: 'Username/Password combination is incorrect',
    })
  }
  return createUserSession(user.id, redirectTo)
}

export default function useLoginPage() {
  const actionData: any = useActionData()
  const [searchParams] = useSearchParams()
  return <Signin searchParams={searchParams} actionData={actionData} />
}

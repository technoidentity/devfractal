import { ActionArgs } from '@remix-run/node'
import { useActionData, useSearchParams } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { Signin } from '~/components/Signin'
import { createUserSession } from '~/services/session.server'
import { login } from '~/services/user.server'
import { validateUrl } from './signup'

export async function action({ request, context }: ActionArgs) {
  const data = await request.formData()
  const username = data.get('username')
  const password = data.get('password')
  const redirectTo = validateUrl(data.get('redirectTo') || '/courses')

  invariant(typeof username === 'string', 'username must be a string')
  invariant(typeof password === 'string', 'password must be a string')
  invariant(typeof redirectTo === 'string', 'redirectTo must be a string')

  const user = await login({ username, password })
  if (!user) return null
  return createUserSession(user.id, redirectTo)
}

export default function loginPage() {
  const result = useActionData()
  const [searchParams] = useSearchParams()
  return <Signin searchParams={searchParams} />
}

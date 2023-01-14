import type { ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useActionData } from '@remix-run/react'
import { useState } from 'react'
import { Signup } from '~/components/Signup'
import { createUserSession } from '~/services/session.server'
import { register } from '~/services/user.server'
import { db } from '~/utils/db.server'
import {
  badRequest,
  validatePassword,
  validateUsername,
} from '~/utils/validate.server'

export function validateUrl(url: any) {
  let urls = ['/', '/courses']
  if (urls.includes(url)) {
    return url
  }
  return '/signin'
}

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData()
  const username = data.get('username')
  const password = data.get('password')
  const redirectTo = validateUrl(data.get('redirectTo') || '/signin')

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof redirectTo !== 'string'
  ) {
    return badRequest({ formError: 'Form not submitted correctly' })
  }
  const isUsernameExists =
    (await db.user.count({
      where: {
        username,
      },
    })) > 0

  if (isUsernameExists) {
    return badRequest({ formError: 'username already exists' })
  }

  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  }

  if (Object.values(fieldErrors).some(Boolean)) {
    return json({ fieldErrors })
  }
  const user = await register({ username, password })

  console.log(user)

  if (!user) return null
  return createUserSession(user.id, redirectTo)
}

export default function useSignup() {
  const data = useActionData()
  console.log(data)
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = (password: boolean) => {
    setShowPassword(!password)
  }

  return (
    <Signup
      showPassword={showPassword}
      setShowPassword={handleShowPassword}
      actionData={data}
    />
  )
}

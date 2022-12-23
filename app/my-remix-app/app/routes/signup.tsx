import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { ActionFunction } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import bcrypt from 'bcryptjs'
import { useState } from 'react'
import invariant from 'tiny-invariant'
import { Signup } from '~/components/Signup'
import { createUserSession } from '~/services/session.server'
import { register } from '~/services/user.server'
import { db } from '~/utils/db.server'

type ActionData = { error: string } | undefined

export function validateUrl(url: any) {
  console.log(url)
  let urls = ['/', '/courses']
  if (urls.includes(url)) {
    return url
  }
  return '/courses'
}

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData()
  const username = data.get('username')
  const password = data.get('password')
  const redirectTo = validateUrl(data.get('redirectTo') || '/courses')

  invariant(typeof username === 'string', 'username must be a string')
  invariant(typeof password === 'string', 'password must be a string')
  invariant(typeof redirectTo === 'string', 'redirectTo must be a string')

  const isUsernameExists =
    (await db.user.count({
      where: {
        username,
      },
    })) > 0

  const hashedPassword = await bcrypt.hash(password, 10)

  if (isUsernameExists) {
    return { error: 'username already exists' }
  }

  const user = await register({ username, password: hashedPassword })
  if (!user) return null
  return createUserSession(user.id, redirectTo)
}

export default function signup() {
  const data = useActionData<ActionData>()
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = (password: boolean) => {
    setShowPassword(!password)
  }

  return (
    <Signup showPassword={showPassword} setShowPassword={handleShowPassword} />
  )
}

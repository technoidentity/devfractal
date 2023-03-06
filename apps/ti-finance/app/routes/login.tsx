import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import type { ActionArgs, LoaderArgs, MetaFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, Link, useActionData, useSearchParams } from '@remix-run/react'
import * as React from 'react'

import { verifyLogin } from '~/models/user.server'
import { createUserSession, getUserId } from '~/session.server'
import { safeRedirect, validateEmail } from '~/utils'

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request)
  if (userId) return redirect('/')
  return json({})
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  const redirectTo = safeRedirect(formData.get('redirectTo'), '/')
  const remember = formData.get('remember')

  if (!validateEmail(email)) {
    return json(
      { errors: { email: 'Email is invalid', password: null } },
      { status: 400 },
    )
  }

  if (typeof password !== 'string' || password.length === 0) {
    return json(
      { errors: { password: 'Password is required', email: null } },
      { status: 400 },
    )
  }

  if (password.length < 8) {
    return json(
      { errors: { password: 'Password is too short', email: null } },
      { status: 400 },
    )
  }

  const user = await verifyLogin(email, password)

  if (!user) {
    return json(
      { errors: { email: 'Invalid email or password', password: null } },
      { status: 400 },
    )
  }

  return createUserSession({
    request,
    userId: user.tiId,
    remember: remember === 'on' ? true : false,
    redirectTo,
  })
}

export const meta: MetaFunction = () => {
  return {
    title: 'Login',
  }
}

export default function LoginPage() {
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/ctc'
  const actionData = useActionData<typeof action>()
  const emailRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus()
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus()
    }
  }, [actionData])

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={theme => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Link
          to={{
            pathname: '/join',
            search: searchParams.toString(),
          }}
        >
          Sign up
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Form method="post" noValidate>
          <TextInput
            name="email"
            label="Email"
            placeholder="you@mantine.dev"
            required
          />
          <PasswordInput
            label="Password"
            name="password"
            placeholder="Your password"
            required
            mt="md"
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
            <Anchor<'a'>
              onClick={event => event.preventDefault()}
              href="#"
              size="sm"
            >
              Forgot password?
            </Anchor>
          </Group>
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </Form>
      </Paper>
    </Container>
  )
}

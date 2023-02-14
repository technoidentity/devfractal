import type { ActionArgs, LoaderArgs, MetaFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Link, useActionData, useSearchParams } from '@remix-run/react'
import * as React from 'react'

import { createUserSession, getUserId } from '~/session.server'

import {
  Button,
  Checkbox,
  createStyles,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { createUser, getUserByEmail } from '~/models/user.server'
import { safeRedirect, validateEmail } from '~/utils'

const useStyles = createStyles(theme => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}))

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

  if (!validateEmail(email)) {
    return json(
      { errors: { email: 'Email is invalid', password: null } },
      { status: 400 },
    )
  }

  if (typeof password !== 'string' || password.length === 0) {
    return json(
      { errors: { email: null, password: 'Password is required' } },
      { status: 400 },
    )
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: 'Password is too short' } },
      { status: 400 },
    )
  }

  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return json(
      {
        errors: {
          email: 'A user already exists with this email',
          password: null,
        },
      },
      { status: 400 },
    )
  }

  const user = await createUser(email, password)

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo,
  })
}

export const meta: MetaFunction = () => {
  return {
    title: 'Sign Up',
  }
}

export default function Join() {
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') ?? undefined
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

  const { classes } = useStyles()
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title
          order={2}
          className={classes.title}
          align="center"
          mt="md"
          mb={50}
        >
          Welcome back to TI_Finance!
        </Title>

        <TextInput
          label="Email address"
          name="email"
          placeholder="hello@gmail.com"
          size="md"
        />
        <Text color="red">
          {actionData?.errors?.email && <div>{actionData.errors.email}</div>}
        </Text>
        <PasswordInput
          label="Password"
          name="password"
          placeholder="Your password"
          mt="md"
          size="md"
        />
        <Text color="red">
          {actionData?.errors?.password && (
            <div>{actionData.errors.password}</div>
          )}
        </Text>
        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <Button type="submit" fullWidth mt="xl" size="md">
          Signup
        </Button>

        <Text align="center" mt="md">
          Already! a User?
          <Link
            to={{
              pathname: '/login',
              search: searchParams.toString(),
            }}
          >
            Log in
          </Link>
        </Text>
      </Paper>
    </div>
  )
}

{
  /* <div>
      <div>
        <Form method="post">
          <div>
            <label htmlFor="email">Email address</label>
            <div>
              <input
                ref={emailRef}
                id="email"
                required
                autoFocus={true}
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby="email-error"
              />
              {actionData?.errors?.email && (
                <div>{actionData.errors.email}</div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <div>
              <input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="new-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
              />
              {actionData?.errors?.password && (
                <div>{actionData.errors.password}</div>
              )}
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button type="submit">Create Account</button>
          <div>
            <div>
              Already have an account?{' '}
              <Link
                to={{
                  pathname: '/login',
                  search: searchParams.toString(),
                }}
              >
                Log in
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div> */
}

/* eslint-disable jsx-a11y/anchor-has-content */
import type { NavLinkProps } from '@mantine/core'
import { Button, Center, Group, NavLink, Text, Title } from '@mantine/core'
import type { NavLinkProps as RemixNavLinkProps } from '@remix-run/react'
import { NavLink as RemixNavLink } from '@remix-run/react'
import { jstr } from '@srtp/spec'
import React from 'react'
import { useOptionalUser } from '~/utils'

export const FormTitle = ({ children }: { children: React.ReactNode }) => (
  <Center>
    <Title order={3} mt="xl">
      {children}
    </Title>
  </Center>
)

export const SubmitButton = () => (
  <Group position="right" mt="xl">
    <Button type="submit">Submit</Button>
  </Group>
)

export const FormErrors = ({ error }: { error?: unknown }) =>
  error && Object.keys(error).length > 0 ? (
    <Text color="red">{jstr(error) || ''}</Text>
  ) : null

export const SignedIn = ({ children }: { children: React.ReactNode }) => {
  const user = useOptionalUser()

  if (user) {
    return <>{children}</>
  }
  return null
}

export const SignedOut = ({ children }: { children: React.ReactNode }) => {
  const user = useOptionalUser()

  if (!user) {
    return <>{children}</>
  }
  return null
}

export type CustomLinkProps = RemixNavLinkProps & {
  uiProps?: NavLinkProps
}

export function CustomLink({ uiProps, ...props }: CustomLinkProps) {
  return (
    <RemixNavLink {...props}>
      {({ isActive }) => <NavLink {...uiProps} active={isActive} />}
    </RemixNavLink>
  )
}

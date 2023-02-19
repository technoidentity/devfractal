import { Button, Center, Group, Text, Title } from '@mantine/core'
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

export const FormErrors = ({ error }: { error: unknown }) => (
  <Text color="red">{JSON.stringify(error) || ''}</Text>
)

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

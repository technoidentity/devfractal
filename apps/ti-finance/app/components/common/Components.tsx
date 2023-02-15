import { Button, Center, Group, Text, Title } from '@mantine/core'
import React from 'react'

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

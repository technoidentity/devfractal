import { Avatar, Button, Group, Title } from '@mantine/core'
import type { User } from '@prisma/client'
import { Form } from '@remix-run/react'

interface AppHeaderProps {
  user: User
}

export const AppHeader = ({ user }: AppHeaderProps) => {
  return (
    <Group position="apart">
      <Title order={3} fw="bold" color="cyan">
        TI_Finance
      </Title>
      <Group position="apart">
        <Avatar color="cyan" radius="xl">
          {user && user?.email?.slice(0, 2).toUpperCase()}
        </Avatar>
        <Form method="post" action="/logout">
          <Button type="submit">Logout</Button>
        </Form>
      </Group>
    </Group>
  )
}

import { Avatar, Button, Group, Title } from '@mantine/core'
import type { User } from '@prisma/client'

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
        <Button type="submit" color="cyan" component="a" href="/logout">
          Logout
        </Button>
      </Group>
    </Group>
  )
}

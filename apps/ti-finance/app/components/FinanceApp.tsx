import { AppShell, Header, Navbar } from '@mantine/core'
import type { User } from '@prisma/client'
import { Outlet } from '@remix-run/react'
import { AppHeader } from './AppHeader'
import { AppNavbar } from './AppNavbar'

export type FinanceAppProps = Readonly<{
  user: User
}>

export const FinanceApp = ({ user }: FinanceAppProps) => {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} p="xs">
          <AppNavbar />
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <AppHeader user={user} />
        </Header>
      }
      styles={theme => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Outlet />
    </AppShell>
  )
}

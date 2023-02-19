import { AppShell, Header, Navbar } from '@mantine/core'
import { Outlet } from '@remix-run/react'
import { useOptionalUser } from '~/utils'
import { AppHeader, AppNavbar } from '../app'

export const HomePage = () => {
  const user = useOptionalUser()

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 250 }} p="xs">
          <AppNavbar />
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <AppHeader user={user!} />
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  )
}

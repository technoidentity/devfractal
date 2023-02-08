import { Link, Outlet } from '@remix-run/react'
import { AppShell, Header, Navbar } from '@mantine/core'
import { AppHeader } from '~/components/AppHeader'
import { AppNavbar } from '~/components/AppNavbar'
import { useOptionalUser } from '~/utils'

export default function Index() {
  const user = useOptionalUser()
  return (
    <>
      {user ? (
        <>
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
        </>
      ) : (
        <>
          <Link to="/join">Sign up</Link>
          <Link to="/login">Log In</Link>
        </>
      )}
    </>
  )
}

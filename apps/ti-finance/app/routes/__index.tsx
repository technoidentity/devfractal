import {
  AppShell,
  Button,
  Container,
  Header,
  Navbar,
  Overlay,
  Text,
  Title,
} from '@mantine/core'
import { Outlet } from '@remix-run/react'
import React from 'react'
import { AppHeader } from '~/components/AppHeader'
import { AppNavbar } from '~/components/AppNavbar'
import { FooterCentered } from '~/components/Footer'
import { useOptionalUser } from '~/utils'
import { useStyles } from '../common/useStyles'

const links = [
  { link: 'https://www.technoidentity.com/contact-us/', label: 'Contact' },
  { link: 'https://www.technoidentity.com/insights/', label: 'Insight' },
  { link: 'https://www.technoidentity.com/clients/', label: 'About' },
  {
    link: 'https://www.technoidentity.com/fast-track-careers/',
    label: 'Careers',
  },
]

const SignedIn = ({ children }: { children: React.ReactNode }) => {
  const user = useOptionalUser()

  if (user) {
    return <>{children}</>
  }
  return null
}

const SignedOut = ({ children }: { children: React.ReactNode }) => {
  const user = useOptionalUser()

  if (!user) {
    return <>{children}</>
  }
  return null
}

const HomePage = () => {
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

const AppIntroPage = () => {
  const { classes, cx } = useStyles()

  return (
    <>
      <div className={classes.wrapper}>
        <Overlay color="#000" opacity={0.65} zIndex={1} />

        <div className={classes.inner}>
          <Title className={classes.title}>
            Technology, For the people-
            <Text component="span" inherit className={classes.highlight}>
              by the people
            </Text>
          </Title>

          <Container size={640}>
            <Text size="lg" className={classes.description}>
              To advance technology through continuous learning and empathy so
              that organizations globally can deliver greater value and build a
              better future for humanity.
            </Text>
          </Container>

          <div className={classes.controls}>
            <Button
              component="a"
              href="/join"
              className={classes.control}
              variant="white"
              size="lg"
            >
              Join
            </Button>
            <Button
              className={cx(classes.control, classes.secondaryControl)}
              size="lg"
              component="a"
              href="/login"
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
      <FooterCentered links={links} />
    </>
  )
}

export default function Index() {
  return (
    <>
      <SignedIn>
        <HomePage />
      </SignedIn>
      <SignedOut>
        <AppIntroPage />
      </SignedOut>
    </>
  )
}

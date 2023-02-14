import {
  AppShell,
  Button,
  Container,
  Group,
  Header,
  Image,
  List,
  Navbar,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core'
import { Outlet } from '@remix-run/react'
import { IconCheck } from '@tabler/icons-react'
import React from 'react'
import { useStyles } from '~/common/useStyles'
import { AppHeader } from '~/components/AppHeader'
import { AppNavbar } from '~/components/AppNavbar'
import { FooterCentered } from '~/components/Footer'
import { useOptionalUser } from '~/utils'

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
  const { classes } = useStyles()

  return (
    <>
      <div>
        <Container>
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                A Scalable<span className={classes.highlight}> Banking</span>
                <br /> Eco-System
              </Title>
              <Text color="dimmed" mt="md">
                To advance technology through continuous learning and empathy so
                that organizations globally can deliver greater value and build
                a better future for humanity.
              </Text>

              <List
                mt={30}
                spacing="sm"
                size="sm"
                icon={
                  <ThemeIcon size={20} radius="xl">
                    <IconCheck size={12} stroke={1.5} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <b>TypeScript based</b> – build type safe applications, all
                  components and hooks export types
                </List.Item>
                <List.Item>
                  <b>Free and open source</b> – all packages have MIT license,
                  you can use Mantine in any project
                </List.Item>
                <List.Item>
                  <b>No annoying focus ring</b> – focus ring will appear only
                  when user navigates with keyboard
                </List.Item>
              </List>

              <Group mt={30}>
                <Button
                  component="a"
                  href="/login"
                  radius="xl"
                  size="md"
                  className={classes.control}
                >
                  Sign in
                </Button>
                <Button
                  variant="default"
                  component="a"
                  href="/join"
                  radius="xl"
                  size="md"
                  className={classes.control}
                >
                  Sign up
                </Button>
              </Group>
            </div>
            <Image
              src={
                'https://raw.githubusercontent.com/mantinedev/ui.mantine.dev/master/components/HeroBullets/image.svg'
              }
              className={classes.image}
            />
          </div>
        </Container>
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

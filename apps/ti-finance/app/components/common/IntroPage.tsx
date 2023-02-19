import {
  Button,
  Container,
  Group,
  Image,
  List,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'
import { useStyles } from '~/components/common'
import { FooterCentered } from '../app'

const links = [
  { link: 'https://www.technoidentity.com/contact-us/', label: 'Contact' },
  { link: 'https://www.technoidentity.com/insights/', label: 'Insight' },
  { link: 'https://www.technoidentity.com/clients/', label: 'About' },
  {
    link: 'https://www.technoidentity.com/fast-track-careers/',
    label: 'Careers',
  },
]

export const AppIntroPage = () => {
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

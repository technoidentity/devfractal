import type { Sx } from '@mantine/core'
import { ActionIcon, Anchor, createStyles, Group, Title } from '@mantine/core'
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from '@tabler/icons-react'

const linkStyles: Sx = {
  textDecoration: 'none',
  color: 'grey',
  '&:hover': {
    color: '#228be6',
  },
}

const useStyles = createStyles(theme => ({
  footer: {
    marginTop: '150px',
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}))

interface FooterCenteredProps {
  links: { link: string; label: string }[]
}

export function FooterCentered({ links }: FooterCenteredProps) {
  const { classes } = useStyles()
  const items = links.map(link => (
     
    <Anchor
      key={link.label}
      href={link.link}
      sx={{ lineHeight: 1, ...linkStyles }}
    >
      {link.label}
    </Anchor>
  ))

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Title order={3} color="cyan" size={28}>
          TI_Finance
        </Title>

        <Group className={classes.links}>{items}</Group>

        <Group spacing="xs" position="right" noWrap>
          <ActionIcon size="lg" radius="xl">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" radius="xl">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" radius="xl">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  )
}

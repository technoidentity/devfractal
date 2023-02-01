import { Avatar, Button, Group, Header, Indicator, Title } from '@mantine/core'
import { useValue } from '@srtp/global-state'
import { IconAperture, IconShoppingCart } from '@tabler/icons-react'
import { totalCartItems } from './state'

export const CartHeader = () => {
  const count = useValue(totalCartItems)

  return (
    <Header height={60} p="xs" mb="lg">
      <Group position="apart">
        <Button variant="subtle" leftIcon={<IconAperture />}>
          <Title order={3} color="indigo">
            E-cart
          </Title>
        </Button>
        <Indicator
          position="bottom-start"
          size={26}
          color="red"
          label={count || 0}
        >
          <Avatar color="orange" radius={'sm'}>
            <IconShoppingCart size={24} />
          </Avatar>
        </Indicator>
      </Group>
    </Header>
  )
}

import { Text, Progress, Card } from '@mantine/core'

type TotalSpendCardProps = {
  label: string
  cost: number
}

export const TotalSpendCard = ({ label, cost }: TotalSpendCardProps) => {
  return (
    <Card
      withBorder
      radius="md"
      p="xs"
      sx={theme => ({
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      })}
      w="300px"
    >
      <Text size="xs" transform="uppercase" weight={700} color="dimmed">
        {label}
      </Text>
      <Text size={25} weight={1000} mt="md">
        {cost}
      </Text>
      <Progress value={54.31} mt="md" size="lg" radius="xl" />
    </Card>
  )
}

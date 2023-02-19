import { Button, Group } from '@mantine/core'

export const AddLink = ({ link }: { link: string }) => (
  <Group position="right" m="md">
    <Button component="a" href={link}>
      Add
    </Button>
  </Group>
)

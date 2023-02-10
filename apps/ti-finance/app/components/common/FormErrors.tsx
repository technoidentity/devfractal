import { Text } from '@mantine/core'

export const FormErrors = ({ error }: { error: unknown }) => (
  <Text color="red">{JSON.stringify(error) || ''}</Text>
)

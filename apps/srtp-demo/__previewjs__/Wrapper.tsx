import { MantineProvider } from '@mantine/core'

export const Wrapper = ({ children }: any) => (
  <MantineProvider>{children}</MantineProvider>
)

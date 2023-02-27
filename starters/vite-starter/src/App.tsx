import { MantineProvider, Title } from '@mantine/core'

export function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Title align="center">Hello, World!</Title>
    </MantineProvider>
  )
}

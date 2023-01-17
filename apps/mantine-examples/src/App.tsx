import { MantineProvider } from '@mantine/core'
import { MantineTable } from './MantineTable'

export function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <MantineTable />
    </MantineProvider>
  )
}

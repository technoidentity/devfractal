import { Container, MantineProvider } from '@mantine/core'
import { ClientTable, useClientTable } from '@srtp/mantine'

import type { Row } from './data'
import { columns, rows } from './data'

const renderColumn = (k: keyof Row, row: Row) => {
  if (k === 'is_manager') {
    return <td>{row.is_manager ? '✔️' : '✖️'}</td>
  }

  return <td>{row[k]}</td>
}

export function App() {
  const tableState = useClientTable({
    perPage: 7,
    rows,
    searchFields: ['name', 'age'],
  })

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container mt="md">
        <ClientTable
          withBorder
          striped
          tableState={tableState}
          columns={columns}
          renderColumn={renderColumn}
        />
      </Container>
    </MantineProvider>
  )
}

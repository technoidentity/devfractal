import { Container, MantineProvider } from '@mantine/core'
import type { FieldSearch } from '@srtp/table'
import { ClientTable, useClientTable } from '@srtp/table'
import type { Row } from './data'
import { columns, rows } from './data'

const renderColumn = (k: keyof Row, row: Row) => {
  if (k === 'is_manager') {
    return <td>{row.is_manager ? '✔️' : '✖️'}</td>
  }
  return <td>{row[k]}</td>
}

const initialFieldSearch: FieldSearch<Row> = {
  age: '',
  name: '',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  start_date: '',
}

export function App() {
  const tableState = useClientTable({ perPage: 7, rows, initialFieldSearch })

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

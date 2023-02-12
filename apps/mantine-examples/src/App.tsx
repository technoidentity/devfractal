import { MantineProvider } from '@mantine/core'
import { ClientTable, Filters, useClientTable } from '@srtp/table'
import { columns, Row, rows } from './data'

const renderColumn = (k: keyof Row, row: Row) => {
  if (k === 'is_manager') {
    return <td>{row.is_manager ? '✔️' : '✖️'}</td>
  }
  return <td>{row[k]}</td>
}

const initialFilters: Filters<Row> = {
  age: '',
  name: '',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  start_date: '',
}

export function App() {
  const tableState = useClientTable({ perPage: 3, rows, initialFilters })

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ClientTable
        tableState={tableState}
        columns={columns}
        renderColumn={renderColumn}
      />
    </MantineProvider>
  )
}

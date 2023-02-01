import { MantineProvider } from '@mantine/core'
import { ClientTable, Filters } from '@srtp/table'
import { columns, Row, rows } from './data'

const renderColumn = (k: keyof Row, row: Row) => {
  if (k === 'is_manager') {
    return <td>{row.is_manager ? '✔️' : '✖️'}</td>
  }
  return <td>{row[k]}</td>
}

const initialFilters: Partial<Filters<Row>> = {
  age: '',
  name: '',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  start_date: '',
}

export function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ClientTable
        initialFilters={initialFilters}
        renderColumn={renderColumn}
        columns={columns}
        perPage={3}
        rows={rows}
      />
    </MantineProvider>
  )
}

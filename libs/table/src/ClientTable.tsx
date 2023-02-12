/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
import { Flex } from '@mantine/core'
import { Pagination } from './Pagination'
import { TableView } from './TableView'
import { ClientTableProps, RowBase } from './types'

export function ClientTable<Row extends RowBase>({
  columns,
  tableState: {
    actions,
    selects,
    props: { perPage, rows },
    state,
  },
  ...props
}: ClientTableProps<Row>) {
  return (
    <Flex direction={{ base: 'column' }} justify={{ md: 'center' }}>
      <TableView<Row>
        {...props}
        columns={columns}
        filters={state.filters}
        sort={state.sort}
        rows={selects.currentRows}
        onSearch={actions.handleSearch}
        onSort={actions.handleSort}
      />

      <Pagination<Row>
        rowsPerPage={perPage}
        rows={rows}
        activePage={state.activePage}
        setActivePage={actions.setActivePage}
        totalPages={selects.totalPages}
      />
    </Flex>
  )
}

import { Flex } from '@mantine/core'
import { Pagination } from './Pagination'
import { TableSearch } from './TableSearch'
import { TableView } from './TableView'
import type { ClientTableProps, RowBase } from './types'

export function ClientTable<Row extends RowBase>({
  columns,
  tableState: {
    actions,
    selects,
    props: { perPage, rows, searchFields },
    state,
  },
  ...props
}: ClientTableProps<Row>) {
  return (
    <Flex direction={{ base: 'column' }} justify={{ md: 'center' }}>
      {searchFields && (
        <TableSearch search={state.search} onSearch={actions.handleSearch} />
      )}

      <TableView<Row>
        {...props}
        columns={columns}
        sort={state.sort}
        rows={selects.current}
        onSort={actions.handleSort}
      />

      <Pagination<Row>
        rowsPerPage={perPage || 30}
        rows={rows}
        page={state.page}
        setPage={actions.setPage}
        totalPages={selects.totalPages}
      />
    </Flex>
  )
}

import { Flex } from '@mantine/core'
import { Pagination } from './Pagination'
import { TableSearch } from './TableSearch'
import { TableView } from './TableView'
import type { ClientTableProps, RowBase } from './types'

export function ClientTable<Row extends RowBase>({
  columns,
  onSearch,
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
      {onSearch && <TableSearch search={state.search} onSearch={onSearch} />}

      <TableView<Row>
        {...props}
        columns={columns}
        fieldSearch={state.filters}
        onFieldSearch={actions.handleFieldSearch}
        sort={state.sort}
        rows={selects.currentRows}
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

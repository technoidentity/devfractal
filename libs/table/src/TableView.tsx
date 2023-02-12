import { Table } from '@mantine/core'
import { Headers } from './Headers'
import { Filters as Filters } from './Filters'
import { Rows } from './Rows'
import { TableViewProps } from './types'

export function TableView<T extends { id: number | string } & object>({
  columns,
  filters,
  onSearch,
  onSort,
  renderColumn,
  Actions,
  rows,
  sort,
  ...props
}: TableViewProps<T>) {
  return (
    <Table {...props}>
      <thead>
        <tr>
          <Headers columns={columns} onSort={onSort} sort={sort} />
          {Actions && <th>Actions</th>}
        </tr>
        {filters && (
          <tr>
            <Filters columns={columns} filters={filters} onSearch={onSearch} />
          </tr>
        )}
      </thead>
      <tbody>
        <Rows
          columns={columns}
          rows={rows}
          Actions={Actions}
          renderColumn={renderColumn}
        />
      </tbody>
    </Table>
  )
}

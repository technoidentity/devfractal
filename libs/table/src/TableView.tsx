/* eslint-disable @typescript-eslint/naming-convention */
import { ScrollArea, Table, Text } from '@mantine/core'
import { Headers } from './Headers'
import { Rows } from './Rows'
import { TableViewProps } from './types'

export function TableView<T extends { id: number | string } & object>({
  columns,
  fieldSearch,
  onSort,
  renderColumn,
  Actions,
  rows,
  sort,
  ...props
}: TableViewProps<T>) {
  return (
    <ScrollArea>
      <Table
        verticalSpacing="xs"
        sx={{ tableLayout: 'fixed', minWidth: 700 }}
        {...props}
      >
        <thead>
          <tr>
            <Headers columns={columns} onSort={onSort} sort={sort} />
            {Actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            <Rows
              columns={columns}
              rows={rows}
              Actions={Actions}
              renderColumn={renderColumn}
            />
          ) : (
            <tr>
              {/* @TODO:Take length from spec */}
              <td colSpan={Object.keys(rows[0]).length}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  )
}

// {
//   filters && (
//     <tr>
//       <Filters columns={columns} filters={filters} onSearch={onSearch} />
//     </tr>
//   )
// }

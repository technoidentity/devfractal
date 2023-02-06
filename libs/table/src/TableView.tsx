import { Input, Table, TableProps } from '@mantine/core'
import React from 'react'
import { Column, Filters } from './types'
import { Sort } from './utils'

interface TableViewProps<Row extends object & { id: number | string }>
  extends TableProps {
  actions: boolean
  columns: Column<Row>[]
  filters: Filters<Row>
  onSearch(val: string, searchVal: string): void
  onSort(val: keyof Row): void
  renderColumn: (key: keyof Row, row: Row) => React.ReactNode
  renderActions?: (row: Row) => React.ReactNode
  rows: readonly Row[]
  sort: Sort<Row>
}

export function TableView<T extends { id: number | string } & object>({
  actions,
  columns,
  filters,
  onSearch,
  onSort,
  renderColumn,
  renderActions,
  rows,
  sort,
  ...props
}: TableViewProps<T>) {
  return (
    <Table {...props}>
      <thead>
        <tr>
          {columns.map(column => {
            const sortIcon = () => {
              if (column.accessor === sort.orderBy) {
                if (sort.order === 'asc') {
                  return '⬆️'
                }
                return '⬇️'
              } else {
                return '️↕️'
              }
            }

            return (
              <th key={column.accessor}>
                <span>{column.label}</span>
                <button onClick={() => onSort(column.accessor)}>
                  {sortIcon()}
                </button>
              </th>
            )
          })}
          <th>Actions</th>
        </tr>
        <tr>
          {columns.map(col => (
            <th key={col.label}>
              <Input
                key={`${col.accessor}-search`}
                type="search"
                placeholder={`search ${col.label}`}
                value={filters[col.accessor]}
                onChange={evt => onSearch(evt.target.value, col.accessor)}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(r => (
          <tr key={r.id}>
            {columns.map(({ accessor }) =>
              renderColumn(accessor as keyof T, r),
            )}
            {renderActions && <td width={'200px'}>{renderActions(r)}</td>}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

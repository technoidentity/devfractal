import { Input, Table, TableProps } from '@mantine/core'
import React from 'react'
import { Column, Filters } from './types'
import { Sort } from './utils'

interface TableViewProps<Row extends object & { id: number | string }>
  extends TableProps {
  columns: Column<Row>[]
  rows: readonly Row[]
  filters: Filters<Row>
  handleSearch(val: string, searchVal: string): void
  sort: Sort<Row>
  renderColumn: (key: keyof Row, row: Row) => React.ReactNode
  handleSort(val: keyof Row): void
}

export function TableView<T extends { id: number | string } & object>({
  columns,
  rows,
  sort,
  filters,
  renderColumn,
  handleSearch,
  handleSort,
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
                <button onClick={() => handleSort(column.accessor)}>
                  {sortIcon()}
                </button>
              </th>
            )
          })}
        </tr>
        <tr>
          {columns.map(col => (
            <th key={col.label}>
              <Input
                key={`${col.accessor}-search`}
                type="search"
                placeholder={`search ${col.label}`}
                value={filters[col.accessor]}
                onChange={evt => handleSearch(evt.target.value, col.accessor)}
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
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

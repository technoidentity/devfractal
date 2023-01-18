import { Input, Table } from '@mantine/core'
import { omit } from 'lodash'
import React from 'react'
import { Column } from './data'
import { Sort } from './utils'

export type Filters<T extends object> = Partial<Record<keyof T, string>>

interface TableProps<T extends object> {
  columns: Column<T>[]
  rows: T[]
  filters: Filters<T>
  handleSearch(val: string, searchVal: string): void
  sort: Sort
  renderColumn: (key: keyof T, row: T) => React.ReactNode
  handleSort(val: keyof T): void
}

export function UserTable<T extends { id: number | string } & object>({
  columns,
  rows,
  sort,
  filters,
  renderColumn,
  handleSearch,
  handleSort,
}: TableProps<T>) {
  return (
    <Table mih={'300px'}>
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
            {Object.keys(omit(r, 'id')).map(k => renderColumn(k as keyof T, r))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

/* eslint-disable @typescript-eslint/naming-convention */
import { Input, Table, TableProps } from '@mantine/core'
import { toStr } from '@srtp/core'
import React from 'react'
import { Column, Filters } from './types'
import { Sort } from './utils'

interface TableViewProps<Row extends object & { id: number | string }>
  extends TableProps {
  columns: Column<Row>[]
  filters: Filters<Row>
  onSearch(val: string, searchVal: string): void
  onSort(val: keyof Row): void
  renderColumn?: (col: unknown) => React.ReactNode
  Actions?: (props: { row: Row }) => JSX.Element
  rows: readonly Row[]
  sort: Sort<Row>
}

const formatDate = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })

  return formatter.format(date)
}

const defaultRenderColumn = (x: unknown) => {
  const r = x instanceof Date ? formatDate(x) : x
  return <td>{toStr(r)}</td>
}

export function TableView<T extends { id: number | string } & object>({
  columns,
  filters,
  onSearch,
  onSort,
  renderColumn = defaultRenderColumn,
  Actions,
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
            {columns.map(({ accessor }) => (
              <React.Fragment key={accessor}>
                {renderColumn(r[accessor])}
              </React.Fragment>
            ))}
            {Actions && (
              <td width={'200px'}>
                <Actions row={r} />
                {/* <p>Hello</p> */}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

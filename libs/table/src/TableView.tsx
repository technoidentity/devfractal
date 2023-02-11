/* eslint-disable @typescript-eslint/naming-convention */
import { Input, Table, TableProps } from '@mantine/core'
import { toStr } from '@srtp/core'
import React from 'react'
import { Column, Filters } from './types'
import { Sort } from './utils'

export interface TableViewProps<Row extends object & { id: number | string }>
  extends TableProps {
  columns: Column<Row>[]
  filters: Filters<Row>
  onSearch(val: string, searchVal: string): void
  onSort(val: keyof Row): void
  renderColumn?: (key: keyof Row, row: Row) => React.ReactNode
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

export type ColumnHeadersProps<Row extends object & { id: number | string }> =
  Pick<TableViewProps<Row>, 'columns' | 'sort' | 'onSort'>

export function ColumnHeaders<Row extends object & { id: number | string }>({
  columns,
  sort,
  onSort,
}: ColumnHeadersProps<Row>) {
  return (
    <>
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
    </>
  )
}

export type ColumnsProps<Row extends object & { id: number | string }> = Pick<
  TableViewProps<Row>,
  'columns' | 'filters' | 'onSearch'
>

export function Columns<Row extends object & { id: number | string }>({
  columns,
  filters,
  onSearch,
}: ColumnsProps<Row>) {
  return (
    <>
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
    </>
  )
}

type RowsProps<Row extends object & { id: number | string }> = Pick<
  TableViewProps<Row>,
  'columns' | 'renderColumn' | 'Actions' | 'rows'
>

function Rows<Row extends object & { id: number | string }>({
  columns,
  Actions,
  rows,
  renderColumn = defaultRenderColumn,
}: RowsProps<Row>) {
  return (
    <>
      {rows.map(r => (
        <tr key={r.id}>
          {columns.map(({ accessor }) => (
            <React.Fragment key={accessor}>
              {renderColumn(accessor, r)}
            </React.Fragment>
          ))}
          {Actions && (
            <td width={'200px'}>
              <Actions row={r} />
            </td>
          )}
        </tr>
      ))}
    </>
  )
}

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
          <ColumnHeaders columns={columns} onSort={onSort} sort={sort} />
          <th>Actions</th>
        </tr>
        <tr>
          <Columns columns={columns} filters={filters} onSearch={onSearch} />
        </tr>
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

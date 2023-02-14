<<<<<<< Updated upstream
import { Table } from '@mantine/core'
import { Headers } from './Headers'
import { Filters as Filters } from './Filters'
import { Rows } from './Rows'
import { TableViewProps } from './types'
=======
/* eslint-disable @typescript-eslint/naming-convention */
import { Input, Table, TableProps } from '@mantine/core'
import { toStr } from '@srtp/core'
import React from 'react'
import { Column, Filters, RowBase } from './types'
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

export function defaultRenderColumn<Row extends RowBase>(
  key: keyof Row,
  row: Row,
) {
  const col = row[key] as any
  const r = col instanceof Date ? formatDate(col) : col

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
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
          <Headers columns={columns} onSort={onSort} sort={sort} />
          {Actions && <th>Actions</th>}
=======
          <ColumnHeaders columns={columns} onSort={onSort} sort={sort} />
          {Actions && <th>Actions</th>}
        </tr>
        <tr>
          <Columns columns={columns} filters={filters} onSearch={onSearch} />
>>>>>>> Stashed changes
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

import { Table, Input } from '@mantine/core'
import { Column, Row } from './data'
import { Sort } from './utils'

interface TableProps {
  columns: Column[]
  rows: Row[]
  filters: any
  handleSearch(val: string, searchVal: string): void
  sort: Sort
  handleSort(val: keyof Row): void
}

export const UserTable = ({
  columns,
  rows,
  sort,
  filters,
  handleSearch,
  handleSort,
}: TableProps) => {
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
            <td>{r.name}</td>
            <td>{r.age}</td>
            <td>{r.is_manager ? '✔️' : '✖️'}</td>
            <td>{r.start_date}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

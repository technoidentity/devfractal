import { Input } from '@mantine/core'
import { RowBase, TableViewProps } from './types'

export type FiltersProps<Row extends RowBase> = Pick<
  TableViewProps<Row>,
  'columns' | 'onSearch'
> &
  Required<Pick<TableViewProps<Row>, 'filters'>>

export function Filters<Row extends RowBase>({
  columns,
  filters,
  onSearch,
}: FiltersProps<Row>) {
  return (
    <>
      {columns.map(col => (
        <th key={col.label}>
          <Input
            key={`${col.accessor}-search`}
            type="search"
            placeholder={`search ${col.label}`}
            value={filters[col.accessor]}
            onChange={evt => onSearch(col.accessor, evt.target.value)}
          />
        </th>
      ))}
    </>
  )
}

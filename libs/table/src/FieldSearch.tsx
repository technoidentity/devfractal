import { Input } from '@mantine/core'
import type { RowBase, TableViewProps } from './types'

export type FieldSearchProps<Row extends RowBase> = Required<
  Pick<TableViewProps<Row>, 'columns' | 'onFieldSearch' | 'fieldSearch'>
>

export function FieldSearch<Row extends RowBase>({
  columns,
  fieldSearch,
  onFieldSearch,
}: FieldSearchProps<Row>) {
  return (
    <>
      {columns.map(col => (
        <th key={col.label}>
          <Input
            key={`${col.accessor}-search`}
            type="search"
            placeholder={`search ${col.label}`}
            value={fieldSearch[col.accessor]}
            onChange={evt =>
              onFieldSearch(col.accessor, evt.target.value.trim())
            }
          />
        </th>
      ))}
    </>
  )
}

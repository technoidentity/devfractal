import { RowBase, TableViewProps } from './types'

export type HeadersProps<Row extends RowBase> = Pick<
  TableViewProps<Row>,
  'columns' | 'sort' | 'onSort'
>

export function Headers<Row extends RowBase>({
  columns,
  sort,
  onSort,
}: HeadersProps<Row>) {
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

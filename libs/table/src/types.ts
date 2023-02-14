<<<<<<< Updated upstream
import { TableProps } from '@mantine/core'
import { useClientTable } from './useClientTable'

export type Sort<Row extends object> = {
  order: 'asc' | 'desc'
  orderBy: keyof Row
}

=======
>>>>>>> Stashed changes
export type RowBase = object & { id: string | number }

export type Column<T extends object> = {
  accessor: keyof T & string
  label: string
  format?: (val: boolean) => void
}

export type Filters<T extends object> = Partial<Record<keyof T, string>>

export interface TableViewProps<Row extends RowBase> extends TableProps {
  columns: Column<Row>[]
  filters?: Filters<Row>
  sort: Sort<Row>
  onSearch(key: keyof Row, val: string): void
  onSort(val: keyof Row): void
  renderColumn?: (key: keyof Row, row: Row) => React.ReactNode
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Actions?: (props: { row: Row }) => JSX.Element
  rows: readonly Row[]
}

export interface ClientTableProps<Row extends RowBase>
  extends Omit<
    TableViewProps<Row>,
    'onSearch' | 'sort' | 'onSort' | 'filters' | 'rows'
  > {
  tableState: ReturnType<typeof useClientTable<Row>>
}

export type ClientTableState<Row extends RowBase> = Readonly<{
  readonly activePage: number
  readonly filters?: Filters<Row>
  readonly sort: Sort<Row>
}>

export type FieldPredicate<T> = (col: T) => boolean

export type FieldPredicates<Row extends RowBase> = Partial<{
  [K in keyof Row]: FieldPredicate<Row[K]>
}>

export type RowPredicate<Row extends RowBase> = (row: Row) => boolean

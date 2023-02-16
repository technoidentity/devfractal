import type { ClientTableProps, RowBase, UseClientTable } from '@srtp/table'
import { ClientTable, useClientTable } from '@srtp/table'

export type TableProps<Row extends RowBase> = UseClientTable<Row> &
  Omit<ClientTableProps<Row>, 'tableState'>

export function Table<Row extends RowBase>({
  perPage,
  fieldPredicates,
  rowPredicate,
  initialPage,
  initialSort,
  rows,
  ...props
}: TableProps<Row>) {
  const tableState = useClientTable({
    perPage,
    fieldPredicates,
    rowPredicate,
    initialPage,
    initialSort,
    rows,
  })

  return (
    <ClientTable
      withBorder
      striped
      {...props}
      tableState={tableState}
      onSearch={console.log}
    />
  )
}

import type { ClientTableProps, RowBase, UseClientTable } from '@srtp/mantine'
import { ClientTable, useClientTable } from '@srtp/mantine'

export type TableProps<Row extends RowBase> = UseClientTable<Row> &
  Omit<ClientTableProps<Row>, 'tableState'>

export function Table<Row extends RowBase>({
  perPage,
  rowPredicate,
  initialPage,
  initialSort,
  rows,
  ...props
}: TableProps<Row>) {
  const tableState = useClientTable({
    perPage: perPage || 5,
    rowPredicate,
    initialPage,
    initialSort,
    rows,
  })

  return <ClientTable withBorder striped {...props} tableState={tableState} />
}

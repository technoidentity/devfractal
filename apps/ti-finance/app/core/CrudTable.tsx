import type { Column, RowBase } from '@srtp/mantine'
import type { ValidatorSpec } from '@srtp/core'
import type { z } from 'zod'
import { useActions } from './createActions'
import type { EditFormProps } from './EditForm'
import { Table } from '../common/Table'

export type CrudTableProps<
  Spec extends ValidatorSpec & z.AnyZodObject,
  Row extends RowBase,
> = {
  rows: readonly Row[]
  columns: readonly Column<Row>[]
  FormFields: EditFormProps<Spec>['FormFields']
  spec: Spec
  editTitle: string
}

export function CrudTable<
  Spec extends ValidatorSpec & z.AnyZodObject,
  Row extends RowBase,
>(props: CrudTableProps<Spec, Row>) {
  const Actions = useActions(props.spec, props.FormFields, props.editTitle)

  return <Table Actions={Actions} rows={props.rows} columns={props.columns} />
}

import type { Column, RowBase } from '@srtp/table'
import type { FormSpec } from '@srtp/validator'
import type { z } from 'zod'
import { useActions } from './createActions'
import type { EditFormProps } from './EditForm'
import { Table } from './Table'

export type CrudTableProps<
  Spec extends FormSpec & z.AnyZodObject,
  Row extends RowBase,
> = {
  rows: readonly Row[]
  columns: readonly Column<Row>[]
  FormFields: EditFormProps<Spec>['FormFields']
  spec: Spec
  editTitle: string
}

export function CrudTable<
  Spec extends FormSpec & z.AnyZodObject,
  Row extends RowBase,
>(props: CrudTableProps<Spec, Row>) {
  const Actions = useActions(props.spec, props.FormFields, props.editTitle)

  return <Table Actions={Actions} rows={props.rows} columns={props.columns} />
}

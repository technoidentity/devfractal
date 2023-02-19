import type { Column, RowBase } from '@srtp/table'
import type { FormSchema } from '@srtp/validator'
import type { z } from 'zod'
import type { EditFormProps } from '.'
import { Table, useActions } from '.'

export type CrudTableProps<
  Spec extends FormSchema & z.AnyZodObject,
  Row extends RowBase,
> = {
  rows: readonly Row[]
  columns: readonly Column<Row>[]
  FormFields: EditFormProps<Spec>['FormFields']
  spec: Spec
  editTitle: string
}

export function CrudTable<
  Spec extends FormSchema & z.AnyZodObject,
  Row extends RowBase,
>(props: CrudTableProps<Spec, Row>) {
  const Actions = useActions(props.spec, props.FormFields, props.editTitle)
  return <Table Actions={Actions} rows={props.rows} columns={props.columns} />
}

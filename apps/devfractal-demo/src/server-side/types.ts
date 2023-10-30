import type { formatData } from './tableUtils'

export type Row = Record<string, number | string | boolean | Date> & {
  id: number
}

export type Column<T extends Row> = {
  title: keyof T
  render?: (rowData: ReturnType<typeof formatData>) => JSX.Element
}

export type DataRows = ReadonlyArray<Row>
export type Columns = ReadonlyArray<Column<Row>>

// export type Row = {
//   [k: string]: string | number | boolean | Date
// } & { id: number }

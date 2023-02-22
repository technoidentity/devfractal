import type { Column } from '@srtp/table'
import { Table } from '~/common'

type Cost = Readonly<{
  id: number
  department: string
  peopleCost: number
  otherExpenditures: number
  totalCost: number
}>

const columns: Column<Cost>[] = [
  { accessor: 'department', label: 'Department' },
  { accessor: 'peopleCost', label: 'People Cost' },
  { accessor: 'otherExpenditures', label: 'Other Expenditures' },
  { accessor: 'totalCost', label: 'Total Cost' },
]

export type DepartmentCostListProps = Readonly<{
  costList: Cost[]
}>

export const DepartmentCostList = ({ costList }: DepartmentCostListProps) => {
  return <Table rows={costList} columns={columns} />
}

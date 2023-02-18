import type { Column } from '@srtp/table'
import { Table } from '../common/Table'
import { CostFilters } from './CostFilters'

type Cost = Readonly<{
  id: number
  peopleCost: number
  otherExpenditures: number
  totalCost: number
}>

const columns: Column<Cost>[] = [
  { accessor: 'id', label: 'Department' },
  { accessor: 'peopleCost', label: 'People Cost' },
  { accessor: 'otherExpenditures', label: 'Other Expenditures' },
  { accessor: 'totalCost', label: 'Total Cost' },
]

// const initialFilters: Filters<Cost> = {
//   id: '',
//   peopleCost: '',
//   otherExpenditures: '',
//   totalCost: '',
// }

export type DepartmentCostListProps = Readonly<{
  costList: Cost[]
}>

export const DepartmentCostList = ({ costList }: DepartmentCostListProps) => {
  return (
    <>
      <CostFilters />
      <Table striped rows={costList} columns={columns} perPage={3} />
    </>
  )
}

import { Group } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import type { Column } from '@srtp/table'
import { Table } from '../common/Table'

type Cost = Readonly<{
  id: string
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
      <Group position="left" m="md">
        <DatePicker size="xs" label="From Date" />
        <DatePicker size="xs" label="To Date" />
        {/* <Select label="Department" data={data} size="xs" /> */}
      </Group>

      <Table striped rows={costList} columns={columns} perPage={3} />
    </>
  )
}

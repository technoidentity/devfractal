import { Group } from '@mantine/core'
import { useActionData } from '@remix-run/react'
import type { Errors } from '@srtp/remix-core'
import type { Column } from '@srtp/table'
import type {
  DepartmentMappingSchema,
  ListDepartmentSchema,
} from '~/common/validators'
import { Table } from '../common/Table'
import { DeleteDepartment } from './Delete'
import { EditDepartmentForm } from './Edit'

const columns: Column<ListDepartmentSchema>[] = [
  { accessor: 'tiId', label: 'TI_ID' },
  { accessor: 'username', label: 'Username' },
  { accessor: 'ctc', label: 'CTC' },
  { accessor: 'departmentId', label: 'Department' },
  { accessor: 'fromDate', label: 'From_Date' },
  { accessor: 'toDate', label: 'To_Date' },
  { accessor: 'category', label: 'Billable' },
]
// const initialFilters: Filters<DepartmentMappingSchema> = {
//   tiId: '',
//   department: '',
//   fromDate: '',
//   ctc: '',
//   toDate: '',
//   username: '',
//   category: 'billable',
// }

const Actions = ({ row }: { row: DepartmentMappingSchema }) => {
  const actionData = useActionData<
    Errors<DepartmentMappingSchema> | undefined
  >()

  return (
    <Group>
      <DeleteDepartment id={row.id} />
      <EditDepartmentForm department={row} errors={actionData} />
    </Group>
  )
}

export type DepartmentListProps = Readonly<{
  departmentList: readonly ListDepartmentSchema[]
}>

export const DepartmentList = ({ departmentList }: DepartmentListProps) => (
  <>
    <Table
      striped
      Actions={Actions}
      rows={departmentList}
      columns={columns}
      perPage={3}
    />
  </>
)

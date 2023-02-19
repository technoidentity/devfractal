import type { Column } from '@srtp/table'
import { DepartmentMappingSchema } from '~/common'
import { CrudTable } from '../common'
import { FormFields } from './FormFields'

type DepartmentList = DepartmentMappingSchema & {
  username: string
}

const columns: Column<DepartmentList>[] = [
  { accessor: 'tiId', label: 'TI_ID' },
  { accessor: 'username', label: 'Username' },
  { accessor: 'ctc', label: 'CTC' },
  { accessor: 'departmentId', label: 'Department' },
  { accessor: 'fromDate', label: 'From_Date' },
  { accessor: 'toDate', label: 'To_Date' },
  { accessor: 'category', label: 'Billable' },
]

export type DepartmentListProps = Readonly<{
  departmentList: readonly DepartmentList[]
}>

export const DepartmentList = ({ departmentList }: DepartmentListProps) => (
  <>
    <CrudTable
      spec={DepartmentMappingSchema}
      FormFields={FormFields}
      editTitle="Update Department"
      rows={departmentList}
      columns={columns}
    />
  </>
)

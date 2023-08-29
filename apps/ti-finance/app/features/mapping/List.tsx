import type { Column } from '@srtp/mantine'
import { MappingSpec } from '~/common'
import { CrudTable } from '~/core'
import { FormFields } from './FormFields'

type MappingList = MappingSpec & {
  username: string
  departmentName: string
}

const columns: Column<MappingList>[] = [
  { accessor: 'tiId', label: 'TI_ID' },
  { accessor: 'username', label: 'Username' },
  { accessor: 'ctc', label: 'CTC' },
  { accessor: 'departmentName', label: 'Department' },
  { accessor: 'fromDate', label: 'From_Date' },
  { accessor: 'toDate', label: 'To_Date' },
  { accessor: 'category', label: 'Billable' },
]

export type MappingListProps = Readonly<{
  departmentList: readonly MappingList[]
}>

export const MappingList = ({ departmentList }: MappingListProps) => (
  <>
    <CrudTable
      spec={MappingSpec}
      FormFields={FormFields}
      editTitle="Update Department"
      rows={departmentList}
      columns={columns}
    />
  </>
)

import type { Column } from '@srtp/table'
import { CreateAccessSpec } from '~/common'
import { CrudTable } from '~/core'
import type { DepartmentAccessList } from '~/models/department.server'
import { FormFields } from './FormFields'

const columns: Column<DepartmentAccessList>[] = [
  { accessor: 'id', label: 'ID' },
  { accessor: 'name', label: 'Department' },
  { accessor: 'parentCostCenter', label: 'ParentCostCenter' },
  { accessor: 'users', label: 'Users' },
]

export type DepartmentAccessProps = Readonly<{
  departmentAccessList: readonly DepartmentAccessList[]
}>

// function Actions({ row }: { row: DepartmentAccessList }) {
//   const serverErrors = useActionData()

//   return (
//     <Group noWrap>
//       {/* <DeleteForm id={row.id} /> */}
//       {/* <EditForm
//         FormFields={FormFields}
//         title="Modify Department Access"
//         initialValues={row}
//         spec={CreateDepartmentSpec}
//         serverErrors={serverErrors}
//       /> */}
//     </Group>
//   )
// }
export const DepartmentAccess = ({
  departmentAccessList,
}: DepartmentAccessProps) => {
  return (
    <CrudTable
      spec={CreateAccessSpec}
      FormFields={FormFields}
      editTitle="Update Department Access Users"
      rows={departmentAccessList}
      columns={columns}
    />
  )
}

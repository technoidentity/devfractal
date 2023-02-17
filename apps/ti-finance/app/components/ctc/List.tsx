import { Button, Group } from '@mantine/core'
import type { Column } from '@srtp/table'
import type { ListCtcSchema } from '~/common/validators'
import { CtcSchema } from '~/common/validators'
import { DeleteCtcForm, EditCtcModalForm } from '~/components/ctc'
import { useFormData } from '../common'
import { Table } from '../common/Table'

const columns: Column<ListCtcSchema>[] = [
  { accessor: 'id', label: 'TI_ID' },
  { accessor: 'name', label: 'Username' },
  { accessor: 'ctc', label: 'CTC(LPA)' },
  { accessor: 'fromDate', label: 'From Date' },
  { accessor: 'toDate', label: 'To Date' },
]

// const initialFilters: Filters<CtcSchema> = {
//   id: '',
//   ctc: '',
//   fromDate: '',
//   toDate: '',
//   name: '',
// }

const Actions = ({ row }: { row: CtcSchema }) => {
  const actionData = useFormData(CtcSchema)

  return (
    <Group>
      <DeleteCtcForm id={row.id} />
      <EditCtcModalForm ctc={row} errors={actionData} />
    </Group>
  )
}

export type CtcListProps = Readonly<{
  ctcList: readonly ListCtcSchema[]
}>

export const CtcList = ({ ctcList }: CtcListProps) => (
  <>
    <Group position="right" m="md">
      <Button component="a" href="/ctc/new">
        Add
      </Button>
    </Group>

    <Table
      striped
      Actions={Actions}
      rows={ctcList}
      columns={columns}
      perPage={3}
    />
  </>
)

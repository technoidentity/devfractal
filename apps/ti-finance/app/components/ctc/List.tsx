import { Button, Group } from '@mantine/core'
import { useActionData } from '@remix-run/react'
import type { Errors } from '@srtp/remix-core'
import type { Column, Filters } from '@srtp/table'
import type { CtcSchema } from '~/common/validators'
import { DeleteCtcForm, EditCtcModalForm } from '~/components/ctc'
import { Table } from '../common/Table'

const columns: Column<CtcSchema>[] = [
  { accessor: 'id', label: 'TI_ID' },
  { accessor: 'name', label: 'Username' },
  { accessor: 'ctc', label: 'CTC(LPA)' },
  { accessor: 'fromDate', label: 'From Date' },
  { accessor: 'toDate', label: 'To Date' },
]

const initialFilters: Filters<CtcSchema> = {
  id: '',
  ctc: '',
  fromDate: '',
  toDate: '',
  name: '',
}

const Actions = ({ row }: { row: CtcSchema }) => {
  const actionData = useActionData<Errors<CtcSchema> | undefined>()

  return (
    <Group>
      <DeleteCtcForm id={row.id} />
      <EditCtcModalForm ctc={row} errors={actionData} />
    </Group>
  )
}

export type CtcListProps = Readonly<{
  ctcList: readonly CtcSchema[]
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
      initialFilters={initialFilters}
      perPage={3}
    />
  </>
)

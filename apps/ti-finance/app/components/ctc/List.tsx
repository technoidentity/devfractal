import { Button, Group } from '@mantine/core'
import type { Column } from '@srtp/table'
import React from 'react'
import { useUserName } from '~/common/context'
import type { ListCtcSchema } from '~/common/validators'
import { CtcSchema } from '~/common/validators'
import { DeleteCtcForm, EditCtcModalForm } from '~/components/ctc'
import { useFormData } from '../common'
import { Table } from '../common/Table'

const columns: Column<ListCtcSchema>[] = [
  { accessor: 'tiId', label: 'TI_ID' },
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

export const CtcList = ({ ctcList }: CtcListProps) => {
  const getUserName = useUserName()

  const list = React.useMemo(
    () => ctcList.map(ctc => ({ ...ctc, name: getUserName(ctc.tiId) })),
    [ctcList, getUserName],
  )

  return (
    <>
      <Group position="right" m="md">
        <Button component="a" href="/ctc/new">
          Add
        </Button>
      </Group>

      <Table
        striped
        Actions={Actions}
        rows={list}
        columns={columns}
        perPage={3}
      />
    </>
  )
}

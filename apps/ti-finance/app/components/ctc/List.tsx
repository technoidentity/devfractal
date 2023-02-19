import { Button, Group } from '@mantine/core'
import type { Column } from '@srtp/table'
import React from 'react'
import type { ListCtcSchema } from '~/common'
import { CtcSchema, useUserName } from '~/common'
import { CrudTable } from '../common'
import { FormFields } from './FormFields'

const columns: Column<ListCtcSchema>[] = [
  { accessor: 'tiId', label: 'TI_ID' },
  { accessor: 'name', label: 'Username' },
  { accessor: 'ctc', label: 'CTC(LPA)' },
  { accessor: 'fromDate', label: 'From Date' },
  { accessor: 'toDate', label: 'To Date' },
]

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

      <CrudTable
        spec={CtcSchema}
        FormFields={FormFields}
        editTitle="Update CTC"
        rows={list}
        columns={columns}
      />
    </>
  )
}

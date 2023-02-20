import type { Ctc } from '@prisma/client'
import type { Column } from '@srtp/table'
import React from 'react'
import { CtcSpec, useUserName } from '~/common'
import { CrudTable } from '../common'
import { FormFields } from './FormFields'

type ListCtc = Ctc & { name: string }

const columns: Column<ListCtc>[] = [
  { accessor: 'tiId', label: 'TI_ID' },
  { accessor: 'name', label: 'Username' },
  { accessor: 'ctc', label: 'CTC(LPA)' },
  { accessor: 'fromDate', label: 'From Date' },
  { accessor: 'toDate', label: 'To Date' },
]

export type CtcListProps = Readonly<{
  ctcList: readonly Ctc[]
}>

export const CtcList = ({ ctcList }: CtcListProps) => {
  const getUserName = useUserName()

  const list = React.useMemo(
    () => ctcList.map(ctc => ({ ...ctc, name: getUserName(ctc.tiId) })),
    [ctcList, getUserName],
  )

  return (
    <CrudTable
      spec={CtcSpec}
      FormFields={FormFields}
      editTitle="Update CTC"
      rows={list}
      columns={columns}
    />
  )
}

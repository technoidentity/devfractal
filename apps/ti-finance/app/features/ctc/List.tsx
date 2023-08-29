import type { Ctc } from '@prisma/client'
import type { Column } from '@srtp/mantine'
import { CtcSpec } from '~/common'
import { CrudTable } from '~/core'
import { FormFields } from './FormFields'

type CtcList = Ctc & { username: string }

const columns: Column<CtcList>[] = [
  { accessor: 'tiId', label: 'TI_ID' },
  { accessor: 'username', label: 'Username' },
  { accessor: 'ctc', label: 'CTC(LPA)' },
  { accessor: 'fromDate', label: 'From Date' },
  { accessor: 'toDate', label: 'To Date' },
]

export type CtcListProps = Readonly<{
  ctcList: readonly CtcList[]
}>

export const CtcList = ({ ctcList }: CtcListProps) => {
  return (
    <CrudTable
      spec={CtcSpec}
      FormFields={FormFields}
      editTitle="Update CTC"
      rows={ctcList}
      columns={columns}
    />
  )
}

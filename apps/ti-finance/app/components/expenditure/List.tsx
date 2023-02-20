import { Button, Group } from '@mantine/core'
import type { Column } from '@srtp/table'
import React from 'react'
import { ExpenditureSpec } from '~/common'
import { CrudTable, TotalSpendCard } from '~/components/common'
import { Filters } from '~/components/expenditure'
import { FormFields } from './FormFields'

type ExpenditureList = ExpenditureSpec & {
  departmentId: number
  department: string
  id: number
}

const columns: Column<ExpenditureList>[] = [
  { accessor: 'department', label: 'Department' },
  { accessor: 'amount', label: 'Amount' },
  { accessor: 'category', label: 'Category' },
  { accessor: 'date', label: 'Date' },
  { accessor: 'remarks', label: 'Remarks' },
]

export type ExpenditureListProps = Readonly<{
  expenditureList: ExpenditureList[]
}>

export const ExpenditureList = ({ expenditureList }: ExpenditureListProps) => {
  const totalCost = React.useMemo(
    () => expenditureList.reduce((acc, curr) => acc + curr.amount, 0),
    [expenditureList],
  )

  return (
    <>
      <TotalSpendCard cost={totalCost} label="Total Amount" />

      <Group position="left" m="md">
        <Filters />

        <Button component="a" href="/expenditure/new">
          Add
        </Button>
      </Group>

      <CrudTable
        spec={ExpenditureSpec}
        editTitle="Update Expenditure"
        FormFields={FormFields}
        rows={expenditureList}
        columns={columns}
      />
    </>
  )
}

import { mergeWithToMap } from '@srtp/core'
import type { Column } from '@srtp/table'
import React from 'react'
import { Table, TotalSpendCard, useDepartmentName, useUserName } from '~/common'
import { SpendSearchForm } from './Search'

type PeopleSpend = Readonly<{
  id: string
  username: string
  cost: number
  departments: string
}>

const columns: Column<PeopleSpend>[] = [
  { accessor: 'id', label: 'TI_ID' },
  { accessor: 'username', label: 'Username' },
  { accessor: 'departments', label: 'Departments' },
  { accessor: 'cost', label: 'Cost' },
]

type PersonCost = Readonly<{
  tiId: string
  departmentId: number
  ctc: number
}>

const useSpendPage = (personCost: readonly PersonCost[]) => {
  const getUserName = useUserName()
  const getDepartmentName = useDepartmentName()

  type Spendings = Omit<PeopleSpend, 'departments'> & {
    departments: string[]
  }

  const rows = React.useMemo(
    () =>
      Array.from(
        mergeWithToMap(personCost, 'tiId', (acc: Spendings | undefined, e) => ({
          id: e.tiId,
          username: getUserName(e.tiId),
          cost: acc ? acc.cost + e.ctc : e.ctc,
          departments: [
            ...(acc?.departments || []),
            getDepartmentName(e.departmentId),
          ],
        })).values(),
      ).map(c => ({ ...c, departments: c.departments.join(', ') })),
    [personCost, getUserName, getDepartmentName],
  )

  const totalCost = React.useMemo(
    () => rows.reduce((acc, e) => acc + e.cost, 0),
    [rows],
  )

  return { rows, totalCost }
}

type PeopleSpendProps = Readonly<{
  personCost: readonly PersonCost[]
}>

export const PeopleSpendList = ({ personCost }: PeopleSpendProps) => {
  const { rows, totalCost } = useSpendPage(personCost)

  return (
    <>
      <TotalSpendCard cost={totalCost} label="Total Spend" />

      <SpendSearchForm />

      <Table rows={rows} columns={columns} />
    </>
  )
}

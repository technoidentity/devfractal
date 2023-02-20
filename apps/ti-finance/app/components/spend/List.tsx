import { isEmpty, mergeWithToMap } from '@srtp/core'
import type { Column } from '@srtp/table'
import React from 'react'
import { useDepartmentName, useUserName } from '~/common'
import { Table, TotalSpendCard, useSearch } from '~/components/common'
import type { FiltersValues } from '~/components/spend'
import { Filters, SpendFiltersSpec } from '~/components/spend'

type PeopleSpend = {
  id: string
  username: string
  cost: number
  departments: string
}

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
        mergeWithToMap(personCost, 'tiId', (acc: Spendings | undefined, e) =>
          acc
            ? {
                id: e.tiId,
                username: getUserName(e.tiId),
                cost: acc.cost + e.ctc,
                departments: [
                  ...acc.departments,
                  getDepartmentName(e.departmentId),
                ],
              }
            : {
                id: e.tiId,
                username: getUserName(e.tiId),
                cost: e.ctc,
                departments: [getDepartmentName(e.departmentId)],
              },
        ).values(),
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

  const [, set] = useSearch(SpendFiltersSpec)

  const handleFilterChange = (values: FiltersValues) => {
    console.log({ nullh: values })
    if (!isEmpty(values)) {
      set(values)
    }
  }

  return (
    <>
      <TotalSpendCard cost={totalCost} label="Total Spend" />

      <Filters onFilterChange={handleFilterChange} />

      <Table rows={rows} columns={columns} />
    </>
  )
}

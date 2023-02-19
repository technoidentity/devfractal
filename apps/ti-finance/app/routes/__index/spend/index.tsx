import { useLoaderData } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import { mergeWithToMap } from '@srtp/core'
import type { Column } from '@srtp/table'
import React from 'react'
import { useDepartmentName, useUserName } from '~/common'
import { Table, TotalSpendCard } from '~/components/common'
import { Filters } from '~/components/spend'
import { getPeopleSpend } from '~/models/departmentMapping.server'

export async function loader(_: LoaderArgs) {
  const { personCost } = await getPeopleSpend()

  return json({ personCost })
}

type PeopleSpendSchema = {
  id: string
  username: string
  cost: number
  departments: string
}

const columns: Column<PeopleSpendSchema>[] = [
  { accessor: 'id', label: 'TI_ID' },
  { accessor: 'username', label: 'Username' },
  { accessor: 'departments', label: 'Departments' },
  { accessor: 'cost', label: 'Cost' },
]

const useSpendPage = () => {
  const { personCost } = useLoaderData<typeof loader>()

  const getUserName = useUserName()
  const getDepartmentName = useDepartmentName()

  type Spendings = Omit<PeopleSpendSchema, 'departments'> & {
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

const PeopleSpendPage = () => {
  const { rows, totalCost } = useSpendPage()

  return (
    <>
      <TotalSpendCard cost={totalCost} label="Total Spend" />

      <Filters />

      <Table rows={rows} columns={columns} />
    </>
  )
}

export default PeopleSpendPage

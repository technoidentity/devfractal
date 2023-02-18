import { Group, Select } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useLoaderData } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import { mergeWithToMap } from '@srtp/core'
import type { Column } from '@srtp/table'
import React from 'react'
import {
  useDepartmentName,
  useUserName,
  useUsersSelect,
} from '~/common/context'
import { TotalSpendCard } from '~/components/common'
import { Table } from '~/components/common/Table'
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

const PeopleSpendPage = () => {
  console.log('PeopleSpendPage')
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

  const totalCost = rows.reduce((acc, e) => acc + e.cost, 0)

  return (
    <>
      <TotalSpendCard cost={totalCost} label="Total Spend" />
      <Filters />
      <Table striped rows={rows} columns={columns} />
    </>
  )
}

export default PeopleSpendPage
